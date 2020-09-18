module.exports = {
   name: 'leave',
   description: 'Leave the voice channel.',
   guildOnly: true,
   execute(message, args) {
      if (message.member.voice.channel) {
         message.channel.send('( ͠• ︵ ͠• )');
         message.member.voice.channel.leave();
      } else {
         message.channel.send('I\'m not in a voice channel to leave!  (•̀ ︵ ́•)');
      }
   },
};