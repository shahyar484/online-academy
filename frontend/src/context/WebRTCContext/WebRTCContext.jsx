import {

    createContext,
    useContext,
    useEffect,
    useRef,
    useState

} from 'react';

import { useSocket }

from '../SocketContext/SocketContext';

import EVENTS

from '../../constants/events';

import mediaSessionManager

from '../../webrtc/session';

import MediaManager

from '../../webrtc/managers/MediaManager';

import PeerConnectionManager

from '../../webrtc/managers/PeerConnectionManager';

const WebRTCContext =

createContext(null);

export const WebRTCProvider = ({

    children

}) => {

    const {

        socket,

        connected

    } = useSocket();

    const mediaSessionRef =

        useRef(null);

    const mediaManagerRef =

        useRef(null);

    const peerManagerRef =

        useRef(null);

    const joinedRef =

        useRef(false);

    const [

        initialized,

        setInitialized

    ] = useState(false);

    const [

        participants,

        setParticipants

    ] = useState([]);

    const [

        localStream,

        setLocalStream

    ] = useState(null);

    /*
    ==================================
    Join Session
    ==================================
    */

    const joinSession = async (

        sessionId

    ) => {

        if (

            !socket ||

            !connected ||

            joinedRef.current

        ) {

            return;

        }

        joinedRef.current = true;

        const mediaSession =

            mediaSessionManager.get(

                sessionId

            );

        mediaSessionRef.current =

            mediaSession;

        mediaManagerRef.current =

            new MediaManager(

                mediaSession

            );

        const stream =

            await mediaManagerRef

                .current

                .initialize();

        setLocalStream(

            stream

        );

        peerManagerRef.current =

            new PeerConnectionManager(

                mediaSession

            );

        peerManagerRef.current.on(

            'onIceCandidate',

            (

                membershipId,

                candidate

            ) => {

                socket.emit(

                    EVENTS.ICE_CANDIDATE,

                    {

                        membershipId,

                        candidate

                    }

                );

            }

        );

        peerManagerRef.current.on(

            'onRemoteStream',

            () => {

                setParticipants(

                    [

                        ...mediaSession

                            .remoteStreams

                            .keys()

                    ]

                );

            }

        );

        socket.emit(

            EVENTS.JOIN_SESSION,

            {

                sessionId

            }

        );

        setInitialized(true);

    };

        /*
    ==================================
    Socket Events
    ==================================
    */

    useEffect(() => {

        if (

            !socket ||

            !peerManagerRef.current

        ) {

            return;

        }

        const handleParticipants =

            async members => {

                if (

                    !peerManagerRef.current

                ) {

                    return;

                }

                for (

                    const member

                    of members

                ) {

                    if (

                        member.membershipId ===

                        socket.membershipId

                    ) {

                        continue;

                    }

                    const alreadyExists =

                        mediaSessionRef.current

                            .peerConnections

                            .has(

                                member.membershipId

                            );

                    if (

                        alreadyExists

                    ) {

                        continue;

                    }

                    const offer =

                        await peerManagerRef

                            .current

                            .createOffer(

                                member.membershipId

                            );

                    socket.emit(

                        EVENTS.OFFER,

                        {

                            membershipId:

                                member.membershipId,

                            offer

                        }

                    );

                }

            };

        const handleOffer =

            async data => {

                const answer =

                    await peerManagerRef

                        .current

                        .createAnswer(

                            data.membershipId,

                            data.offer

                        );

                socket.emit(

                    EVENTS.ANSWER,

                    {

                        membershipId:

                            data.membershipId,

                        answer

                    }

                );

            };

        const handleAnswer =

            async data => {

                await peerManagerRef

                    .current

                    .receiveAnswer(

                        data.membershipId,

                        data.answer

                    );

            };

        const handleIce =

            async data => {

                await peerManagerRef

                    .current

                    .addIceCandidate(

                        data.membershipId,

                        data.candidate

                    );

            };

        socket.on(

            EVENTS.PARTICIPANTS_UPDATED,

            handleParticipants

        );

        socket.on(

            EVENTS.OFFER,

            handleOffer

        );

        socket.on(

            EVENTS.ANSWER,

            handleAnswer

        );

        socket.on(

            EVENTS.ICE_CANDIDATE,

            handleIce

        );

        return () => {

            socket.off(

                EVENTS.PARTICIPANTS_UPDATED,

                handleParticipants

            );

            socket.off(

                EVENTS.OFFER,

                handleOffer

            );

            socket.off(

                EVENTS.ANSWER,

                handleAnswer

            );

            socket.off(

                EVENTS.ICE_CANDIDATE,

                handleIce

            );

        };

    }, [

        socket,

        connected

    ]);

        /*
    ==================================
    Leave Session
    ==================================
    */

    const leaveSession = () => {

        if (

            socket &&

            joinedRef.current

        ) {

            socket.emit(

                EVENTS.LEAVE_SESSION

            );

        }

        joinedRef.current = false;

        peerManagerRef.current
            ?.destroy();

        mediaManagerRef.current
            ?.stopCamera();

        if (

            mediaSessionRef.current

        ) {

            mediaSessionManager.remove(

                mediaSessionRef.current.sessionId

            );

        }

        mediaSessionRef.current = null;

        mediaManagerRef.current = null;

        peerManagerRef.current = null;

        setParticipants([]);

        setLocalStream(null);

        setInitialized(false);

    };

    /*
    ==================================
    Provider
    ==================================
    */

    return (

        <WebRTCContext.Provider

            value={{

                initialized,

                localStream,

                participants,

                mediaSession:
                    mediaSessionRef,

                mediaManager:
                    mediaManagerRef,

                peerManager:
                    peerManagerRef,

                joinSession,

                leaveSession

            }}

        >

            {children}

        </WebRTCContext.Provider>

    );

};

export const useWebRTC = () =>

    useContext(

        WebRTCContext

    );