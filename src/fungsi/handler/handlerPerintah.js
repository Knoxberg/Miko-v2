const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { tokenBot, clientId } = require('../../../config.json');

module.exports = (client) => {
    client.handlerPerintah = async() => {
        const folderPerintah = fs.readdirSync('./src/perintah');
        console.log(`\n========COMMAND HANDLER========\n` +`---------Load Perintah---------`)
        for (const folder of folderPerintah) {
            const filePerintah = fs.readdirSync(`./src/perintah/${folder}`).filter(file => file.endsWith('.js'));

            const {commands, commandArray} = client;
            for (const file of filePerintah) {
                const perintah = require(`../../perintah/${folder}/${file}`);
                commands.set(perintah.data.name, perintah);
                commandArray.push(perintah.data.toJSON());

                // Debug
                console.log(`Perintah ${perintah.data.name} telah dimuat oleh Handler Perintah.`);
            }
        }

        const rest = new REST({ version: '10' }).setToken(tokenBot);
        
        try {
            console.log('Memuat perintah slash...');
            await rest.put(Routes.applicationCommands(clientId), { 
                body: client.commandArray
            });
            console.log('Berhasil memuat perintah ke REST API Discord\n');
        } catch (error) {
            
        }
    }
}