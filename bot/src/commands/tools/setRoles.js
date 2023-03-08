const { SlashCommandBuilder, GuildMemberRoleManager } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setroles")
    .setDescription("set roles to user using reactions"),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: `React with your main role`,
      fetchReply: true,
    });
    const weaponsEmojis = fs
      .readdirSync("./assets/weapons")
      .map((weapon) => weapon.split(".")[0]);

    const emojis = weaponsEmojis.map((weapon) =>
      message.guild.emojis.cache.find((emoji) => emoji.name === weapon)
    );
    message.react(emojis[0]);

    const filter = (reaction, user) => {
      return (
        weaponsEmojis.includes(reaction.emoji.name) && client.user.id != user.id
      );
    };

    const collector = message.createReactionCollector({ filter });
    collector.on("collect", async (reaction, user) => {
      const role = interaction.guild.roles.cache.find(
        (role) => role.name === reaction._emoji.name.split("2H_")[1]
      );
      const member = await interaction.guild.members.fetch(user.id);
      console.log(role);
      member.roles.add(role);
    });
  },
};
