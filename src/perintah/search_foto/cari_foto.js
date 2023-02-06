const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var Scraper = require('images-scraper');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('image')
        .setDescription('Mencari gambar sesuai dengan keyword')
        .setDMPermission(true) // Bisa dipakai melalui DM
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('keyword gambar yang ingin dicari, max 100 karakter')
                .setMinLength(1)
                .setMaxLength(100)
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('jumlah')
                .setDescription('Berapa banyak gambar yang ingin dicari, max 5')
                .setMinValue(1)
                .setMaxValue(5)
                .setRequired(false)
        ),

    async execute(interaction, client) {
        await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        async function pencariGambar(interaction_Input, keyword_Gambar_Input, jumlah_Gambar_Input) {
            try {
                // Ambil keyword dari opsi
                const keyword = keyword_Gambar_Input;
                await interaction_Input.editReply({
                    content: `Miko masih mencari gambar dengan keyword \`${keyword}\``,
                })
                console.log(`${interaction_Input.user.tag} mencari gambar dengan keyword "${keyword}"`);
                // Cari gambar
                const google = new Scraper({
                    puppeteer : {
                        headless: true 
                    }
                });
                // Ambil 1 gambar dari hasil pencarian
                const buffer_Gambar = await google.scrape(keyword, jumlah_Gambar_Input);

                // Jika jumlah gambar lebih dari 1, maka buat array dari hasil pencarian
                if (jumlah_Gambar_Input != 1 ){
                    // Buat array kosong untuk hasil pencarian
                    var hasil_Gambar = [];

                    for (let i = 0; i < jumlah_Gambar_Input; i++) {
                        // Masukkan hasil pencarian ke array
                        hasil_Gambar.push(buffer_Gambar[i].url);
                    }

                    // Kirim hasil pencarian
                    await interaction_Input.editReply({
                        content: hasil_Gambar.join('\n'),
                    });

                }
                // Jika jumlah gambar hanya 1, maka langsung ambil url dari hasil pencarian
                else {
                    await interaction_Input.editReply({
                        content: buffer_Gambar[0].url,
                    })
                }
                
            } catch (error) {
                console.log(error);
            }
        }

        try {
           var berapaJumlahGambar = 1;

            // Jika user tidak memasukkan nilai jumlah gambar, maka menggunkan default jumlah gambar
            if (interaction.options.getInteger('jumlah') == null || interaction.options.getInteger('jumlah') == undefined || interaction.options.getInteger('jumlah') == 0) {
                berapaJumlahGambar = 1;
                await interaction.editReply({
                    content: `Menggunakan default jumlah gambar: 1`,
                })
                
                // Jalankan fungsi pencariGambar
                pencariGambar(interaction, interaction.options.getString('keyword'), berapaJumlahGambar);
                
            }

            // Jika jumlah gambar lebih dari 5, maka jumlah gambar akan diatur menjadi 5
            if (interaction.options.getInteger('jumlah') < 0 || interaction.options.getInteger('jumlah') > 5) {
                berapaJumlahGambar = 5;
                await interaction.editReply({
                    content: `Jumlah gambar tidak valid, Tidak menerima jumlah negatif atau lebih dari batas\nmenggunakan default jumlah gambar: 1`,
                })
                
                // Jalankan fungsi pencariGambar
                pencariGambar(interaction, interaction.options.getString('keyword'), berapaJumlahGambar);
            }

            // Jika jumlah gambar valid, maka jalankan fungsi pencariGambar dengan jumlah gambar yang diinputkan
            if (interaction.options.getInteger('jumlah') > 0 && interaction.options.getInteger('jumlah') <= 5) {
                berapaJumlahGambar = interaction.options.getInteger('jumlah');
            
                // Jalankan fungsi pencariGambar
                pencariGambar(interaction, interaction.options.getString('keyword'), berapaJumlahGambar);
            }
        } catch (error) {
            console.log(error);
        }
    }
}