const path = require("node:path");
const fs = require("node:fs");

const foldersPath = path.join(__dirname, "..", "commands");
const commandFolders = fs.readdirSync(foldersPath);

const { Collection } = require("discord.js");
const commands = new Collection();

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.error(`O comando em ${filePath} não possui "data" ou "execute".`);
    }
  }
}

module.exports = { commands };