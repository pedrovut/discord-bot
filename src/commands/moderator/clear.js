const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  InteractionContextType,
  MessageFlags,
} = require("discord.js");

module.exports = {
  cooldown: 1,
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Limpa todas as últimas mensagens no canal atual.")
    .addIntegerOption((option) =>
      option
        .setName("quantidade")
        .setDescription("Quantas mensagens serão deletadas (máximo de 100).")
        .setRequired(true),
    )
    .addBooleanOption((option) =>
      option
        .setName("ocultar")
        .setDescription("Ocultar a mensagem final (padrão: sim).")
        .setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setContexts(InteractionContextType.Guild),

  async execute(interaction) {
    let amount = interaction.options.getInteger("quantidade", true);
    let isSecret = interaction.options.getBoolean("ocultar", false);

    if (amount > 100) {
      return interaction.reply({
        content: "Eu não consigo deletar **mais de 100 mensagens** de uma vez.",
        flags: MessageFlags.Ephemeral,
      });
    }
    if (amount < 1) {
      return interaction.reply({
        content: `Não é possível apagar **${amount} mensagens**.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      interaction.channel.messages.fetch({ limit: amount }).then((msg) => {
        interaction.channel.bulkDelete(msg);

        if (isSecret) {
          interaction.reply({
            content: `${amount} mensagens foram deletadas com sucesso!`,
            flags: MessageFlags.Ephemeral,
          });
        } else {
          interaction.reply(`${amount} mensagens foram apagadas com sucesso.`);
        }
      });
    } catch (err) {
      interaction.reply({
        content: "Ocorreu um erro ao executar o comando.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
