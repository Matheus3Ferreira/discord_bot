const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactor")
    .setDescription("Return reactions."),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: `React here!`,
      fetchReply: true,
    });

    // const bowAvalonEmoji = message.guild.emojis.cache.find(
    //   (emoji) => emoji.name === "BOW_AVALON"
    // );
    // message.react(bowAvalonEmoji);

    //get names of emojis from assets files, and get name before .png
    const weaponsEmojis = fs
      .readdirSync("./assets/weapons")
      .map((weapon) => weapon.split(".")[0]);

    const emojis = weaponsEmojis.map((weapon) =>
      message.guild.emojis.cache.find((emoji) => emoji.name === weapon)
    );
    emojis.forEach((emoji) => message.react(emoji));

    const filterApple = (reaction, user) => {
      return reaction.emoji.name == "🍎" && user.id == interaction.user.id;
    };

    const filterBowAvalon = (reaction, user) => {
      return reaction.emoji.name;
    };

    const collector = message.createReactionCollector({
      time: 15000,
      filterBowAvalon,
    });

    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};
