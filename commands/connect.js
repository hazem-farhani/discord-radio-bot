module.exports = {
   name: 'connect',
   description: 'Summon the radio to your voice channel.',
   guildOnly: true,
   async execute(message, args) {
      if (message.member.voice.channel) {
         message.channel.send('The radio will start in about 8 seconds');

         const cnx = await message.member.voice.channel.join();

         const broadcast = message.client.voice.createBroadcast();
         broadcast.play('https://radio.mosaiquefm.net/mosalive');

         
         broadcast.on('subscribe', dispatcher => {
            console.log(
               `A broadcast is playing in the server: ${message.guild.name}\n` + 
               `in a voice channel named: ${dispatcher.player.voiceConnection.channel.name}`
               );
         });

         cnx.play(broadcast, { highWaterMark: 90 , volume: false});
      } else {
         message.channel.send('Please join a voice channel first.');
      }
   },
};