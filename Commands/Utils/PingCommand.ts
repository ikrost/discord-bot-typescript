import { Client } from 'discord.js'

module.exports = {
  name: 'ping',
  aliases: ['pingue'],

async run(client: Client, message: any, args: any[]) {
    let ping: number = Date.now() - message.createdAt
    let api: number = client.ws.ping
    
    message.channel.send(
        `Ping: **${ping}ms**\nWebSocket: **${api}ms**`
    )
  },
}