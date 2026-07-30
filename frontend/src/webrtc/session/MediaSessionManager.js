import MediaSession
from './MediaSession';

class MediaSessionManager{

    constructor(){

        this.sessions = new Map();

    }

    get(sessionId){

        if(!this.sessions.has(sessionId)){

            this.sessions.set(

                sessionId,

                new MediaSession(sessionId)

            );

        }

        return this.sessions.get(sessionId);

    }

    has(sessionId){

        return this.sessions.has(sessionId);

    }

    remove(sessionId){

        this.sessions.delete(sessionId);

    }

}

export default new MediaSessionManager();