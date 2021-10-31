const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const game = require('../../utils/game.json')

module.exports = {
  name: "together",
  aliases: ["tg", "tog", "mabar"],
  category: "Fun",
  description: "Together ",
  args: true,
  usage: "",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    let argGame = args.join(" ");
    if (game.indexOf(argGame) != -1) {
        
    }
  },

  async createTogetherCode(voiceChannelId, option) {
    /**
     * @param {string} code The invite link (only use the blue link)
     */
     const applications = {
        youtube: '880218394199220334', // Note : First package to include the new YouTube Together version, any other package offering it will be clearly inspired by it
        youtubedev: '880218832743055411', // Note : First package to include the new YouTube Together development version, any other package offering it will be clearly inspired by it
        poker: '755827207812677713',
        betrayal: '773336526917861400',
        fishing: '814288819477020702',
        chess: '832012774040141894',
        chessdev: '832012586023256104', // Note : First package to offer chessDev, any other package offering it will be clearly inspired by it
        lettertile: '879863686565621790', // Note : First package to offer lettertile, any other package offering it will be clearly inspired by it
        wordsnack: '879863976006127627', // Note : First package to offer wordsnack any other package offering it will be clearly inspired by it
        doodlecrew: '878067389634314250', // Note : First package to offer doodlecrew, any other package offering it will be clearly inspired by it
        awkword: '879863881349087252', // Note : First package to offer awkword, any other package offering it will be clearly inspired by it
        spellcast: '852509694341283871', // Note : First package to offer spellcast, any other package offering it will be clearly inspired by it
      };
    let returnData = {
      code: 'none',
    };
    if (option && applications[option.toLowerCase()]) {
      let applicationID = applications[option.toLowerCase()];
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: applicationID,
            target_type: 2,
            temporary: false,
            validate: null,
          }),
          headers: {
            Authorization: `Bot ${this.client.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((invite) => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (Number(invite.code) === 50013) console.warn('Your bot lacks permissions to perform that action');
            returnData.code = `https://discord.com/invite/${invite.code}`;
          });
      } catch (err) {
        throw new Error('An error occured while starting Youtube together !');
      }
      return returnData;
    } else {
      throw new SyntaxError('Invalid option !');
    }
  }
};