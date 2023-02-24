const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Return a modal"),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("test-modal")
      .setTitle("Fav Color?");

    const textInput = new TextInputBuilder()
      .setCustomId("favColorInput")
      .setLabel("What is your favorite color?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput));

    await interaction.showModal(modal);
  },
};
