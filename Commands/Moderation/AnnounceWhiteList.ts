import { Message, Client, EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

module.exports = {
  name: 'announcewl',
  aliases: ['announcew'],

async run(client: Client, message: Message, args: string[]) {
        if(!message.member?.roles.cache.some((r: any) => ["915053360598626364"].includes(r.id))) return message.channel.send(`Você não tem permissão para executar este comando.`)
        let embed = new EmbedBuilder()
        .setTitle('🎟️・Whitelist')
        .setDescription(`Descrição`)
        // .addFields(
        //     { name: '⏰ Horários de atendimento:', value: '\`08:00 as 23:00 (UTC - 3)\`', inline: true }
        // )
        .setColor("#36393F")
        const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder({
          components: [
              new ButtonBuilder({
                  customId: 'iniciar_wl',
                  label: 'Iniciar',
                  style: ButtonStyle.Primary,
                  emoji: {
                    name: '🤓'
                  },
              })
          ]
        })
        message.channel.send({embeds: [embed], components: [row]})
    }
}