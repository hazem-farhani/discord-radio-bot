const fs = require('fs');
const Discord = require('discord.js');
// const { prefix, token } = require('./config.json');
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;


const client = new Discord.Client();
client.commands = new Discord.Collection();

// Getting the commands from the 'commands' folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   client.commands.set(command.name, command);
}


client.once('ready', () => {
   console.log('Ready!');
});


client.on('message', message => {
   if (!message.content.startsWith(prefix) || message.author.bot) return;

   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();

   // check: command existance
   if (!client.commands.has(commandName)) return;

   const command = client.commands.get(commandName);

   // check: server only command
   if (command.guildOnly && message.channel.type === 'dm') {
      return message.reply('I can\'t execute that command inside DMs!');
   }


   try {
      command.execute(message, args);
   } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
   }

});


client.login(token);
