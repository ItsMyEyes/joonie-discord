const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "invite",
    description: "get my invite link",

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
            .addField('invite Joonie', `[Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)`, true)
           await interaction.followUp({embeds: [mainPage], components: [row]})
    }
}