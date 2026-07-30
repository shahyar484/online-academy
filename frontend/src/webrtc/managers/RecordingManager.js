class RecordingManager {

    constructor(mediaSession) {

        this.mediaSession = mediaSession;

    }

    start() {

        if (

            this.mediaSession.recorder ||

            !this.mediaSession.currentVideoStream

        ) {

            return;

        }

        this.mediaSession.recordedChunks = [];

        this.mediaSession.recorder =

            new MediaRecorder(

                this.mediaSession.currentVideoStream,

                {

                    mimeType: 'video/webm'

                }

            );

        this.mediaSession.recorder.ondataavailable = e => {

            if (

                e.data.size

            ) {

                this.mediaSession.recordedChunks.push(

                    e.data

                );

            }

        };

        this.mediaSession.recorder.start(1000);

    }

    stop() {

        return new Promise(resolve => {

            if (

                !this.mediaSession.recorder

            ) {

                resolve(null);

                return;

            }

            this.mediaSession.recorder.onstop = () => {

                const blob =

                    new Blob(

                        this.mediaSession.recordedChunks,

                        {

                            type: 'video/webm'

                        }

                    );

                this.mediaSession.recorder = null;

                resolve(blob);

            };

            this.mediaSession.recorder.stop();

        });

    }

}

export default RecordingManager;