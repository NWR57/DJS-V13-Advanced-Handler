const Discord = require('discord.js');
const config = require("../botconfig/config.json");

/**
 * @param {Discord.Client} client
 */

module.exports = async (client) => {

  console.log(`\n${`Welcome to`.brightCyan} ${`Nadid Wasique`.brightYellow} ${`Handler Console`.brightCyan}`);

  // Console Log
  client.logger = (data) => {
    var currentdate = new Date();
    let logstring = `${`${`logs@${config.bot_config.bot_name}`.brightYellow} ${`|`.brightMagenta} ${`${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`.brightGreen} ${`|`.brightMagenta} ${`${currentdate.toLocaleTimeString()}`.brightBlue} ${`|`.brightMagenta}`}`
    if (typeof data == "string") {
      console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
    } else if (typeof data == "object") {
      console.log(logstring, JSON.stringify(data, null, 3).green)
    } else if (typeof data == "boolean") {
      console.log(logstring, String(data).cyan)
    } else {
      console.log(logstring, data)
    }
  };


  client.on("voiceStateUpdate", (oldState, newState) => {
    try {
      //Skip if it is not the bot
      if (client.user.id != newState.id) return;
      if ((!oldState.streaming && newState.streaming) || (oldState.streaming && !newState.streaming) || (!oldState.serverDeaf && newState.serverDeaf) || (oldState.serverDeaf && !newState.serverDeaf) || (!oldState.serverMute && newState.serverMute) || (oldState.serverMute && !newState.serverMute) || (!oldState.selfDeaf && newState.selfDeaf) || (oldState.selfDeaf && !newState.selfDeaf) || (!oldState.selfMute && newState.selfMute) || (oldState.selfMute && !newState.selfMute) || (!oldState.selfVideo && newState.selfVideo) || (oldState.selfVideo && !newState.selfVideo))
        if ((!oldState.channelId && newState.channelId) || (oldState.channelId && newState.channelId)) {
          try {
            newState.setDeaf(true);
          } catch { }
          return;
        }
    } catch { }

  });

  //ANTI UNMUTE
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if (newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false) {
      try {
        newState.setDeaf(true).catch(() => { });
      } catch (e) {
        console.log(String(e.stack).bgRed)
      }
    }
  });

  client.logger(`・Loaded ExtraEvents`.brightGreen);
}