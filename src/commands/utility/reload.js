const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Recarrega os comandos.")
    .addStringOption((option) =>
      option
        .setName("comando")
        .setDescription("O comando a ser recarregado.")
        .setRequired(true),
    ),

  async execute(interaction) {
    const commandName = interaction.options
      .getString("comando", true)
      .toLowerCase();

    const command = interaction.client.commands.get(commandName);

    if (!command) {
      return interaction.reply({
        content: `Não existe um comando chamado "**${commandName}**".`,
        flags: MessageFlags.Ephemeral,
      });
    }

    delete require.cache[require.resolve(`./${command.data.name}.js`)];

    try {
      const newCommand = require(`./${command.data.name}.js`);
      interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(
        `Command \`${newCommand.data.name}\` foi recarregado.`,
      );
    } catch (err) {
      console.error(err);
      await interaction.reply(
        `Ocorreu um erro ao executar o comando \`${command.data.name}\`:\n\`${error.message}\``,
      );
    }
  },
};
