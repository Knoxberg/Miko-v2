const { ActivityType } = require('discord.js');

module.exports = {
    name : 'ready',
    once : true,
    async execute(client) {
        console.log(`Bot berhasil login sebagai ${client.user.tag}!`);
        client.user.setPresence({
            activities: [{ 
              name: 'Ular Tangga',
              type: ActivityType.Playing
            }],
            status: 'online'
        })
    }
}