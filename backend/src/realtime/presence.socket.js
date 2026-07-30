const classroomService =
require('../modules/classroom');

const Emitter =
require('./emitter');

const EVENTS =
require('./events');

const {

    sessionRoom

} = require('./socketHelpers');

module.exports = io => {

    io.on(

        'connection',

        socket => {

            socket.on(

                EVENTS.JOIN_SESSION,

                async ({ sessionId }) => {

                    try {

                        const {

                            membershipId,

                            userId

                        } = socket.data;

                        const result =

                            await classroomService.join({

                                sessionId,

                                membershipId,

                                userId,

                                socketId:

                                    socket.id

                            });

                        socket.join(

                            sessionRoom(sessionId)

                        );

                        socket.data.sessionId =

                            sessionId;

                        Emitter.participantsUpdated(

                            io,

                            sessionId,

                            result.teacher,

                            result.participants

                        );

                    }

                    catch (err) {

                        Emitter.socketError(

                            socket,

                            err.message

                        );

                    }

                }

            );

            socket.on(

                EVENTS.LEAVE_SESSION,

                async () => {

                    try {

                        const {

                            membershipId,

                            sessionId

                        } = socket.data;

                        if (!sessionId) {

                            return;

                        }

                        const result =

                            await classroomService.leave({

                                sessionId,

                                membershipId

                            });

                        socket.leave(

                            sessionRoom(sessionId)

                        );

                        socket.data.sessionId =

                            null;

                        Emitter.participantsUpdated(

                            io,

                            sessionId,

                            result.teacher,

                            result.participants

                        );

                    }

                    catch (err) {

                        Emitter.socketError(

                            socket,

                            err.message

                        );

                    }

                }

            );

            socket.on(

                'disconnect',

                async () => {

                    try {

                        const {

                            membershipId,

                            sessionId

                        } = socket.data;

                        if (!sessionId) {

                            return;

                        }

                        const result =

                            await classroomService.leave({

                                sessionId,

                                membershipId

                            });

                        Emitter.participantsUpdated(

                            io,

                            sessionId,

                            result.teacher,

                            result.participants

                        );

                    }

                    catch (err) {

                        console.error(err);

                    }

                }

            );

        }

    );

};