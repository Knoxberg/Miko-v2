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
			.setRequired(true))
     .addIntegerOption(option =>
        option.setName('jumlah')
            .setDescription('Berapa banyak gambar yang ingin kamu cari?')
            .setRequired(false)),
    
    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        try {
            const keyword = interaction.options.getString('keyword');
            var jumlah = interaction.options.getInteger('jumlah');

            if (jumlah != null) {
                if (jumlah > 5) {
                    await interaction.editReply({
                        content: 'Miko tidak bisa mencari lebih dari 5 gambar sekaligus',
                    });
                    return;
                }
            } else {
                jumlah = 1;
            }

            console.log(`${interaction.user.tag} mencari gambar dengan keyword "${keyword}", jumlah ${jumlah}`);
            // Cari gambar
            const google = new Scraper({
                puppeteer : {
                    headless: true 
                }
            });
            // Ambil 1 gambar dari hasil pencarian
            let hasil_gambar = await google.scrape(keyword, jumlah);

            var bufferTier1 = [];
            for (let i = 0; i < jumlah; i++) {
                bufferTier1.push(hasil_gambar[i].url);
            }

            await interaction.editReply({
                content: bufferTier1.join('\n'),
            })

        } catch (error) {
            console.log(error);
        }
    }
}