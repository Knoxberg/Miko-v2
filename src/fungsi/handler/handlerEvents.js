const fs = require('fs');
const path = require('node:path');

module.exports = (client) => {
    client.handlerEvents = async() => {
        const folderEvent = fs.readdirSync('./src/events');

        for (const folder of folderEvent) {
            const fileEvent = fs.readdirSync(`./src/events/${folder}`).filter(file => file.endsWith('.js'));
            switch (folder) {
                case 'client':
                    for (const file of fileEvent) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) {
                            client.once(event.name, (...args) => event.execute(...args, client));
                        } else {
                            client.on(event.name, (...args) => event.execute(...args, client));
                        }
                    }
                    break;
            
                default:
                    break;
            }
        }
    }
}

