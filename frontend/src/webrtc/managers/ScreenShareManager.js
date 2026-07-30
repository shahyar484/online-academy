class ScreenShareManager {

    constructor(mediaSession, peerManager) {

        this.mediaSession = mediaSession;
        this.peerManager = peerManager;

    }

    async start() {

        if (this.mediaSession.screenStream) {

            return this.mediaSession.screenStream;

        }

        const stream = await navigator.mediaDevices.getDisplayMedia({

            video: true,

            audio: true

        });

        this.mediaSession.screenStream = stream;
        this.mediaSession.currentVideoStream = stream;

        const videoTrack = stream.getVideoTracks()[0];

        this.peerManager.replaceScreenTrack(videoTrack);

        videoTrack.onended = () => {

            this.stop();

        };

        return stream;

    }

    stop() {

        if (!this.mediaSession.screenStream) {

            return;

        }

        this.mediaSession.screenStream

            .getTracks()

            .forEach(track => track.stop());

        this.mediaSession.screenStream = null;

        this.mediaSession.currentVideoStream =

            this.mediaSession.cameraStream;

        const cameraTrack =

            this.mediaSession

                .cameraStream

                ?.getVideoTracks()[0];

        if (cameraTrack) {

            this.peerManager.replaceCameraTrack(

                cameraTrack

            );

        }

    }

}

export default ScreenShareManager;