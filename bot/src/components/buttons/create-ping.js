const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "create-ping",
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("FIXA T8")
      .setDescription("Conteúdo PVE fixa t8 para farm de fama")
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
          name: "Mapa",
          value: "Thunderrock Ascent",
          inline: false,
        },
        {
          name: "Local de partida",
          value: "Lymhust portal",
          inline: true,
        },
        {
          name: "Horário",
          value: "19:30",
          inline: true,
        },
        {
          name: "IP",
          value: "1250",
          inline: false,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
