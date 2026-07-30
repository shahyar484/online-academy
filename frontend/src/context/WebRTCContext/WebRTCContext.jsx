import {

    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState

} from 'react';

import { useSocket } from '../SocketContext';

import MediaSessionManager from '../../webrtc/session/MediaSessionManager';

import MediaManager from '../../webrtc/managers/MediaManager';
import PeerConnectionManager from '../../webrtc/managers/PeerConnectionManager';
import ScreenShareManager from '../../webrtc/managers/ScreenShareManager';
import RecordingManager from '../../webrtc/managers/RecordingManager';
import DeviceManager from '../../webrtc/managers/DeviceManager';

import usePeerEvents from '../../webrtc/hooks/usePeerEvents';

import EVENTS from '../../constants/events';
import usePeerEvents from '../../webrtc/hooks/usePeerEvents';

const WebRTCContext = createContext(null);

export const WebRTCProvider = ({

    children

}) => {

    const {

        socket

    } = useSocket();

    const sessionRef = useRef(null);

    const mediaManager = useRef(null);
    const peerManager = useRef(null);
    const screenManager = useRef(null);
    const recordingManager = useRef(null);
    const deviceManager = useRef(null);

    const peerEvents = useRef(null);

    const [

        localStream,

        setLocalStream

    ] = useState(null);

    const [

        remoteStreams,

        setRemoteStreams

    ] = useState(new Map());

    const [

        devices,

        setDevices

    ] = useState({

        cameras: [],

        microphones: [],

        speakers: []

    });

    const [

        sharingScreen,

        setSharingScreen

    ] = useState(false);

    const [

        recording,

        setRecording

    ] = useState(false);


useEffect(() => {

    if (

        !socket ||

        !peerManager.current

    ) {

        return;

    }

    const offerHandler = async payload => {

        const answer =

            await peerManager.current.createAnswer(

                payload.from,

                payload.sdp

            );

        socket.emit(

            EVENTS.ANSWER,

            {

                to: payload.from,

                sdp: answer

            }

        );

    };

    const answerHandler = async payload => {

        await peerManager.current.receiveAnswer(

            payload.from,

            payload.sdp

        );

    };

    const iceHandler = async payload => {

        await peerManager.current.addIceCandidate(

            payload.from,

            payload.candidate

        );

    };

    socket.on(

        EVENTS.OFFER,

        offerHandler

    );

    socket.on(

        EVENTS.ANSWER,

        answerHandler

    );

    socket.on(

        EVENTS.ICE_CANDIDATE,

        iceHandler

    );

    return () => {

        socket.off(

            EVENTS.OFFER,

            offerHandler

        );

        socket.off(

            EVENTS.ANSWER,

            answerHandler

        );

        socket.off(

            EVENTS.ICE_CANDIDATE,

            iceHandler

        );

    };

}, [

    socket

]);

    /*
====================================
Initialize
====================================
*/

const initialize = async (

    sessionId

) => {

    if (

        sessionRef.current

    ) {

        return;

    }

    const session =

        MediaSessionManager.get(

            sessionId

        );

    sessionRef.current =

        session;

    mediaManager.current =

        new MediaManager(

            session

        );

    peerManager.current =

        new PeerConnectionManager(

            session

        );

    screenManager.current =

        new ScreenShareManager(

            session,

            peerManager.current

        );

    recordingManager.current =

        new RecordingManager(

            session

        );

    deviceManager.current =

        new DeviceManager();

    peerManager.current.on(

        'onRemoteStream',

        (

            membershipId,

            stream

        ) => {

            setRemoteStreams(

                new Map(

                    session.remoteStreams

                )

            );

        }

    );

    peerManager.current.on(

        'onIceCandidate',

        (

            membershipId,

            candidate

        ) => {

            socket.emit(

                EVENTS.ICE_CANDIDATE,

                {

                    to:

                        membershipId,

                    candidate

                }

            );

        }

    );

   
    const stream =

        await mediaManager

            .current

            .initialize();

    setLocalStream(

        stream

    );

    const allDevices =

        await deviceManager

            .current

            .getDevices();

    setDevices(

        allDevices

    );

    socket.emit(

        EVENTS.JOIN_PEER

    );

};

/*
====================================
Start Recording
====================================
*/

const startRecording = () => {

    if (

        !recordingManager.current ||

        recording

    ) {

        return;

    }

    recordingManager.current.start();

    setRecording(

        true

    );

};

/*
====================================
Stop Recording
====================================
*/

const stopRecording = async () => {

    if (

        !recordingManager.current ||

        !recording

    ) {

        return;

    }

    const blob =

        await recordingManager.current.stop();

    setRecording(

        false

    );

    if (!blob) {

        return;

    }

    const url =

        URL.createObjectURL(

            blob

        );

    const a =

        document.createElement(

            'a'

        );

    a.href = url;

    a.download =

        `session-${Date.now()}.webm`;

    a.click();

    URL.revokeObjectURL(

        url

    );

};




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