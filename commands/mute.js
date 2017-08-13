const Discord = require('discord.js')
const ms = require('ms')
exports.run = async(client, msg, args) => {
  /**
  * @var {target} @type {Object} user-Object to mute
  * @var {dole} @type {Object} role-Object for mutes
  * @var {reason} @type {String} Punishment-Reason
  * @var {duration} @type {String} Punishment-Duration
  */
  const target = msg.mentions.users.first();
  const role = msg.guild.roles.find('name', 'may-muted');
  const reason = msg.content.split(' ').slice(3).join(' ');
  const duration = msg.content.split(' ')[2];
  const mayLog = msg.guild.channels.find('name', 'may-log');

  let Freason;
  if (!reason) {
    Freason = 'None'
  } else {
    Freason = reason;
  }

  let Fdur;
  if (!duration) {
    Fdur = 'permanent'
  } else if (duration !== 'permanent'){
    Fdur = duration;
  }

  let finallTime;
  if (Fdur === 'permanent') {
    finallTime = 'permanent'
  } else {
    finallTime = ms(ms(Fdur), {long : true})
  }

  if (!target) {
    return msg.reply('Please mention a user for the punishment')
  }

  const embed = new Discord.RichEmbed()
  .setAuthor(`Muted ${target.username}`, client.user.avatarURL)
  .setDescription(`\`\`\`\n
Target   : ${target.username} [${target.id}]\n\
Moderator: ${msg.author.username} [${msg.author.id}]\n\
Duration : ${finallTime}\n\
Reason   : ${Freason}
\`\`\``)
  .setColor(0x6580b0)
  
  if (!mayLog) {
    msg.channel.send({embed})

  } else if (mayLog) {
    mayLog.send({embed})
  }
};

exports.help = {
    category   : 'moderation',
    usage      : '[time:time or permant] [reason:optional]',
    description: 'I will be sure to shut their mouth',
    detail     : 'When using mute the bot will mute the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'MANAGE_ROLES'],
    authorPerm : ['SEND_MESSAGES', 'MUTE_MEMBERS'],
    alias      : [
        null
    ]
};
