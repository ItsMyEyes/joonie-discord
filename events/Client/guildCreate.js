const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const moment = require('moment');
const { readdirSync } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');

module.exports = async (client, guild) => {
  
  const channel = client.channels.cache.get(config.logs);
  let own = await guild.fetchOwner()
  const dataToPush = [];
        
  readdirSync("../../slashCommands/").forEach((dir) => {
      const slashCommandFile = readdirSync(`../../slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));

      for (const file of slashCommandFile) {
          const slashCommand = require(`../../slashCommands/${dir}/${file}`);
          if(!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);
          if(!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);
          dataToPush.push({
              name: slashCommand.name,
              description: slashCommand.description,
              options: slashCommand.options ?? null
          });
      }
  });

  const rest = new REST({ version: '9' }).setToken(token);
  (async () => {
      channel.send('```Started refreshing application (/) commands. Guild name: '+ guild.name +' ```');
      await rest.put(
          Routes.applicationGuildCommands(clientId, guild.id),
          { body: data },
      );
      channel.send('```Successfully reloaded application (/) commands. Guild name:'+ guild.name +' ```');
  })();
  
  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📥 Joined a Guild !!`)
    .addField('Name', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Owner', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``)
    .addField('Member Count', `\`${guild.memberCount}\` Members`)
    .addField('Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .setColor(client.embedColor)
    .addField(`${client.user.username}'s Server Count`, `\`${client.guilds.cache.size}\` Severs`)
    .setTimestamp()
    channel.send({embeds: [embed]})
	
}
