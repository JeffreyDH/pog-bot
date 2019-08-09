module.exports = {
    name:'server',
    description:'print server name',
    execute(message, args){
        message.channel.send(`Server's name is ${message.guild.name}`);
    }
};