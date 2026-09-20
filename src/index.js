require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { commands } = require("./handlers/commands");
const { runEvent } = require("./handlers/events");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = commands;
client.cooldowns = new Collection();

runEvent(client);

console.log("Comandos carregados na memória:", client.commands.map(c => c.data.name));
client.login(process.env.CLIENT_TOKEN);