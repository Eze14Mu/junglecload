require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options, member } = interaction;

    if (commandName === 'kick') {
        if (!member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply({ content: "Vous n'avez pas la permission d'expulser des membres.", ephemeral: true });
        }

        const user = options.getUser('membre');
        if (!user) return interaction.reply({ content: "Utilisateur non trouvé.", ephemeral: true });

        const memberTarget = interaction.guild.members.cache.get(user.id);
        if (memberTarget) {
            await memberTarget.kick();
            interaction.reply({ content: `${user.tag} a été expulsé.` });
        } else {
            interaction.reply({ content: "Ce membre n'est pas dans le serveur.", ephemeral: true });
        }
    }

    if (commandName === 'ban') {
        if (!member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: "Vous n'avez pas la permission de bannir des membres.", ephemeral: true });
        }

        const user = options.getUser('membre');
        if (!user) return interaction.reply({ content: "Utilisateur non trouvé.", ephemeral: true });

        const memberTarget = interaction.guild.members.cache.get(user.id);
        if (memberTarget) {
            await memberTarget.ban();
            interaction.reply({ content: `${user.tag} a été banni.` });
        } else {
            interaction.reply({ content: "Ce membre n'est pas dans le serveur.", ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN);
