const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { readdirSync } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');

client.on("ready", () => {
    const dataToPush = [];
        
    readdirSync("./slashCommands/").forEach((dir) => {
        const slashCommandFile = readdirSync(`./slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));

        for (const file of slashCommandFile) {
            const slashCommand = require(`./slashCommands/${dir}/${file}`);
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
        client.guilds.cache.forEach(async (guild, index) => {
            try {
                console.log(`Started refreshing application (/) commands. Guild Name: ${guild.name}`);
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guild.id),
                    { body: dataToPush },
                );
                console.log(`Successfully reloaded application (/) commands. Guild Name: ${guild.name}`);
            } catch (error) {
                console.error(error);
            }
        });
    })();
});

client.login(token)