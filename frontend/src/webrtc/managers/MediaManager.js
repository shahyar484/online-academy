class MediaManager {

    constructor(mediaSession) {

        this.mediaSession = mediaSession;

    }

    /*
    ===========================
    Camera + Microphone
    ===========================
    */

    async initialize() {

        if (

            this.mediaSession.cameraStream

        ) {

            return this.mediaSession.cameraStream;

        }

        const stream =

            await navigator.mediaDevices.getUserMedia({

                video: {

                    width: 1280,

                    height: 720,

                    frameRate: 30

                },

                audio: {

                    echoCancellation: true,

                    noiseSuppression: true,

                    autoGainControl: true

                }

            });

        this.mediaSession.cameraStream = stream;

        this.mediaSession.currentVideoStream = stream;

        return stream;

    }

    /*
    ===========================
    Stop Camera
    ===========================
    */

    stopCamera() {

        if (

            !this.mediaSession.cameraStream

        ) {

            return;

        }

        this.mediaSession.cameraStream

            .getTracks()

            .forEach(

                track =>

                track.stop()

            );

        this.mediaSession.cameraStream = null;

        this.mediaSession.currentVideoStream = null;

    }

    /*
    ===========================
    Camera
    ===========================
    */

    enableCamera() {

        const track =

            this.mediaSession

                .cameraStream

                ?.getVideoTracks()[0];

        if (track) {

            track.enabled = true;

        }

    }

    disableCamera() {

        const track =

            this.mediaSession

                .cameraStream

                ?.getVideoTracks()[0];

        if (track) {

            track.enabled = false;

        }

    }

    /*
    ===========================
    Microphone
    ===========================
    */

    enableMicrophone() {

        const track =

            this.mediaSession

                .cameraStream

                ?.getAudioTracks()[0];

        if (track) {

            track.enabled = true;

        }

    }

    disableMicrophone() {

        const track =

            this.mediaSession

                .cameraStream

                ?.getAudioTracks()[0];

        if (track) {

            track.enabled = false;

        }

    }

    /*
    ===========================
    Devices
    ===========================
    */

    async getDevices() {

        const devices =

            await navigator.mediaDevices.enumerateDevices();

        return {

            cameras:

                devices.filter(

                    device =>

                    device.kind ===

                    'videoinput'

                ),

            microphones:

                devices.filter(

                    device =>

                    device.kind ===

                    'audioinput'

                )

        };

    }

    /*
    ===========================
    Change Camera
    ===========================
    */

    async changeCamera(deviceId) {

        const stream =

            await navigator.mediaDevices.getUserMedia({

                video: {

                    deviceId: {

                        exact: deviceId

                    }

                },

                audio: true

            });

        this.stopCamera();

        this.mediaSession.cameraStream = stream;

        this.mediaSession.currentVideoStream = stream;

        return stream;

    }

    /*
    ===========================
    Change Microphone
    ===========================
    */

    async changeMicrophone(deviceId) {

        const stream =

            await navigator.mediaDevices.getUserMedia({

                video: true,

                audio: {

                    deviceId: {

                        exact: deviceId

                    }

                }

            });

        this.stopCamera();

        this.mediaSession.cameraStream = stream;

        this.mediaSession.currentVideoStream = stream;

        return stream;

    }

}

export default MediaManager;