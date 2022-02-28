require('dotenv').config();

const tmi = require('tmi.js');

// Define configuration options
const client = new tmi.Client({
  connection: {
      secure: true,
      reconnect: true
  },
  channels: ['kajo88'],
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
});

client.on('connected', onConnectedHandler);

client.connect();

client.on('message', (channel, tags, message, self) => {
    const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME
    let twitter = 'https://bit.ly/3plWkv6'
    let youtube = 'https://bit.ly/3viQgHw' 
   if (!isNotBot) {return}

    let commandName = message;

    if (commandName === '!social') {
        console.log(channel, "Hello")
        client.say(channel, `Twitter: ${twitter} Youtube: ${youtube}`)
    } 
});
// function onMessageHandler (channel, tags, message, self) {
//     let twitter = 'https://twitter.com/Kajo_ssb'
//     let youtube = 'https://www.youtube.com/channel/UCcVqEruZX-oIgbkmfR2Dp7w'
//     self = 'kajo88bot' 
//     if (self) {return}

//     let commandName = message;

//     if (commandName === '!socials') {
//         client.say(channel, `Twitter: ${twitter} Youtube: ${youtube}`)
//     } 
// };
// let timeout = () => {onMessageHandler()}
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}


