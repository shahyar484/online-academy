const jwt = require('jsonwebtoken');

const { Membership } = require('../../models');

module.exports = io => {

    io.use(async (socket, next) => {

        try {

            let token =
                socket.handshake.auth?.token;

            if (!token) {

                const authorization =
                    socket.handshake.headers.authorization;

                if (
                    authorization &&
                    authorization.startsWith('Bearer ')
                ) {

                    token =
                        authorization.substring(7);

                }

            }

            if (!token) {

                return next(
                    new Error('Unauthorized')
                );

            }

            const payload =
                jwt.verify(
                    token,
                    process.env.JWT_KEY
                );

            const membership =
                await Membership.findByPk(
                    payload.membershipId
                );

            if (!membership) {

                return next(
                    new Error('Unauthorized')
                );

            }

            socket.data = {

                userId:
                    membership.userId,

                membershipId:
                    membership.id,

                workspaceId:
                    membership.workspaceId,

                role:
                    membership.role,

                sessionId: null

            };

            next();

        }

        catch (err) {

            next(
                new Error('Unauthorized')
            );

        }

    });

};