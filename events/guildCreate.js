const config = require('../config/config.json').TOKEN
exports.run = async (client, guild) => {
  guild.defaultChannel.send(`Hey :wave:, Thank you very much for adding me to ${guild.name} to get access to the command list do \`${config}\``);
}
