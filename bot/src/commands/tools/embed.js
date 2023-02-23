const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Return an embed"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("This is an embed")
      .setDescription("This is an cool description")
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL("http://google.com")
      .addFields([
        {
          name: "Field 1",
          value: "Value 1",
          inline: true,
        },
        {
          name: "Field 2",
          value: "Value 2",
          inline: false,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
