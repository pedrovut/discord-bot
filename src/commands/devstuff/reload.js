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
    )
    .addStringOption((option) =>
      option
        .setName("categoria")
        .setDescription("Categoria do comando.")
        .setRequired(true)
        .addChoices(
          { name: "Utilidades", value: "utils" },
          { name: "Ferramentas do Desenvolvedor", value: "dev" },
        ),
    ),

  async execute(interaction) {
    const commandName = interaction.options
      .getString("comando", true)
      .toLowerCase();

    const categoryName = interaction.options
      .getString("categoria", true)
      .toLowerCase();

    const categories = {
      utils: "utility",
      dev: "devstuff",
    };

    const command = interaction.client.commands.get(commandName);

    if (!command) {
      return interaction.reply({
        content: `Não existe um comando chamado "**${commandName}**".`,
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      delete require.cache[
        require.resolve(
          `../${categories[categoryName]}/${command.data.name}.js`,
        )
      ];

      const newCommand = require(
        `../${categories[categoryName]}/${command.data.name}.js`,
      );
      interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(
        `Comando \`${newCommand.data.name}\` foi recarregado.`,
      );
    } catch (err) {
      console.error(err);
      await interaction.reply(
        `O comando **${commandName}** não existe ou não foi encontrado em **${categoryName}**.`,
      );
    }
  },
};
