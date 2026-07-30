const EVENTS =
require('./events');

const SessionManager =
require('./SessionManager');

module.exports = (

    io,

    socket

) => {

    socket.on(

        EVENTS.JOIN_SESSION,

        async ({

            sessionId

        }) => {

            await SessionManager.join(

                socket,

                sessionId

            );

            socket.to(

                SessionManager.roomName(

                    sessionId

                )

            ).emit(

                EVENTS.PARTICIPANTS_UPDATED,

                SessionManager.getParticipants(

                    sessionId

                )

            );

        }

    );

    socket.on(

        EVENTS.LEAVE_SESSION,

        () => {

            SessionManager.leave(

                socket

            );

        }

    );

    socket.on(

        EVENTS.OFFER,

        data => {

            io.to(

                data.membershipId

            ).emit(

                EVENTS.OFFER,

                {

                    membershipId:

                    socket.membershipId,

                    offer:

                    data.offer

                }

            );

        }

    );

    socket.on(

        EVENTS.ANSWER,

        data => {

            io.to(

                data.membershipId

            ).emit(

                EVENTS.ANSWER,

                {

                    membershipId:

                    socket.membershipId,

                    answer:

                    data.answer

                }

            );

        }

    );

    socket.on(

        EVENTS.ICE_CANDIDATE,

        data => {

            io.to(

                data.membershipId

            ).emit(

                EVENTS.ICE_CANDIDATE,

                {

                    membershipId:

                    socket.membershipId,

                    candidate:

                    data.candidate

                }

            );

        }

    );

};