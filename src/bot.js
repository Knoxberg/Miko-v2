const { Client, Collection, GatewayIntentBits, IntentsBitField } = require('discord.js');
const { tokenBot } = require('../config.json');
const fs = require('fs');

// Inisiasi bitfield intent
const daftarIntents = new IntentsBitField();
try {
	daftarIntents.add(
		GatewayIntentBits.Guilds
	);
} catch (error) {
	console.log(error);
	console.log('Tidak bisa menambahkan intent ke bitfield intent! Cek Privilege BOT di Discord Developer Portal!');
}

try {
	// Buat dan inisialisasi client Discord
	// commands adalah sebuah Collection yang akan menyimpan semua perintah yang akan dijalankan
	// commandArray adalah sebuah array yang akan menyimpan semua perintah yang akan dijalankan kemudian dikirim ke REST API Discord
	const client = new Client({ intents: daftarIntents });
	client.commands = new Collection();
	client.commandArray = [];

	const folderFungsi = fs.readdirSync('./src/fungsi');
	for (const folder of folderFungsi) {
		const fileFungsi = fs.readdirSync(`./src/fungsi/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of fileFungsi) {
			require(`./fungsi/${folder}/${file}`)(client);
		}
	}

	// Ketika client Discord siap, tulis ready di console
	client.once('ready', () => {
		console.log('Inisialisasi bot dimulai!');
	});

	// Call handler
	client.handlerPerintah();
	client.handlerEvents();

	// Login client Discord
	client.login(tokenBot);

} catch (error) {
	console.log(error);
}