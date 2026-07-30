import EVENTS from '../../constants/events';

const usePeerEvents = (

    socket,

    peerManager

) => {

    const register = () => {

        socket.on(

            EVENTS.OFFER,

            async payload => {

                const answer =

                    await peerManager.createAnswer(

                        payload.from,

                        payload.sdp

                    );

                socket.emit(

                    EVENTS.ANSWER,

                    {

                        to: payload.from,

                        sdp: answer

                    }

                );

            }

        );

        socket.on(

            EVENTS.ANSWER,

            async payload => {

                await peerManager.receiveAnswer(

                    payload.from,

                    payload.sdp

                );

            }

        );

        socket.on(

            EVENTS.ICE_CANDIDATE,

            async payload => {

                await peerManager.addIceCandidate(

                    payload.from,

                    payload.candidate

                );

            }

        );

    };

    const unregister = () => {

        socket.off(EVENTS.OFFER);

        socket.off(EVENTS.ANSWER);

        socket.off(EVENTS.ICE_CANDIDATE);

    };

    return {

        register,

        unregister

    };

};

export default usePeerEvents;