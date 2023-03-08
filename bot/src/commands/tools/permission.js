const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permission")
    .setDescription("This commands requires permission")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Add permission to call this command.
  async execute(interaction, client) {
    const { roles } = interaction.member;
    const role = await interaction.guild.roles
      .fetch("1082413585306755173")
      .catch(console.error);
    const testRole = await interaction.guild.roles
      .create({
        name: `Test`,
        permissions: [PermissionsBitField.Flags.KickMembers],
      })
      .catch(console.error);

    // if has role
    if (roles.cache.has("1082413585306755173")) {
      await interaction.deferReply({
        fetchReply: true,
      });

      // remove role
      await roles.remove(role).catch(console.error);
      await interaction.editReply({
        content: `Removed ${role.name} role from you.`,
      });
      await roles.add(testRole).catch(console.error);

      await testRole
        .setPermissions([PermissionsBitField.Flags.BanMembers])
        .catch(console.error);

      // Create channel
      const channel = await interaction.guild.channels.create({
        name: interaction.user.username + " room",
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: testRole.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });

      await channel.permissionOverwrites
        .edit(testRole.id, { SendMessages: false })
        .catch(console.error);
    } else {
      await interaction.reply({
        content: `You do not have the ${role.name} role.`,
      });
    }
  },
};
