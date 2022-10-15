const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
	.setName('bot_info')
	.setDescription('Informasi tentang bot')
	.setDMPermission(true) // Bisa dipakai melalui DM
	.addSubcommand(subcommand => 
		subcommand
			.setName('creator')
			.setDescription('Informasi tentang pembuat bot')
	)
	.addSubcommand(subcommand => 
		subcommand
			.setName('jumlah_server')
			.setDescription('Informasi tentang jumlah server yang menggunakan bot ini')
	),

	async execute(interaction, client) {
		await interaction.deferReply({
			fetchReply: true,
			ephemeral: false
		});

		// Cek apakah subcommand yang dipilih adalah creator
		if (interaction.options.getSubcommand() === 'creator') {
			try {
				const isiEmbed = new EmbedBuilder()
					.setColor('#FFC0CB')
					.setTitle('Tentang Mikoo :fox:')
					.setDescription('Miko adalah bot discord yang dikembangkan secara pribadi untuk penggunaan non-komersial.')
					.addFields(
						{ name: 'Dibuat dengan  :heart_decoration:', value: '\u200B' },
						{ name: 'Tim Development', value: 'Knoxbergs', inline: true },
						{ name: 'Instagram', value: '[@ihsann_nxt](https://instagram.com/ihsann_nxt?utm_medium=copy_link)', inline: true },
					
					)
					.addFields(
						{name: 'Versi Bot:', value: '0.0.1-alpha', inline: false},
						{name: 'Build:', value: 'dev', inline: true},
						{name: 'Status Release:', value: 'Belum Release', inline: true},
					)
				await interaction.editReply({
					embeds: [isiEmbed],
					
				});
			} catch (error) {
				console.log(error);
			}
		} 
		// Cek apakah subcommand yang dipilih adalah jumlah_server
		else if (interaction.options.getSubcommand() === 'jumlah_server') {
			try {
				const promises = [
					client.shard.fetchClientValues('guilds.cache.size'),
					client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
				];
		
				return Promise.all(promises)
					.then(results => {
						const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
						const totalAnggota = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
						const isiEmbed = new EmbedBuilder()
							.setColor('#FFC0CB')
							.setTitle('Penasaran Miko ada dimana aja?')
							.setDescription(`\u200B`)
							.addFields(
								{ name: 'Jumlah Server:', value: `Miko ada di **${totalGuilds}** server berbeda loh! :tada:`, inline: false },
								{ name: 'Jumlah Member:', value: `Ada **${totalAnggota}** orang yang berteman dengan Miko! :heart_decoration:`, inline: false },
							)
						return interaction.editReply({
							embeds: [isiEmbed],
						});
					})
			} catch (error) {
				console.log(error);
			}
		}
	}
}