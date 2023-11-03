import { commands } from '../index'
import { Client, Message } from 'discord.js'

exports.run = async (client: Client, message: Message) => {
  if (message.author.bot) return

  const prefix = process.env.PREFIX ?? '.'
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const commandName = args.shift()?.toLowerCase()

  let Listener: any = commands.find(
    (c: any) =>
      c.name === commandName ||
      c.aliases.includes(commandName) ||
      c.aliases.includes(`$HIDE${commandName}`)
  )

  if (Listener) {
    Listener.run(client, message, args)
  }
}
