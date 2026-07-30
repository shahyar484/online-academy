const EVENTS =
require('./events');

const {

    sessionRoom

} = require('./socketHelpers');

class Emitter {

    participantsUpdated(

        io,

        sessionId,

        teacher,

        participants

    ) {

        io.to(

            sessionRoom(sessionId)

        ).emit(

            EVENTS.PARTICIPANTS_UPDATED,

            {

                teacher,

                participants

            }

        );

    }

    socketError(

        socket,

        message

    ) {

        socket.emit(

            EVENTS.SOCKET_ERROR,

            {

                message

            }

        );

    }

}

module.exports =
new Emitter();