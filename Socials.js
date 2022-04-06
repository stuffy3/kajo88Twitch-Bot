require('dotenv').config();

const tmi = require('tmi.js');


let twitter = 'https://www.twitter.com/Kajo_ssb'
let youtube = 'https://bit.ly/3viQgHw' 
let streamStartTime = new Date().getTime()
console.log(streamStartTime)
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

function timeoutLoop(delay) { setTimeout(function () {
  socialsLoop('#kajo88')
}, delay)
}

function socialsLoop(channel) {
  console.log('TimeoutLoop')
  client.say(channel, ` PogChamp Check out my socials! PogChamp  Twitter: ${twitter}  Youtube: ${youtube}`)
  timeoutLoop(1500000)
}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
   return timeoutLoop(1000) 
}

//functionality for messages
client.on('message', (channel, tags, message) => {
    const isNotBot = tags.username !== process.env.TWITCH_BOT_USERNAME
   if (!isNotBot) {return}

    let commandName = message;

    if (commandName === '!commands'){
      client.say(channel, 'Current Commands: !follow, !socials, !uptime')
    }
    if (commandName === '!socials') {
        client.say(channel, ` PogChamp Check out my socials! PogChamp Twitter: ${twitter} Youtube: ${youtube}`).then((data) => {console.log(data)})
    } 
    if (commandName === '!follow' ){
      client.say(channel, `PogChamp Be sure to give the stream a follow! PogChamp`)
    }
    if (commandName === '!uptime' ){
      let newTime = new Date().getTime()
      let upTime = Math.round((newTime - streamStartTime) / 60000)
      if(upTime >= 60){
          let hour = Math.floor(upTime/60)
          let minutes = upTime - 60
          if(hour >= 2){
            client.say(channel, `The stream has been live for ${hour}hours and ${minutes} minutes.`)
          } else {
          client.say(channel, `The stream has been live for ${hour} hour and ${minutes} minutes.`)
          }
      } else {
      client.say(channel, `The stream has been live for ${upTime} minutes.`)
    }
  }
});



