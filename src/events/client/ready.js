const { ActivityType } = require('discord.js');

module.exports = {
    name : 'ready',
    once : true,
    async execute(client) {
        console.log(`Bot berhasil login sebagai ${client.user.tag}!\n` + `BOT SAAT INI ONLINE ✓\n` + `\n==========Log & Error==========`);
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