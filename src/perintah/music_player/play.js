const {SlashCommandBuilder, EmbedBuilder, ChannelType, ChannelFlags, VoiceChannel} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('play')
    .setDescription('Memutar musik')
    .setDMPermission(false), // Tidak bisa dipakai melalui DM

    async execute(interaction, client) {
        
    }
}