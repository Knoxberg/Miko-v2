const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var Scraper = require('images-scraper');

module.exports = {
    data : new SlashCommandBuilder()
     .setName('image')
     .setDescription('Mencari gambar sesuai dengan keyword')
     .setDMPermission(true) // Bisa dipakai melalui DM
     .addStringOption(option =>
		option.setName('keyword')
			.setDescription('Apa yang ingin kamu cari?')
			.setRequired(true)),
    
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        try {
            // Ambil keyword dari opsi
            const keyword = interaction.options.getString('keyword');
            await interaction.editReply({
                content: `Miko masih mencari gambar dengan keyword \`${keyword}\``,
            })
            console.log(`${interaction.user.tag} mencari gambar dengan keyword "${keyword}"`);
            // Cari gambar
            const google = new Scraper({
                puppeteer : {
                    headless: true 
                }
            });
            // Ambil 1 gambar dari hasil pencarian
            const hasil_gambar = await google.scrape(keyword, 1);
            await interaction.editReply({
                content: hasil_gambar[0].url
            })
        } catch (error) {
            console.log(error);
        }
    }
}