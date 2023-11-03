import { Client, Collection, GatewayIntentBits, EmbedBuilder } from 'discord.js'
import { statSync, readdirSync } from 'fs'
require('dotenv').config()

export const commands = new Collection()

const client = new Client({
  intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages
	],
})

readdirSync(process.env.PATH_EVENTS!).forEach((file) => {
  const filePath = process.env.PATH_EVENTS + '/' + file
  let eventFunction = require(filePath)
  let eventName = file.split('.')[0]
  client.on(eventName, (...args) => eventFunction.run(client, ...args))
})

function initializeCommands(path: string) {
  readdirSync(path).forEach(async (file) => {
    try {
      const filePath = path + '/' + file
      if (file.endsWith('.ts')) {
        const commandFunction = require(filePath)
        commands.set(file, commandFunction)
      } else if (statSync(filePath).isDirectory()) {
        initializeCommands(filePath)
      }
    } catch (error) {
      console.log(error)
    }
  })
}
initializeCommands(process.env.PATH_COMMANDS!)

async function sendLog(message: any, type: any, user: any, _channel?: any, reason?: any, logs?: any) {
  let channel = message.guild.channels.cache.get('915295571206606858')
  if(type == "close") {
      if(logs) {
          let embed = new EmbedBuilder()
          .setTitle(`Um ticket foi fechado`)
          .setColor('#36393F')
          .setDescription(`> Ticket: **${_channel.name}**\n> Motivo: **${reason}**\n> Fechado por: ${user}\n> Logs: [Clique aqui](${logs.url})`)
          //.setThumbnail(message.guild.iconURL())
          await channel.send({embeds: [embed]})
      } else {
          let embed = new EmbedBuilder()
          .setTitle(`Um ticket foi fechado`)
          .setColor('#36393F')
          .setDescription(`> Ticket: **${_channel.name}**\n> Motivo: **${reason}**\n> Fechado por: ${user}`)
          //.setThumbnail(message.guild.iconURL())
          await channel.send({embeds: [embed]})
      }
  }
  if(type == "open") {
      if(logs) {
          let embed = new EmbedBuilder()
          .setTitle(`Um novo ticket aberto`)
          .setColor('#36393F')
          .setDescription(`> Ticket: **${_channel.name}**\n> Aberto por: ${user}`)
         // .setThumbnail(message.guild.iconURL())
          await channel.send({embeds: [embed]})
      } else {
          let embed = new EmbedBuilder()
          .setTitle(`Um novo ticket foi aberto`)
          .setColor('#36393F')
          .setDescription(`> Ticket: **${_channel.name}**\n> Aberto por: ${user}`)
          //.setThumbnail(message.guild.iconURL())
          await channel.send({embeds: [embed]})
      }
  }
}
export { sendLog }

client.login(process.env.TOKEN)
