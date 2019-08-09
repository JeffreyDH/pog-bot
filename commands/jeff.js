module.exports = {
    name:'jeff',
    description: 'Greet HIM',
    aliases:['creator','him'],
    execute(message, args){
        message.channel.send(`Hello, Creator. Welcome back to the incubator.`)
    }
}