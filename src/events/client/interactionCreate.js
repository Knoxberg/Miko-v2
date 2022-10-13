module.exports = {
    name : 'interactionCreate',
    async execute(interaction, client) {

        // Kalau menerima interaksi dari DM, kirim pesan bahwa bot tidak bisa menerima interaksi dari DM
        if (!interaction.guild) {
            console.log(`${interaction.user.tag} di DM membuat interaksi. (${interaction.commandName})`);
            await interaction.reply({
                content: 'Bot hanya menerima interaksi dari server!',
                ephemeral: true
            });
            return;
        } 

        // Kalau menerima interaksi dari guild (server), lanjutkan
        else {
            // Cek apakah interaksi yang diterima adalah perintah
            if (interaction.isChatInputCommand()) {
                const { commands } = client;
                const command = commands.get(interaction.commandName);
                
                // Cek apakah perintah yang diterima ada di dalam Collection perintah, kalau tidak ada, return
                if (!command) {
                    return;
                }
                console.log(`${interaction.user.tag} di Server "${interaction.guild.name}" channel #${interaction.channel.name} membuat interaksi. (${interaction.commandName})`);
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
}