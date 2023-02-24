const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Return a select menu."),
  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .addOptions(
        {
          label: "PvE",
          description: "Conteudo de matar monstrinho",
          value: "pve",
        },
        {
          label: "PvP",
          description: "Conteudo de matar manés",
          value: "pvp",
        }
      )
      .setCustomId("sub-menu")
      .setPlaceholder("Selecione um conteúdo");
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
