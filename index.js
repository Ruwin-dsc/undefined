const { Client,Partials } = require("discord.js");
const client = new Client({intents: 3276799, partials: [
  Partials.Channel, 
  Partials.Message, 
  Partials.User, 
  Partials.GuildMember, 
  Partials.Reaction,
  Partials.GuildScheduledEvent,
  Partials.ThreadMember
]})

const config = require("./config")

if(!config.guild_id || !config.message) return console.log("Manque d'information dans le fichier config (id du serveur ou message de dmall)")
client.login(config.token).catch(()=> console.log("Veuillez entrer un token valide dans le fichier config !"))

client.on("ready", ()=> {
      const guild = client.guilds.cache.get(config.guild_id)
            guild.members.cache.forEach((user)=> {
                setTimeout(()=> { 
                    user.user.send({
                content: config.message
                }).catch((e)=> {})
                .then(()=> console.log(`Message envoyé à ${user.user.username}`))
              }, 1200)

            })
    })

