const store =
require('./signaling.store');

class SignalingService {

    join(

        sessionId,

        membershipId,

        socketId

    ) {

        store.addPeer(

            sessionId,

            membershipId,

            socketId

        );

        return store.getPeers(

            sessionId

        );

    }

    leave(

        sessionId,

        membershipId

    ) {

        store.removePeer(

            sessionId,

            membershipId

        );

    }

    getSocket(

        sessionId,

        membershipId

    ) {

        return store.getSocketId(

            sessionId,

            membershipId

        );

    }

    getPeers(sessionId) {

        return store.getPeers(

            sessionId

        );

    }

}

module.exports =
new SignalingService();