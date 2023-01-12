module.exports = {
    name : 'reconnecting',
    once : true,
    async execute(client) {
        var jumlah_reconnect = 0;
        try {
            jumlah_reconnect++;
            console.log(`${client.user.tag} sedang mencoba untuk reconnect ke Discord!\n` + `Jumlah reconnect: ${jumlah_reconnect}`);
        } catch (error) {
            console.error(error);
        }
    }
}