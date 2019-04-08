const Discord = require('discord.js');
const client = new Discord.Client();
var channels = {};

function channel_lookup(channel_attr) {
    channel = client.channels.get(channel_attr['id']);
    channel_name = channel_attr['name'];
    return {
        name: channel_name,
        channel: channel
    };
}

// Introduces channels into a global channels object.
function arrange_channels(channels_list) {
    channels_list.forEach((channel) => {
        channels[channel.name] = channel.channel;
    })
}

function channels_init() {
    let channels_list = [];

    // Main Channel Params
    let main_channel = {
        name: "main_channel",
        id: "558495973899501568"
    }
    channels_list.push(channel_lookup(main_channel));

    // Announcement Channel Params
    let announcement_channel = {
        name: "announcement_channel",
        id: "564614034285133825"
    }

    channels_list.push(channel_lookup(announcement_channel));

    arrange_channels(channels_list);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    channels_init();
});

client.on('message', msg => {
    if (msg.content !== 'Welcome!') {
        channels.announcement_channel.send('Welcome!');
        channels.main_channel.send('Welcome!');
    }
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on('guildMemberAdd', msg => {
    let announcement_channel = channels.announcement_channel;
    announcement_channel.send('');
});

client.login(process.env.BOT_TOKEN);