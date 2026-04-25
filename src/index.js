require('dotenv').config();
console.log('Token present:', !!process.env.DISCORD_TOKEN);
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { responses } = require('../config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ],
});

const commands = new Map();
for (const file of fs.readdirSync(path.join(__dirname, 'commands')).filter(f => f.endsWith('.js'))) {
    const command = require(`./commands/${file}`);
    commands.set(command.data.name, command);
}

client.once('ready', async () => {
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: [...commands.values()].map(c => c.data.toJSON()) }
    );
    console.log(`Ready: ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = commands.get(interaction.commandName);
    if (command) await command.execute(interaction);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const pinged = message.mentions.has(client.user);
    const replied = message.mentions.repliedUser?.id === client.user.id;
    if (!pinged && !replied && Math.random() > 0.05) return;

    const response = responses[Math.floor(Math.random() * responses.length)];
    await message.reply(response);
});

client.login(process.env.DISCORD_TOKEN);

const http = require('http');
http.createServer((_, res) => res.end('OK')).listen(process.env.PORT || 3000);
