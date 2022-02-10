const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require('node-fetch');
const game = require('../../utils/game.json')
const config = require('../../config.json')

module.exports = {
  name: "together",
  aliases: ["tg", "tog", "mabar"],
  category: "Fun",
  description: "Together ",
  args: true,
  usage: "",
  permission: [],
  owner: false,
  inVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    let argGame = args.join(" ");
    const { channel } = message.member.voice;
    const applications = {
        youtube: '880218394199220334', // Note : First package to include the new YouTube Together version, any other package offering it will be clearly inspired by it
        youtubedev: '880218832743055411', // Note : First package to include the new YouTube Together development version, any other package offering it will be clearly inspired by it
        betrayal: '773336526917861400',
        fishing: '814288819477020702',
        lettertile: '879863686565621790', // Note : First package to offer lettertile, any other package offering it will be clearly inspired by it
        wordsnack: '879863976006127627', // Note : First package to offer wordsnack any other package offering it will be clearly inspired by it
        doodlecrew: '878067389634314250', // Note : First package to offer doodlecrew, any other package offering it will be clearly inspired by it
        awkword: '879863881349087252', // Note : First package to offer awkword, any other package offering it will be clearly inspired by it
        spellcast: '852509694341283871', // Note : First package to offer spellcast, any other package offering it will be clearly inspired by it
      };
    let returnData = {
      code: 'none',
    };
    if (argGame && applications[argGame.toLowerCase()]) {
      let applicationID = applications[argGame.toLowerCase()];
      try {
        await fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
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
            Authorization: `Bot ${config.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((invite) => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (Number(invite.code) === 50013) console.warn('Your bot lacks permissions to perform that action');
            const code = `https://discord.com/invite/${invite.code}`;
            const row = new MessageActionRow()
              .addComponents(
                new MessageButton()
            .setLabel("Join")
            .setStyle("LINK")
            .setURL(code)
            );

            const what = argGame.toLowerCase() == 'youtube' ? 'watch' : 'play'
            const banner = argGame.toLowerCase() == 'youtube' ? 'https://www.freepnglogos.com/uploads/youtube-vector-logo-png-9.png' : 'https://img.freepik.com/free-vector/skull-gaming-with-joy-stick-emblem-modern-style_32991-492.jpg?size=338&ext=jpg&ga=GA1.1.1512320784.1641945600'

            const mainPage = new MessageEmbed()
                  .setAuthor('Joonie', 'https://previews.123rf.com/images/hvostik/hvostik2003/hvostik200300056/141605624-video-game-playing-online-gamer-with-a-laptop-sits-on-a-big-joystick-young-guy-is-playing-an-online-.jpg')
                  .setThumbnail(banner)
                  .setColor('#303236')
                  .addField('Together', `[${argGame.toUpperCase()}](${code})`, true)
                  .setDescription(`Lets join with your friend to ${what} ${argGame.toUpperCase()} together`)
              return message.channel.send({embeds: [mainPage], components: [row]});
          });
      } catch (err) {
        let thing = new MessageEmbed()
            .setColor("RED")
            .setDescription(`I Think you must contact developer, kiyora#8959`);
         return message.channel.send({embeds: [thing]});
      }
      return returnData;
    } else {
      let s = new MessageEmbed()
          .setColor("RED")
          .setDescription(`Invalid options`);
       return message.channel.send({embeds: [s]});
    }
  },
};