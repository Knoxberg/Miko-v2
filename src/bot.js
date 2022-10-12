const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { tokenBot } = require('../config.json');
const fs = require('fs');

// Buat dan inisialisasi client Discord
// commands adalah sebuah Collection yang akan menyimpan semua perintah yang akan dijalankan
// commandArray adalah sebuah array yang akan menyimpan semua perintah yang akan dijalankan kemudian dikirim ke REST API Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
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
	console.log('Ready!');
});

// Call handler
client.handlerPerintah();
client.handlerEvents();
// Login client Discord
client.login(tokenBot);