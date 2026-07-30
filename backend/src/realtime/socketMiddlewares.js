class SocketMiddlewares {

    requireSession(socket) {

        if (!socket.data.sessionId) {

            throw new Error(

                'کاربر وارد کلاس نشده است.'

            );

        }

    }

    requireMembership(socket) {

        if (!socket.data.membershipId) {

            throw new Error(

                'اطلاعات عضویت کاربر معتبر نیست.'

            );

        }

    }

}

module.exports =
new SocketMiddlewares();