import rtcConfig from '../utils/rtcConfig';

class PeerConnectionManager {

    constructor(mediaSession) {

    this.mediaSession = mediaSession;

    this.pendingCandidates = new Map();

    this.callbacks = {

        onIceCandidate: null,

        onRemoteStream: null,

        onConnectionStateChange: null

    };

}

attachLocalTracks(peer) {

    const localStream =
        this.mediaSession.currentVideoStream;

    if (!localStream) {

        return;

    }

    localStream
        .getTracks()
        .forEach(track => {

            peer.addTrack(
                track,
                localStream
            );

        });

}

registerPeerEvents(

    peer,

    remoteMembershipId

) {

    peer.ontrack = event => {

        const stream =
            event.streams[0];

        this.mediaSession.remoteStreams.set(

            remoteMembershipId,

            stream

        );

        this.callbacks.onRemoteStream?.(

            remoteMembershipId,

            stream

        );

    };

    peer.onicecandidate = event => {

        if (!event.candidate) {

            return;

        }

        this.callbacks.onIceCandidate?.(

            remoteMembershipId,

            event.candidate

        );

    };

    peer.onconnectionstatechange = () => {

        this.callbacks.onConnectionStateChange?.(

            remoteMembershipId,

            peer.connectionState

        );

    };

    peer.oniceconnectionstatechange = () => {

        if (

            peer.iceConnectionState ===

            'failed'

        ) {

            peer.restartIce?.();

        }

    };

}

async flushPendingCandidates(

    peer,

    remoteMembershipId

) {

    const pending =

        this.pendingCandidates.get(

            remoteMembershipId

        ) || [];

    for (

        const candidate

        of pending

    ) {

        try {

            await peer.addIceCandidate(
                new RTCIceCandidate(candidate)
            );

        }

        catch (error) {

            console.warn(error);

        }

    }

    this.pendingCandidates.delete(

        remoteMembershipId

    );

}




    /*
    ===================================
    Register Callbacks
    ===================================
    */

    on(event, callback) {

        this.callbacks[event] = callback;

    }

/*
===================================
Create Peer
===================================
*/

async createPeer(remoteMembershipId) {

    if (!remoteMembershipId) {

        throw new Error(
            'remoteMembershipId is required'
        );

    }

    const existingPeer =
        this.mediaSession.peerConnections.get(
            remoteMembershipId
        );

    if (existingPeer) {

        return existingPeer;

    }

    const peer = new RTCPeerConnection(
        rtcConfig
    );

    this.attachLocalTracks(
        peer
    );

    this.registerPeerEvents(
        peer,
        remoteMembershipId
    );

    this.mediaSession.peerConnections.set(
        remoteMembershipId,
        peer
    );

    await this.flushPendingCandidates(
        peer,
        remoteMembershipId
    );

    return peer;

}

    /*
    ===================================
    Offer
    ===================================
    */

    async createOffer(remoteMembershipId) {

    const peer =
        await this.createPeer(
            remoteMembershipId
        );

    if (peer.signalingState !== 'stable') {

        throw new Error(
            `Cannot create offer while signalingState is "${peer.signalingState}"`
        );

    }

    const offer =
        await peer.createOffer();

    await peer.setLocalDescription(
        offer
    );

    return offer;

}

    /*
    ===================================
    Answer
    ===================================
    */

    async createAnswer(

    remoteMembershipId,

    remoteOffer

) {

    const peer =
        await this.createPeer(
            remoteMembershipId
        );

    if (peer.signalingState !== 'stable') {

        throw new Error(
            `Cannot create answer while signalingState is "${peer.signalingState}"`
        );

    }

    await peer.setRemoteDescription(
        new RTCSessionDescription(
            remoteOffer
        )
    );

    const answer =
        await peer.createAnswer();

    await peer.setLocalDescription(
        answer
    );

    return answer;

}

    /*
    ===================================
    Receive Answer
    ===================================
    */

    /*
===================================
Receive Answer
===================================
*/

async receiveAnswer(

    remoteMembershipId,

    answer

) {

    const peer =
        this.mediaSession
            .peerConnections
            .get(remoteMembershipId);

    if (!peer) {

        throw new Error(
            `Peer not found for membership ${remoteMembershipId}`
        );

    }

    await peer.setRemoteDescription(
        new RTCSessionDescription(
            answer
        )
    );

    await this.flushPendingCandidates(
        peer,
        remoteMembershipId
    );

}


    /*
===================================
ICE
===================================
*/

async addIceCandidate(

    remoteMembershipId,

    candidate

) {

    const peer =
        this.mediaSession
            .peerConnections
            .get(remoteMembershipId);

    /*
    ==========================
    Peer هنوز ساخته نشده
    ==========================
    */

    if (!peer) {

        if (
            !this.pendingCandidates.has(
                remoteMembershipId
            )
        ) {

            this.pendingCandidates.set(
                remoteMembershipId,
                []
            );

        }

        this.pendingCandidates
            .get(remoteMembershipId)
            .push(candidate);

        return;

    }

    /*
    ==========================
    هنوز RemoteDescription نداریم
    ==========================
    */

    if (!peer.remoteDescription) {

        if (
            !this.pendingCandidates.has(
                remoteMembershipId
            )
        ) {

            this.pendingCandidates.set(
                remoteMembershipId,
                []
            );

        }

        this.pendingCandidates
            .get(remoteMembershipId)
            .push(candidate);

        return;

    }

    /*
    ==========================
    Candidate را اضافه کن
    ==========================
    */

    try {

        await peer.addIceCandidate(
            new RTCIceCandidate(candidate)
        );

    }

    catch (error) {

        console.warn(
            'Failed to add ICE candidate:',
            error
        );

    }

}


    /*
===================================
Replace Media Track
===================================
*/

replaceMediaTrack(track) {

    if (!track) {

        return;

    }

    this.mediaSession.peerConnections.forEach(

        peer => {

            if (peer.connectionState === 'closed') {

                return;

            }

            const sender =

                peer
                    .getSenders()
                    .find(

                        sender =>

                            sender.track &&

                            sender.track.kind ===

                            track.kind

                    );

            if (!sender) {

                return;

            }

            sender
                .replaceTrack(track)
                .catch(error => {

                    console.warn(

                        `Failed to replace ${track.kind} track:`,

                        error

                    );

                });

        }

    );

}

replaceCameraTrack(track) {

    this.replaceMediaTrack(

        track

    );

}

replaceScreenTrack(track) {

    this.replaceMediaTrack(

        track

    );

}

replaceMicrophoneTrack(track) {

    this.replaceMediaTrack(

        track

    );

}

    /*
    ===================================
    Remove Peer
    ===================================
    */

    removePeer(remoteMembershipId) {

    const peer =
        this.mediaSession.peerConnections.get(
            remoteMembershipId
        );

    if (!peer) {

        return;

    }

    /*
    ==========================
    Remove Event Listeners
    ==========================
    */

    peer.ontrack = null;

    peer.onicecandidate = null;

    peer.onconnectionstatechange = null;

    peer.oniceconnectionstatechange = null;

    /*
    ==========================
    Close Peer
    ==========================
    */

    peer.close();

    /*
    ==========================
    Remove References
    ==========================
    */

    this.mediaSession.peerConnections.delete(
        remoteMembershipId
    );

    this.mediaSession.remoteStreams.delete(
        remoteMembershipId
    );

    this.pendingCandidates.delete(
        remoteMembershipId
    );

}

 

    /*
===================================
Destroy
===================================
*/

destroy() {

    this.mediaSession.peerConnections.forEach(

        (peer, remoteMembershipId) => {

            /*
            ==========================
            Remove Event Listeners
            ==========================
            */

            peer.ontrack = null;

            peer.onicecandidate = null;

            peer.onconnectionstatechange = null;

            peer.oniceconnectionstatechange = null;

            /*
            ==========================
            Close Peer
            ==========================
            */

            peer.close();

        }

    );

    /*
    ==========================
    Clear Collections
    ==========================
    */

    this.mediaSession.peerConnections.clear();

    this.mediaSession.remoteStreams.clear();

    this.pendingCandidates.clear();

    /*
    ==========================
    Remove Callbacks
    ==========================
    */

    this.callbacks = {};

}

}

export default PeerConnectionManager;