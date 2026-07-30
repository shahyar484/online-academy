class SignalingStore {

    constructor() {

        this.rooms = new Map();

    }

    createRoom(sessionId) {

        if (!this.rooms.has(sessionId)) {

            this.rooms.set(

                sessionId,

                new Map()

            );

        }

        return this.rooms.get(sessionId);

    }

    getRoom(sessionId) {

        return this.rooms.get(sessionId);

    }

    removeRoom(sessionId) {

        this.rooms.delete(sessionId);

    }

    addPeer(

        sessionId,

        membershipId,

        socketId

    ) {

        const room =

            this.createRoom(sessionId);

        room.set(

            membershipId,

            socketId

        );

    }

    removePeer(

        sessionId,

        membershipId

    ) {

        const room =

            this.getRoom(sessionId);

        if (!room) return;

        room.delete(membershipId);

        if (room.size === 0) {

            this.removeRoom(sessionId);

        }

    }

    getSocketId(

        sessionId,

        membershipId

    ) {

        const room =

            this.getRoom(sessionId);

        if (!room) return null;

        return room.get(membershipId);

    }

    getPeers(sessionId) {

        const room =

            this.getRoom(sessionId);

        if (!room) {

            return [];

        }

        return Array.from(

            room.entries()

        ).map(

            ([

                membershipId,

                socketId

            ]) => ({

                membershipId,

                socketId

            })

        );

    }

}

module.exports =
new SignalingStore();