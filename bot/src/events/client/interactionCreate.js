// This interactionCreate is when user make some interaction, and redirect to correct interaction.

module.exports = {
  //Some input
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (e) {
        console.log(e);
        await interaction.reply({
          content: `Something went wrong while executing this command...`,
          ephemeral: true,
        });
      }
      // Some click in button
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("There is not code for this button");

      try {
        await button.execute(interaction, client);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
