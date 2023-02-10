const { ShardingManager } = require("discord.js");
require('dotenv').config();
//const { jumlahShard, tokenBot } = require("../config.json");
const { jumlahShard } = require("../config.json");
const tokenBot = process.env.TOKEN_BOT;
console.log(tokenBot);

const managerShard = new ShardingManager('./src/bot.js', {
    // Info lebih tentang ShardingManager Discord.js:
    // https://discord.js.org/#/docs/main/stable/class/ShardingManager

    //Atur jumlah shard ("auto" buat setel otomatis)
    totalShards: jumlahShard,

    //Token login
    token: tokenBot
});

// Waktu shard dibuat, kirim notif id shard di terminal
console.log(`============INISIASI============\n` + `------------Sharding------------`)
managerShard.on("shardCreate", (shard) => {
    console.log(`Shard baru dibuat. ID: ${shard.id}`)
});

// Summon shard nya
managerShard.spawn();