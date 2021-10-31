const { ksoftapi } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const palette = require('image-palette');
const pixels = require('image-pixels');
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
	name: "lyrics",
    aliases: ["ly"],
    category: "Music",
    description: "Get lyrics for the currently playing song",
    args: false,
    usage: "",
    permission: [],
    owner: false,
	 execute: async (message, args, client, prefix) => {
    
        let player = await client.manager.get(message.guild.id);
        let SongTitle = args.join(" ");
        let SearchString = args.join(" ");
        if (!args[0] && !player)
          return client.sendTime(
            message.channel,
            "❌ | **Nothing is playing right now...**"
          );
        if (!args[0]) SongTitle = player.queue.current.title;
        SongTitle = SongTitle.replace(
          /lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
          ""
        );
    
        let lyrics = await lyricsFinder(SongTitle);
        if (!lyrics)
          return client.sendTime(
            message.channel,
            `**No lyrics found for -** \`${SongTitle}\``
          );
        lyrics = lyrics.split("\n"); //spliting into lines
        let SplitedLyrics = _.chunk(lyrics, 40); //45 lines each page
    
        let Pages = SplitedLyrics.map((ly) => {
          let em = new MessageEmbed()
            .setAuthor(`Lyrics for: ${SongTitle}`, client.botconfig.IconURL)
            .setColor(client.botconfig.EmbedColor)
            .setDescription(ly.join("\n"));
    
          if (args.join(" ") !== SongTitle)
            em.setThumbnail(player.queue.current.displayThumbnail());
    
          return em;
        });
    
        if (!Pages.length || Pages.length === 1)
          return message.channel.send(Pages[0]);
        else return client.Pagination(message, Pages);

    },
    chunkString(str, size) {
        const numChunks = Math.ceil(str.length / size)
        const chunks = new Array(numChunks)
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size)
        }
        return chunks
    }

}