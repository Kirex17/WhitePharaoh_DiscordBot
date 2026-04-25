const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spotify')
        .setDescription('Show members currently listening to Spotify'),

    async execute(interaction) {
        await interaction.guild.members.fetch({ withPresences: true });

        const listeners = interaction.guild.members.cache
            .filter(member => member.presence?.activities.some(a => a.name === 'Spotify'))
            .map(member => {
                const activity = member.presence.activities.find(a => a.name === 'Spotify');
                return `**${member.displayName}** — ${activity.state} - ${activity.details}`;
            });

        await interaction.reply(
            listeners.length > 0 ? listeners.join('\n') : 'No one is listening to Spotify right now.'
        );
    },
};
