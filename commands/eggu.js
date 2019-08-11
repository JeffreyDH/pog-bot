const Discord = require('discord.js');

const egguEmbed = new Discord.RichEmbed()
.setImage('https://4.bp.blogspot.com/-AQ0gOyhxc2g/WsXwCfa-K6I/AAAAAAAAdCI/05rj8tIZycomE7gLc42GmeINIxRVeAjDgCEwYBhgL/s640/DSC09912%2B%25282%2529.JPG')
.setTitle('Eggu')
module.exports = {
    name:'eggu',
    description: 'eggu',
    execute(message, args){
        message.channel.send(egguEmbed)
    }
}