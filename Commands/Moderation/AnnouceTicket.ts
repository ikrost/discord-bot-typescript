import { Client, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js'

module.exports = {
  name: 'announceticket',
  aliases: ['announce'],

async run(client: Client, message: any, args: any[]) {
        if(!message.member.roles.cache.some((r: any) => ["915053360598626364"].includes(r.id))) return message.channel.send(`Você não tem permissão para executar este comando.`)
        let embed = new EmbedBuilder()
        .setTitle('🎟️・Central de Atendimento')
        .setDescription(`O sistema de tickets é reservado para membros que desejam: sanar suas dúvidas, solicitar suporte ou realizar uma compra. Usar esse sistema permite que você tenha contato direto com a nossa equipe, tornando o suporte muito mais rápido e eficiente.\n\nPara abrir um ticket, basta selecionar a categoria abaixo:`)
        .addFields(
            { name: '⏰ Horários de atendimento:', value: '\`08:00 as 23:00 (UTC - 3)\`', inline: true }
        )
      //  .addField('🌐 Site:', '[Acesse agora](https://google.com)', true)
        .setColor("#36393F")
        // .setImage('https://cdn.discordapp.com/attachments/917585196088451122/938912687415517204/oioioi.png')
        const row = new ActionRowBuilder()
        .addComponents(new StringSelectMenuBuilder().setCustomId('menu').setPlaceholder('Selecione a categoria').addOptions([
            {
                label: 'Denúncia',
                description: 'Denúncie um player.',
                value: 'denuncia_menu',
                emoji: '👥'
            },
            {
                label: 'Dúvida',
                description: 'Retire suas dúvidas.',
                value: 'duvidas_menu',
                emoji: '❓'
            },
            {
                label: 'Elogio',
                description: 'Faça um elogio.',
                value: 'elogio_menu',
                emoji: '🛒'
            },
            {
                label: 'Reclamação',
                description: 'Faça uma reclamação',
                value: 'reclamação_menu',
                emoji: '👥'
            },
        ]))
        await message.channel.send({embeds: [embed], components: [row]})
    }
}