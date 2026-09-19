const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName("ping").setDescription("ping"),
  async execute(interaction) {
    interaction.reply('Pong!')
  }
}

