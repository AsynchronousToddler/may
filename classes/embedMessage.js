const Discord = require('discord.js')
class embedMessage {
  constructor(msg) {
    this.message = msg
  }

  descEmbed(options) {
    if (!options) {
      throw Error('You must specify the options, options list {content, type}')
    }
    if (options.type === "desc" ) {
      if (!options.content) {
        throw Error ('You did not specify the text inside the constructor options.')
      } else {
        const embed = new Discord.RichEmbed()
        .setDescription(options.content)
        this.message.channel.send({embed})
      }
    } else {
      throw Error ('You chose descEmbed but your option does not have "desc" in it.')
    }
  }
  advanced(options) {
    /**
    *@returns {Error}
    */
    if (!options) {
      throw Error('You must specify at list one option, list {desc, footer, thumbnail, title, author fields[field1, content, field2, content]}')
    }

    /**
    *@returns {Error}
    */
    if (!options.fields[0]) {
      throw Error('You must add atleast 1 field')
    }

    const embed = new Discord.RichEmbed();

    /**
    *@returns {Object}
    *@param {string} title
    *@param {string} content
    */
    for (let i = 0; i < options.fields.length; i++) {
      embed.addField(options.fields[i].title, options.fields[i].content)
    }

    /**
    *@param {String} desc
    */
    if (options.desc) {
      embed.setDescription(options.desc)
    }

    /**
    *@param {String} footer
    */
    if (options.footer) {
      embed.setFooter(options.footer)
    }

    /**
    *@param {String} title
    */
    if(options.title) {
      embed.setTitle(options.title)
    }

    /**
    *@param {String} thumbnail
    */
    if (options.thumbnail) {
      embed.setThumbnail(options.thumbnail)
    }

    this.message.channel.send({embed}) //Send the embed after all the options been selected
  }
}
module.exports = embedMessage;
