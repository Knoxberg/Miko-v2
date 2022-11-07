const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Menunjukkan delay latency bot')
    .setDMPermission(true), // Bisa dipakai melalui DM
    
    async execute(interaction, client) {
        try {
            const message = await interaction.deferReply({
                fetchReply: true,
                ephemeral: false
            });
       
            const isiEmbed = new EmbedBuilder()
                //.setColor(0x0099FF)
                .setColor('#FFC0CB')
                .setTitle('Latency Bot')
                .setDescription('Semakin rendah nilai latency, semakin baik.')
                .addFields(
                    { name: 'Latency Client -> Bot:', value: `\`${message.createdTimestamp - interaction.createdTimestamp}\` ms`, inline: true },
                    { name: 'Latency REST API:', value: `\`${client.ws.ping}\` ms`, inline: true },
                    { name: 'Latency Total:', value: `\`${message.createdTimestamp - interaction.createdTimestamp + client.ws.ping}\` ms`, inline: false }
                );

            await interaction.editReply({
                embeds: [isiEmbed],
            });

        } catch (error) {
            console.log(error);
        }
    }
}