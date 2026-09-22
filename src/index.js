require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { commands } = require("./handlers/commands");
const events = require("./handlers/events");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = commands;
client.cooldowns = new Collection();

events.run(client);

console.log("Comandos carregados na memória:", client.commands.map(c => c.data.name));
client.login(process.env.CLIENT_TOKEN);