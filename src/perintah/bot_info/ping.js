const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Menunjukkan delay latency bot'),
    
    async execute(interaction, client) {
        try {
            const message = await interaction.deferReply({
                fetchReply: true
            });
       
            const pesanBaru = `Latency client bot: ${message.createdTimestamp - interaction.createdTimestamp}ms.\nLatency API: ${client.ws.ping}ms`;
            await interaction.editReply({
                content: pesanBaru
            });
        } catch (error) {
            console.log(error);
        }
    }
}