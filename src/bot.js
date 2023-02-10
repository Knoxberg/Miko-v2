const { Client, Collection, GatewayIntentBits, IntentsBitField, Partials } = require('discord.js');
require('dotenv').config();
//const { tokenBot } = require('../config.json');
const tokenBot = process.env.TOKEN_BOT;
console.log(tokenBot)
const fs = require('fs');

// Inisiasi bitfield intent
const daftarIntents = new IntentsBitField();
try {
	daftarIntents.add(
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	);
} catch (error) {
	console.error(error);
	console.log('Tidak bisa menambahkan intent ke bitfield intent! Cek Privilege BOT di Discord Developer Portal!');
}

try {
	// Buat dan inisialisasi client Discord
	// commands adalah sebuah Collection yang akan menyimpan semua perintah yang akan dijalankan
	// commandArray adalah sebuah array yang akan menyimpan semua perintah yang akan dijalankan kemudian dikirim ke REST API Discord
	const client = new Client({ 
		intents: daftarIntents,
		partials: [
			Partials.Channel,
			Partials.Message,
			Partials.User,
			Partials.GuildMember,
			Partials.Reaction
		],
	});
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
		console.log(`=====MENYAMBUNG KE DISCORD=====\n` + `-----------Login Bot-----------`)
		console.log('Inisialisasi bot dimulai!');
	});

	// Call handler
	client.handlerPerintah();
	client.handlerEvents();

	// Login client Discord
	client.login(tokenBot);

} catch (error) {
	console.error(error);
}