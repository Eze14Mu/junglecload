require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulser un membre du serveur')
        .addUserOption(option => option.setName('membre').setDescription('Le membre à expulser').setRequired(true)),

    new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un membre du serveur')
        .addUserOption(option => option.setName('membre').setDescription('Le membre à bannir').setRequired(true))
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Déploiement des commandes slash...');
        await rest.put(
            Routes.applicationCommands("VOTRE_CLIENT_ID"),
            { body: commands.map(command => command.toJSON()) }
        );
        console.log('Commandes déployées avec succès !');
    } catch (error) {
        console.error(error);
    }
})();
