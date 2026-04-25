const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a die (e.g. d20, d6, d100)')
        .addStringOption(option =>
            option
                .setName('die')
                .setDescription('The die to roll (e.g. d20, d6, d100)')
                .setRequired(true)
        ),

    async execute(interaction) {
        const dieInput = interaction.options.getString('die').toLowerCase().trim();
        const match = dieInput.match(/^d(\d+)$/);

        if (!match) {
            return interaction.reply({
                content: '❌ Invalid format. Use something like `d20`, `d6`, or `d100`.',
                ephemeral: true
            });
        }

        const sides = parseInt(match[1]);

        if (sides < 2) {
            return interaction.reply({
                content: '❌ A die must have at least 2 sides.',
                ephemeral: true
            });
        }

        const result = Math.floor(Math.random() * sides) + 1;

        await interaction.reply(`🎲 You rolled a **d${sides}** and got: **${result}**!`);
    },
};