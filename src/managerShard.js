const { ShardingManager } = require("discord.js");
const { jumlahShard, tokenBot } = require("../config.json");


const managerShard = new ShardingManager('./src/bot.js', {
    // Info lebih tentang ShardingManager Discord.js:
    // https://discord.js.org/#/docs/main/stable/class/ShardingManager

    //Atur jumlah shard ("auto" buat setel otomatis)
    totalShards: jumlahShard,

    //Token login
    token: tokenBot
});

// Waktu shard dibuat, kirim notif id shard di terminal
managerShard.on("shardCreate", (shard) => {
    console.log(`Shard baru dibuat. ID: ${shard.id}`)
});

// summon shard nya mwahhahwhhawhah
managerShard.spawn();