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

    if (commandName === '!socials') {
        console.log(channel, "Hello")
        client.say(channel,`                                                               
        Twitter: ${twitter}      
        Youtube: ${youtube}`)
        setTimeout(10000)
    } 
});

function onConnectedHandler (addr, port) {
  client.say(channel, )
    console.log(`* Connected to ${addr}:${port}`);
}


