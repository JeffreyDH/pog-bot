const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix } =  require('./config.json');
dotenv.config();

const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
// register all of the commands
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', (message)=>{
    if(!message.content.startsWith(`${prefix}`) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split('/ +/');
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
        if(!command) return;
    
    if(command.args && !args.length){
        let reply = `You didn't provide any arguments, ${message.author}`;
        if(command.usage){
            reply += `\n The proper usage would be: \` ${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
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

client.login(`${process.env.AUTH_TOKEN}`);