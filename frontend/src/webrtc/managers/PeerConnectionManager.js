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

    createPeer(remoteMembershipId) {

        if (
            this.mediaSession.peerConnections.has(
                remoteMembershipId
            )
        ) {

            return this.mediaSession.peerConnections.get(
                remoteMembershipId
            );

        }

        const peer = new RTCPeerConnection(
            rtcConfig
        );

        peer.oniceconnectionstatechange = () => {

            if (

                peer.iceConnectionState === 'failed'

            ) {

                peer.restartIce();

            }

        };

        const localStream =
            this.mediaSession.currentVideoStream;

        if (localStream) {

            localStream
                .getTracks()
                .forEach(track => {

                    peer.addTrack(
                        track,
                        localStream
                    );

                });

        }

        /*
        ==========================
        Remote Stream
        ==========================
        */

        peer.ontrack = event => {

            const stream =
                event.streams[0];

            this.mediaSession.remoteStreams.set(

                remoteMembershipId,

                stream

            );

            if (
                this.callbacks.onRemoteStream
            ) {

                this.callbacks.onRemoteStream(

                    remoteMembershipId,

                    stream

                );

            }

        };

        /*
        ==========================
        ICE
        ==========================
        */

        peer.onicecandidate = event => {

            if (
                !event.candidate
            ) {

                return;

            }

            if (
                this.callbacks.onIceCandidate
            ) {

                this.callbacks.onIceCandidate(

                    remoteMembershipId,

                    event.candidate

                );

            }

        };

        /*
        ==========================
        Connection State
        ==========================
        */

        peer.onconnectionstatechange = () => {

            if (
                this.callbacks.onConnectionStateChange
            ) {

                this.callbacks.onConnectionStateChange(

                    remoteMembershipId,

                    peer.connectionState

                );

            }

        };

        this.mediaSession.peerConnections.set(

            remoteMembershipId,

            peer

        );

        const pending =

            this.pendingCandidates.get(

                remoteMembershipId

            ) || [];

        pending.forEach(async candidate => {

            try {

                await peer.addIceCandidate(candidate);

            }

            catch {}

        });

        this.pendingCandidates.delete(

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
            this.createPeer(
                remoteMembershipId
            );

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
            this.createPeer(
                remoteMembershipId
            );

        await peer.setRemoteDescription(
            remoteOffer
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

                return;

            }

            await peer.setRemoteDescription(

                new RTCSessionDescription(

                    answer

                )

            );

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

                        new RTCIceCandidate(

                            candidate

                        )

                    );

                }

                catch {}

            }

            this.pendingCandidates.delete(

                remoteMembershipId

            );

        }

    /*
    ===================================
    ICE
    ===================================
    */

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

            if (!peer) {

                return;

            }

            if (

                peer.remoteDescription

            ) {

                try {

                    await peer.addIceCandidate(

                        new RTCIceCandidate(

                            candidate

                        )

                    );

                }

                catch {}

            }

            else {

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

                    .get(

                        remoteMembershipId

                    )

                    .push(

                        candidate

                    );

            }

        }

    /*
    ===================================
    replaceTrack
    ===================================
    */

    /*
===================================
Replace Media Track
===================================
*/

replaceMediaTrack(track) {

    this.mediaSession.peerConnections.forEach(

        peer => {

            const sender =

                peer

                    .getSenders()

                    .find(

                        sender =>

                            sender.track &&

                            sender.track.kind ===

                            track.kind

                    );

            if (

                sender

            ) {

                sender.replaceTrack(

                    track

                );

            }

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

        peer.close();

        this.mediaSession.peerConnections.delete(
            remoteMembershipId
        );

        this.mediaSession.remoteStreams.delete(
            remoteMembershipId
        );

    }

    /*
    ===================================
    Destroy
    ===================================
    */

    /*
===================================
Destroy
===================================
*/

destroy() {

    this.mediaSession.peerConnections.forEach(

        peer => {

            peer.ontrack = null;

            peer.onicecandidate = null;

            peer.onconnectionstatechange = null;

            peer.oniceconnectionstatechange = null;

            peer.close();

        }

    );

    this.mediaSession.peerConnections.clear();

    this.mediaSession.remoteStreams.clear();

    this.pendingCandidates.clear();

}

}

export default PeerConnectionManager;