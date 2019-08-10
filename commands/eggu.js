const Discord = require('discord.js');

const file = new Discord.Attachment("../assets/Original-Eggu.jpg");
const egguEmbed = {
    title: 'eggu',
    image: {
        url:'attachment://Original-Eggu.jpg',
    },
};

module.exports = {
    name:'eggu',
    description: 'eggu',
    // file: file,
    // egguEmbed : egguEmbed,
    execute(message, args){
        message.channel.send({ files: [file], embed: egguEmbed});
        // message.channel.send('hello');
    }
}