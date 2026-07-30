import rtcConfig from '../utils/rtcConfig';

class PeerConnectionManager {

    constructor(mediaSession) {

        this.mediaSession = mediaSession;

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

    async receiveAnswer(

        remoteMembershipId,

        answer

    ) {

        const peer =
            this.mediaSession.peerConnections.get(
                remoteMembershipId
            );

        if (!peer) {

            return;

        }

        await peer.setRemoteDescription(
            answer
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
            this.mediaSession.peerConnections.get(
                remoteMembershipId
            );

        if (!peer) {

            return;

        }

        await peer.addIceCandidate(
            candidate
        );

    }

    /*
    ===================================
    replaceTrack
    ===================================
    */

    replaceTrack(newTrack) {

        this.mediaSession.peerConnections.forEach(

            peer => {

                const sender =
                    peer
                        .getSenders()
                        .find(

                            sender =>

                            sender.track &&
                            sender.track.kind ===
                            newTrack.kind

                        );

                if (sender) {

                    sender.replaceTrack(
                        newTrack
                    );

                }

            }

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

    destroy() {

        this.mediaSession.peerConnections.forEach(

            peer => {

                peer.close();

            }

        );

        this.mediaSession.peerConnections.clear();

        this.mediaSession.remoteStreams.clear();

    }

}

export default PeerConnectionManager;