require('dotenv').config();

const tmi = require('tmi.js');

let deathCount = 0
let twitter = 'https://www.twitter.com/Kajo_ssb'
let youtube = 'https://bit.ly/3viQgHw' 

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
function timeoutLoop(delay) { setTimeout(function () {
  socialsLoop('#kajo88')
}, delay)
}

function socialsLoop(channel) {
  console.log('TimeoutLoop')
  client.say(channel, ` SeemsGood Check out my socials! SeemsGood  Twitter: ${twitter}  Youtube: ${youtube}`)
  timeoutLoop(1500000)
}


client.on('connected', onConnectedHandler);

client.connect();

client.on('message', (channel, tags, message, self) => {
    const isNotBot = tags.username !== process.env.TWITCH_BOT_USERNAME
   if (!isNotBot) {return}

    let commandName = message;


    if (commandName === '!commands'){
      client.say(channel, 'Current Commands: !socials, !death, !resetDeath')
    }
    if (commandName === '!socials') {
        client.say(channel, ` <3 Check out my socials! <3 Twitter: ${twitter} Youtube: ${youtube}`).then((data) => {console.log(data)})
      
    } 
    if (tags.username === 'stuffy2' || 'kajo88' || 'infinitesoldier' && commandName === '!death' ){
      deathCount++
      console.log(deathCount)
      client.say(channel, `Current Death Count is ${deathCount}`)
    }

    // if (tags.username === 'stuffy2' || 'kajo88' || 'infinitesoldier' && commandName === '!resetDeath' ){
    //   deathCount = 0
    //   console.log(deathCount)
    //   client.say(channel, `Death Count was reset to ${deathCount}`)
    // }

});

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
   return timeoutLoop(1000)
}


