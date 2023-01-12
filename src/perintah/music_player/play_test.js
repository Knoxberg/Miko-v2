const {SlashCommandBuilder, EmbedBuilder, ChannelType, ChannelFlags} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('play_test')
    .setDescription('Memutar musik')
    .setDMPermission(false), // Tidak bisa dipakai melalui DM

    async execute(interaction, client) {
        try {
            const channel = interaction.member.voice.channel;
            await interaction.deferReply({
                fetchReply: true,
                ephemeral: false
            })
            if (!channel) {
                await interaction.editReply({
                    content: `Kamu harus berada di voice channel untuk menggunakan perintah ini\n ${interaction.user.tag}`,
                    ephemeral: false,
                });
            } else {
                await interaction.editReply({
                    content: `Nama Channel: ${channel.name}
                    ID Channel: ${channel.id}
                    Jenis Channel: ${channel.type}
                    Jumlah User: ${channel.members.size}
                    Jumlah User yang bisa berbicara: ${channel.members.filter(member => !member.voice.selfDeaf).size}
                    Jumlah User yang tidak bisa berbicara: ${channel.members.filter(member => member.voice.selfDeaf).size}
                    Jumlah User yang tidak bisa mendengar: ${channel.members.filter(member => member.voice.selfMute).size}
                    Jumlah User yang bisa mendengar: ${channel.members.filter(member => !member.voice.selfMute).size}
                    Jumlah User yang tidak bisa berbicara dan mendengar: ${channel.members.filter(member => member.voice.selfMute && member.voice.selfDeaf).size}
                    Jumlah User yang bisa berbicara dan mendengar: ${channel.members.filter(member => !member.voice.selfMute && !member.voice.selfDeaf).size}
                    Jumlah User yang tidak bisa berbicara dan bisa mendengar: ${channel.members.filter(member => member.voice.selfMute && !member.voice.selfDeaf).size}
                    Jumlah User yang bisa berbicara dan tidak bisa mendengar: ${channel.members.filter(member => !member.voice.selfMute && member.voice.selfDeaf).size} 
                    Jumlah User yang tidak bisa berbicara dan tidak bisa mendengar: ${channel.members.filter(member => member.voice.selfMute && member.voice.selfDeaf).size}
                    Jumlah User yang bisa berbicara dan tidak bisa mendengar: ${channel.members.filter(member => !member.voice.selfMute && member.voice.selfDeaf).size}
                    Jumlah User yang tidak bisa berbicara dan bisa mendengar: ${channel.members.filter(member => member.voice.selfMute && !member.voice.selfDeaf).size}
                    Jumlah User yang bisa berbicara dan bisa mendengar: ${channel.members.filter(member => !member.voice.selfMute && !member.voice.selfDeaf).size}
                    Jumlah User yang tidak bisa berbicara dan tidak bisa mendengar: ${channel.members.filter(member => member.voice.selfMute && member.voice.selfDeaf).size}
                    Jumlah User yang bisa berbicara dan tidak bisa mendengar: ${channel.members.filter(member => !member.voice.selfMute && member.voice.selfDeaf).size}`,
                })
                const permissions = channel.permissionsFor(interaction.client.user);
                console.log(permissions);
                if (!permissions.has('CONNECT')) {
                    await interaction.editReply({
                        content: `Kamu tidak memiliki izin untuk masuk ke voice channel ini`,
                        ephemeral: true,
                    });
                } else if (!permissions.has('SPEAK')) {
                    await interaction.editReply({
                        content: `Kamu tidak memiliki izin untuk berbicara di voice channel ini`,
                        ephemeral: true,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}