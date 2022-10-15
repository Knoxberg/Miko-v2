const { ActivityType } = require('discord.js');

module.exports = {
    name : 'ready',
    once : true,
    async execute(client) {
        console.log(`Bot berhasil login sebagai ${client.user.tag}!`);
        try {
            client.user.setPresence({
                activities: [{ 
                  name: `my friend's love life`,
                  type: ActivityType.Watching
                }],
                status: 'online',
            })
        } catch (error) {
            console.error(error);
        }
    }
}