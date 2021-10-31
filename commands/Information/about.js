const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "about",
    category: "Information",
    aliases: [ "botinfo" ],
    description: "See description about this project",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
     
    const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`)
    );

      const mainPage = new MessageEmbed()
            .setAuthor('Joonie', 'https://cdn.discordapp.com/avatars/779766625468809266/c624299bd1ceda23cc268de0ca203c46.png?size=256')
            .setThumbnail('https://cdn.discordapp.com/avatars/779766625468809266/c624299bd1ceda23cc268de0ca203c46.png?size=256')
            .setColor('#303236')
            .addField('Creator', '[Devil](https://github.com/ItsMyEyes)', true)
            .addField('Organization', '[ItsMyEyes](https://github.com/ItsMyEyes)', true)
            .addField('Repository', '[Here](https://github.com/ItsMyEyes/Joonie)', true)
        return message.channel.send({embeds: [mainPage], components: [row]});
    }
}