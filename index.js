const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix } =  require('./config.json');
dotenv.config();
client.once('ready', ()=>{
    console.log('ready');
});
const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', (message)=>{
    if(!message.content.startsWith(`${prefix}`) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split('/ +/');
    const commandName = args.shift().toLowerCase();
    
    if(!client.commands.has(commandName)) return;
    
    const command = client.commands.get(commandName);
    
    if(command.args && !args.length){
        return message.channel.send(`You didn't provide any arguments, ${message.author}`);
    }
    if(command.guildOnly && message.channel.type !== 'text'){
        return message.reply('I can\'t execute that command inside DMs');
    }
    try{
        command.execute(message, args);
    }
    catch(error){
        console.error(error);
        message.reply('there was an error trying to execute that command')
    }
});

function respond(message, response)
{
    message.channel.send(response);
}
client.login(`${process.env.AUTH_TOKEN}`);