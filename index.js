const {
    Client,
    Partials,
} = require("discord.js");
const client = new Client({
    intents: 3276799,
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ]
})
try {
const config = require("./config")

if (!config.guild_id || !config.message) return console.log("Manque d'information dans le fichier config (id du serveur ou message de dmall)")
client.login(config.token).catch(() => console.log("Veuillez entrer un token valide dans le fichier config !\nhttps://discord.com/developers/applications"))

client.on("ready", async () => {
    console.log(client.user.tag + " est bien en ligne !\n ------------------------------")
    client.user.setStatus('invisible')
    const guild = client.guilds.cache.get(config.guild_id)
    if (!guild) return console.log("L'identifant du serveur n'est pas bon !")
    guild.members.cache.forEach((user) => {
        setTimeout(() => {
            user.user.send({
                    content: config.message
                }).catch((e) => {})
                .then(() => console.log(`Message envoyé à ${user.user.username}`))
        }, 1200)

    })
})
 } catch (error) {
    if(error.message.includes("Cannot find module './config'")) return console.log("Il manque le fichier config.json")
 }


process.on('uncaughtException', function(err) {});

process.on('unhandledRejection', function(err) {
    if(err.message === "Used disallowed intents") return console.log("Veuillez activer les intents :\nhttps://discord.com/developers/applications")
});

// by k4rm3
