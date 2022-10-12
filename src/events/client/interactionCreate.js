module.exports = {
    name : 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const command = commands.get(interaction.commandName);

            if (!command) {
                return;
            }
            //console.log(`${interaction.user.tag} di #${interaction.channel.name} membuat interaksi. (${interaction.commandName})`);
            try {

                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);

                await interaction.reply({
                    content: 'Terjadi kesalahan saat menjalankan perintah ini!',
                    ephemeral: true
                });
            }
        }
    }
}