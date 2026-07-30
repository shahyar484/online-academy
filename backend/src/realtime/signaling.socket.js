const EVENTS = require('./events');

const signalingService =
require('./signaling');

const SocketMiddlewares =
require('./socketMiddlewares');

const SocketGuards =
require('./socketGuards');

module.exports = io => {

    io.on(

        'connection',

        socket => {

            /*
            =====================================
            Join Peer
            =====================================
            */

            socket.on(

                EVENTS.JOIN_PEER,

                () => {

                    try {

                        SocketMiddlewares.requireSession(

                            socket

                        );

                        SocketMiddlewares.requireMembership(

                            socket

                        );

                        const {

                            sessionId,

                            membershipId

                        } = socket.data;

                        const peers =

                            signalingService.join(

                                sessionId,

                                membershipId,

                                socket.id

                            );

                        socket.emit(

                            EVENTS.PEERS,

                            peers.filter(

                                peer =>

                                    peer.membershipId !==

                                    membershipId

                            )

                        );

                    }

                    catch (err) {

                        socket.emit(

                            EVENTS.SOCKET_ERROR,

                            {

                                message:

                                    err.message

                            }

                        );

                    }

                }

            );

            /*
            =====================================
            Offer
            =====================================
            */

            socket.on(

                EVENTS.OFFER,

                payload => {

                    try {

                        SocketMiddlewares.requireSession(

                            socket

                        );

                        SocketGuards.requireParticipant(

                            socket.data.sessionId,

                            socket.data.membershipId

                        );

                        const targetSocketId =

                            signalingService.getSocket(

                                socket.data.sessionId,

                                payload.to

                            );

                        if (!targetSocketId) {

                            return;

                        }

                        io.to(

                            targetSocketId

                        ).emit(

                            EVENTS.OFFER,

                            {

                                from:

                                    socket.data.membershipId,

                                sdp:

                                    payload.sdp

                            }

                        );

                    }

                    catch (err) {

                        socket.emit(

                            EVENTS.SOCKET_ERROR,

                            {

                                message:

                                    err.message

                            }

                        );

                    }

                }

            );

            /*
            =====================================
            Answer
            =====================================
            */

            socket.on(

                EVENTS.ANSWER,

                payload => {

                    try {

                        SocketMiddlewares.requireSession(

                            socket

                        );

                        const targetSocketId =

                            signalingService.getSocket(

                                socket.data.sessionId,

                                payload.to

                            );

                        if (!targetSocketId) {

                            return;

                        }

                        io.to(

                            targetSocketId

                        ).emit(

                            EVENTS.ANSWER,

                            {

                                from:

                                    socket.data.membershipId,

                                sdp:

                                    payload.sdp

                            }

                        );

                    }

                    catch (err) {

                        socket.emit(

                            EVENTS.SOCKET_ERROR,

                            {

                                message:

                                    err.message

                            }

                        );

                    }

                }

            );

            /*
            =====================================
            ICE Candidate
            =====================================
            */

            socket.on(

                EVENTS.ICE_CANDIDATE,

                payload => {

                    try {

                        SocketMiddlewares.requireSession(

                            socket

                        );

                        const targetSocketId =

                            signalingService.getSocket(

                                socket.data.sessionId,

                                payload.to

                            );

                        if (!targetSocketId) {

                            return;

                        }

                        io.to(

                            targetSocketId

                        ).emit(

                            EVENTS.ICE_CANDIDATE,

                            {

                                from:

                                    socket.data.membershipId,

                                candidate:

                                    payload.candidate

                            }

                        );

                    }

                    catch (err) {

                        socket.emit(

                            EVENTS.SOCKET_ERROR,

                            {

                                message:

                                    err.message

                            }

                        );

                    }

                }

            );

            /*
            =====================================
            Disconnect
            =====================================
            */

            socket.on(

                'disconnect',

                () => {

                    const {

                        sessionId,

                        membershipId

                    } = socket.data;

                    if (

                        !sessionId ||

                        !membershipId

                    ) {

                        return;

                    }

                    signalingService.leave(

                        sessionId,

                        membershipId

                    );

                    socket.to(

                        `session:${sessionId}`

                    ).emit(

                        EVENTS.PEER_LEFT,

                        {

                            membershipId

                        }

                    );

                }

            );

        }

    );

};