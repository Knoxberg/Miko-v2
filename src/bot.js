const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { tokenBot } = require('../config.json');
const fs = require('fs');

// Buat dan inisialisasi client Discord
// commands adalah sebuah Collection yang akan menyimpan semua perintah yang akan dijalankan
// commandArray adalah sebuah array yang akan menyimpan semua perintah yang akan dijalankan kemudian dikirim kedalam 
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

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.handlerPerintah();
client.handlerEvents();
client.login(tokenBot);