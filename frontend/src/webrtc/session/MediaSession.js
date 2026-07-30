class MediaSession {

    constructor(sessionId) {

        this.sessionId = sessionId;

        /*
        ===========================
        Local Streams
        ===========================
        */

        this.cameraStream = null;

        this.screenStream = null;

        this.currentVideoStream = null;

        this.mixedStream = null;

        /*
        ===========================
        Remote Streams
        ===========================
        */

        this.remoteStreams = new Map();

        this.remoteTracks = new Map();

        /*
        ===========================
        Recording
        ===========================
        */

        this.recorder = null;

        this.recordedChunks = [];

        /*
        ===========================
        Peer Connections
        ===========================
        */

        this.peerConnections = new Map();

        /*
        ===========================
        Participants
        ===========================
        */

        this.participants = new Map();

    }

}

export default MediaSession;