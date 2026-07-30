const SessionManager =
require('./SessionManager');

class SocketGuards {

    requireHost(

        sessionId,

        membershipId

    ) {

        const host =

            SessionManager.getHost(

                sessionId

            );

        if (

            !host ||

            host.membershipId !== membershipId

        ) {

            throw new Error(

                'فقط برگزارکننده کلاس اجازه انجام این عملیات را دارد.'

            );

        }

    }

    requireParticipant(

        sessionId,

        membershipId

    ) {

        const participant =

            SessionManager.getParticipant(

                sessionId,

                membershipId

            );

        if (!participant) {

            throw new Error(

                'کاربر داخل کلاس حضور ندارد.'

            );

        }

    }

    requireHostOrParticipant(

        sessionId,

        membershipId

    ) {

        const participant =

            SessionManager.getParticipant(

                sessionId,

                membershipId

            );

        if (!participant) {

            throw new Error(

                'کاربر داخل کلاس حضور ندارد.'

            );

        }

    }

}

module.exports =
new SocketGuards();