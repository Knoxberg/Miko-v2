module.exports = {
    name : 'interactionCreate',
    async execute(interaction, client) {
        const { apaDev } = require('../../../config.json');

        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const command = commands.get(interaction.commandName);
            
            // Cek apakah perintah yang diterima ada di dalam Collection perintah, kalau tidak ada, return
            if (!command) {
                return;
            }

            if (apaDev === true) {
                if (!interaction.guild) {
                    console.log(`${interaction.user.tag} di DM membuat interaksi. (${interaction.commandName})`);
                } else {
                    console.log(`${interaction.user.tag} di Server "${interaction.guild.name}" channel #${interaction.channel.name} membuat interaksi. (${interaction.commandName})`);
                }
            }
            
            try {
                // Jalankan perintah
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);

                // Kalau ada error, kirim pesan error ke channel
                await interaction.reply({
                    content: 'Terjadi kesalahan saat menjalankan perintah ini!',
                    ephemeral: true
                });
            }
        }
    }
}