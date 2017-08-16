const cooldown = require('../functions/cooldown.js');
const snekfetch = require('snekfetch');
const xml2js = require('xml2js');
const URL = require('url);

//Settings
const COOLDOWN_PERIOD = 60;
const MIN_BODY_LENGTH = 75;
                    
exports.run = async(client, msg, args) => {
    //TODO: Add database based check for NSFW channel
  
    if (cooldown(msg, 'rule34', COOLDOWN_PERIOD, 'This command has a cooldown of **1 Minute**!')) {
        if (args.length < 1) {
            return msg.channel.send("Please give a search terms!");
        }
        
        //Let node's own internal URL api handle query building and url encoding
        let urlObject = URL.parse('http://rule34.xxx/index.php?page=dapi&s=post&q=index', true);
        let tags = args.join(' ');
    
        urlObject.query.tags = tags;
    
        let url = URL.format(urlObject);
        
        snekfetch.get(url).then(r => {
            if (r.body.length < MIN_BODY_LENGTH) {
                return msg.channel.send(":x: Nothing found!");
            }
            
            xml2js.parseString(r.body, (err, reply) => {
                if (err) {
                    return msg.channel.send('The API returned an unconventional response. :thinking:')
                } else {
                    let count = Math.floor((Math.random() * reply.posts.post.length));
                    msg.channel.send({files: [reply.posts.post[count].$.file_url]}).catch(logger.error);
                }
            })
        })
    }
};

exports.help = {
    category   : 'fun',
    usage      : false,
    description: 'I will reply with rule 34 content of your chosing',
    detail     : 'When using this, the bot will look up all of that pants rocking rule 34 content you can imagine',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        'r34'
    ]
};
