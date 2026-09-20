require("dotenv").config();
const { guild_id, client_id } = require("../config.json");

const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.error(`O comando em ${filePath} não possui "data" ou "execute".`);
    }
  }
}

const rest = new REST().setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log(`? > Carregando ${commands.length} comandos...`);

    const data = await rest.put(
      Routes.applicationGuildCommands(client_id, guild_id),
      { body: commands },
    );

    console.log(`! > ${data.length} comandos carregados.`);
  } catch (err) {
    console.error(err);
  }
})();
