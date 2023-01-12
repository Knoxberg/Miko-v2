module.exports = {
    name : 'disconnect',
    once : true,
    async execute(client) {
        try {
            console.log(`${client.user.tag} telah disconnect dari Discord!`);
        } catch (error) {
            console.error(error);
        }
    }
}