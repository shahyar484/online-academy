const attendanceService =
require('../attendances/attendance.service');

const sessionService =
require('../sessions/session.service');

const SessionManager =
require('../../realtime/SessionManager');

class ClassroomService {

    async join({

        sessionId,

        membershipId,

        userId,

        socketId

    }) {

        const hostMembershipId =

            await sessionService.getHostMembershipId(

                sessionId

            );

        if (!hostMembershipId) {
            throw new AppError("Session not found", 404);
        }

        const isHost =

            hostMembershipId === membershipId;

        if (!isHost) {

            await attendanceService.joinSession(

                sessionId,

                membershipId

            );

        }

        if (isHost) {

            SessionManager.joinHost(

                sessionId,

                {

                    socketId,

                    membershipId,

                    userId

                }

            );

        }

        else {

            SessionManager.joinParticipant(

                sessionId,

                {

                    socketId,

                    membershipId,

                    userId,

                    joinedAt:

                        new Date()

                }

            );

        }

        return {

            isHost,

            teacher:

                SessionManager.getHost(

                    sessionId

                ),

            participants:

                SessionManager.getParticipants(

                    sessionId

                )

        };

    }

    async leave({

        sessionId,

        membershipId

    }) {

        const hostMembershipId =

            await sessionService.getHostMembershipId(

                sessionId

            );

        const isHost =

            hostMembershipId === membershipId;

        if (!isHost) {

            await attendanceService.leaveSession(

                sessionId,

                membershipId

            );

        }

        if (isHost) {

            SessionManager.leaveHost(

                sessionId

            );

        }

        else {

            SessionManager.leaveParticipant(

                sessionId,

                membershipId

            );

        }

        return {

            teacher:

                SessionManager.getHost(

                    sessionId

                ),

            participants:

                SessionManager.getParticipants(

                    sessionId

                )

        };

    }

    getParticipants(sessionId) {

        return SessionManager.getParticipants(

            sessionId

        );

    }

    getHost(sessionId) {

        return SessionManager.getHost(

            sessionId

        );

    }

    isParticipant(

        sessionId,

        membershipId

    ) {

        return SessionManager

            .getParticipants(sessionId)

            .some(

                participant =>

                    participant.membershipId ===

                    membershipId

            );

    }

}

module.exports =
new ClassroomService();