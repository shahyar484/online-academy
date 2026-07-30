const socketAuth =
require('./socketAuth');

const presenceSocket =
require('./presence.socket');

const signalingSocket =
require('./signaling.socket');

// بعداً
// const whiteboardSocket =
// require('./whiteboard.socket');

// const chatSocket =
// require('./chat.socket');

// const screenSocket =
// require('./screen.socket');

module.exports = io => {

    socketAuth(io);

    /*
    ===========================
    Presence
    ===========================
    */

    presenceSocket(io);

    /*
    ===========================
    WebRTC
    ===========================
    */

    signalingSocket(io);

    /*
    ===========================
    مراحل بعدی
    ===========================

    whiteboardSocket(io);

    chatSocket(io);

    screenSocket(io);

    */

};