const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsFolders = fs.readdirSync(`./src/commands`);
    for (const folder of commandsFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Command: ${command.data.name} has been passed`);
      }
    }
    const clientId = process.env.client_id;
    const guildId = process.env.guild_id;
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("Started refreshing app (/) commmands.");

      await rest.put(Routes.applicationCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log("Well done! Reloaded application (/) commands.");
    } catch (e) {
      console.log(e);
    }
  };
};
