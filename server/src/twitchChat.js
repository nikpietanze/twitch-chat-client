const tmi = require('tmi.js');
const SocketIO = require('socket.io');

function twitchChat(server) {
    const io = SocketIO(server);

    const client = new tmi.Client({
        connection: {
            secure: true,
            reconnect: true,
        },
        channels: ['pikabooirl'],
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    client.connect();

    client.on('message', (channel, tags, message, self) => {
        // Channel: channel listening to
        // Tags: badge-info {} (long term subscriber badges, etc), badges,  display-name, id, mod, color?, subscriber, message-type?
        // Message: just the message itself
        // Self: so you can negate your own messages if wanted

        io.emit('twitchMessage', {
            chatId: tags['id'],
            displayName: tags['display-name'],
            message: message,
            badgeInfo: tags['badge-info'],
            badges: tags['badges'],
            mod: tags['mod'],
            color: tags['color'],
            subscriber: tags['subscriber'],
            messageType: tags['message-type'],
        });
    });

    client.on("twitchSub", (channel, username, method, message, userstate) => {
        io.emit('twitchSubscribe', {
            channel: channel,
            username: username,
            mothods: method,
            message: message,
            userstate: userstate,
        });
    });
}

module.exports = twitchChat;
