const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("user").setDescription("user info"),
  async execute(interaction) {
    interaction.reply(
      `Usuário: ${interaction.user.globalName} (${interaction.user.username})\n Entrou em: ${interaction.member.joinedAt}`,
    );
  },
};
