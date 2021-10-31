const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "about",
    description: "Show Joonie project information",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
   const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
			);

      const mainPage = new MessageEmbed()
            .setAuthor('Joonie', 'https://cdn.discordapp.com/avatars/779766625468809266/c624299bd1ceda23cc268de0ca203c46.png?size=256')
            .setThumbnail('https://cdn.discordapp.com/avatars/779766625468809266/c624299bd1ceda23cc268de0ca203c46.png?size=256')
            .setColor('#303236')
            .addField('Creator', '[ItsMyEyes#6618](https://github.com/brItsMyEyes) And [Venom#9718](https://github.com/Venom9718/)', true)
            .addField('Organization', '[ItsMyEyes](https://github.com/brItsMyEyes)', true)
            .addField('Repository', '[Here](https://github.com/brItsMyEyes/Joonie)', true)
            .addField('\u200b',
                `[Joonie](https://github.com/brItsMyEyes/Joonie/) is [ItsMyEyes](https://github.com/brItsMyEyes) and [Venom](https://github.com/Venom9718)'s Was created by ItsMyEyes and Venom. He really wants to make his first open source project ever. Because he wants more for coding experience. In this project, he was challenged to make project with less bugs. Hope you enjoy using Joonie!`
            )
        await interaction.followUp({embeds: [mainPage], components: [row]});
    }
}
