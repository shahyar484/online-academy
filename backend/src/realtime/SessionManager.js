class SessionManager {

    constructor() {

        this.sessions = new Map();

    }

    createSession(sessionId) {

        if (!this.sessions.has(sessionId)) {

            this.sessions.set(sessionId, {

                host: null,

                participants: new Map(),

                whiteboard: [],

                chat: [],

                screenShare: null,

                createdAt: new Date()

            });

        }

        return this.sessions.get(sessionId);

    }

    getSession(sessionId) {

        return this.sessions.get(sessionId);

    }

    removeSession(sessionId) {

        this.sessions.delete(sessionId);

    }

    joinHost(sessionId, host) {

        const session = this.createSession(sessionId);

        session.host = host;

        return session;

    }

    leaveHost(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return;

        session.host = null;

        if (session.participants.size === 0) {

            this.removeSession(sessionId);

        }

    }

    joinParticipant(sessionId, participant) {

        const session = this.createSession(sessionId);

        session.participants.set(

            participant.membershipId,

            participant

        );

        return session;

    }

    leaveParticipant(sessionId, membershipId) {

        const session = this.getSession(sessionId);

        if (!session) return;

        session.participants.delete(membershipId);

        if (

            session.host === null &&

            session.participants.size === 0

        ) {

            this.removeSession(sessionId);

        }

    }

    getHost(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return null;

        return session.host;

    }

    getParticipants(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return [];

        return Array.from(session.participants.values());

    }

    participantCount(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return 0;

        return session.participants.size;

    }

    isHostOnline(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return false;

        return !!session.host;

    }

    getParticipant(sessionId, membershipId) {

        const session = this.getSession(sessionId);

        if (!session) return null;

        if (

            session.host &&

            session.host.membershipId === membershipId

        ) {

            return session.host;

        }

        return session.participants.get(membershipId);

    }

    isParticipantOnline(sessionId, membershipId) {

        const session = this.getSession(sessionId);

        if (!session) return false;

        return session.participants.has(membershipId);

    }

    setScreenShare(sessionId, membershipId) {

        const session = this.createSession(sessionId);

        session.screenShare = membershipId;

    }

    stopScreenShare(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return;

        session.screenShare = null;

    }

    getScreenShare(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return null;

        return session.screenShare;

    }

    addChatMessage(sessionId, message) {

        const session = this.createSession(sessionId);

        session.chat.push(message);

        if (session.chat.length > 200) {

            session.chat.shift();

        }

    }

    getChat(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return [];

        return session.chat;

    }

    setWhiteboardState(sessionId, objects) {

        const session = this.createSession(sessionId);

        session.whiteboard = objects;

    }

    getWhiteboardState(sessionId) {

        const session = this.getSession(sessionId);

        if (!session) return [];

        return session.whiteboard;

    }

    

}

module.exports = new SessionManager();