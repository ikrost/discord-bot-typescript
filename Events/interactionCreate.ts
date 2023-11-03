import { GuildBasedChannel, PermissionFlagsBits, ChannelType, StringSelectMenuInteraction, Client, Message, EmbedBuilder, ButtonBuilder, ActionRowBuilder, TextChannel, Guild } from 'discord.js'
import moment from 'moment'
import { create } from 'sourcebin'
import { sendLog } from '../index'

exports.run = async (client: Client, interaction: StringSelectMenuInteraction) => {

    let channel = interaction.message.channel as TextChannel
    let guild = interaction.guild as Guild

    if(interaction.customId == 'close_ticket') {
        if(interaction.user.id == channel.topic) {
            const messages = await interaction.message.channel.messages.fetch({ limit: 100 })
            let messages_string: string = ''
            messages.forEach((msg: Message) => {
                if(msg.author.bot) return
                messages_string = messages_string + `\n\n[${moment(msg.createdAt).format('L')} ${moment(msg.createdAt).format('LTS')}] - ${msg.author.tag}\n${msg.content}`
            })
            if(messages_string !== "") {
            var bin: any = await create(
                {
                    // description: messages_string,
                    title: `Logs ${channel.name}`,
                    files: [{ content: messages_string, language: 'js' }],
                },
            );
            } else {
                channel.delete()
                let embed = new EmbedBuilder()
                .setTitle(`Seu ticket foi fechado`)
                .setColor('#36393F')
                .setDescription(`> Ticket: **${channel.name}**\n> Motivo: **Ticket fechado pelo usuario**\n> Fechado por: ${interaction.user}`)
                .setThumbnail(channel.guild.iconURL())
                sendLog(interaction, "close", interaction.user, channel, "Ticket fechado pelo usuario", bin)
                return await interaction.user.send({embeds: [embed]}).catch(err => {return;})
            }
            channel.delete()
            let embed = new EmbedBuilder()
            .setTitle(`Seu ticket foi fechado`)
            .setColor('#36393F')
            .setDescription(`> Ticket: **${channel.name}**\n> Motivo: **Ticket fechado pelo usuario**\n> Fechado por: ${interaction.user}\n> Logs: [Clique aqui](${bin.url})`)
            .setThumbnail(channel.guild.iconURL())
            sendLog(interaction, "close", interaction.user, channel, "Ticket fechado pelo usuario")
            await interaction.user.send({embeds: [embed]}).catch(err => {return;})
        }
    }
    if (interaction.customId === 'menu') {
        await interaction.deferUpdate();
		if(interaction.values[0] == 'duvidas_menu') {
            const noSpecialCharacters = interaction.user.username.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(" ", "")
            if(guild.channels.cache.find((c: GuildBasedChannel) => c.name === `duvidas-${noSpecialCharacters}${interaction.user.discriminator}`)) return interaction.message.channel.send(`${interaction.user}, você já possui um duvidas de parceria aberto`).then((msg: Message) => {setTimeout(() => msg.delete(), 5000)})
            let role = guild.roles.cache.get('915053360598626364')!
            let channel: TextChannel = await guild.channels.create({
                name: `duvida-${interaction.user.tag}`,
                type: ChannelType.GuildText,
                parent: "915296227774595082",
                topic: interaction.user.id,
                permissionOverwrites: [{
                    id: guild.roles.everyone,
                    deny: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel],
                    allow: []
                },
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles],
                    deny: []
                },
                {
                    id: role.id,
                    allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ManageMessages, PermissionFlagsBits.AttachFiles],
                    deny: []
                }
            ],

            })
            // try {
            //     var msg = await interaction.user.send(`Seu ticket foi criado ${channel}`)
            // } catch {
            //     return interaction.reply({
            //         content: `${interaction.user}, Sua DM está fechada, abra-a para prosseguir`,
            //         ephemeral: true
            //     }).then(msg => {
            //         msg.delete(1000 * 5)
            //     })
            // }
            // await channel.setParent('915296227774595082', {
            //     lockPermissions: false
            // })
            // await channel.setTopic(interaction.user.id)
            let embed = new EmbedBuilder()
            .setTitle('🎟️・Gerenciar Ticket')
            .setDescription(`Aguarde um instante que nossa equipe irá te responder!\nPara agilizar o atendimento, diga-nos o que você precisa!`)
            .setColor("#36393F")
            const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(new ButtonBuilder().setCustomId('close_ticket').setLabel('FECHAR').setStyle(4).setEmoji('❌'))
        await channel.send(`${interaction.user}`)
        await channel.send({embeds: [embed], components: [row]})
        sendLog(interaction, "open", interaction.user, channel)
        }
	}
    if (interaction.customId === 'iniciar_wl') {

        const filter = (collected: Message) => collected.author.id === interaction.user.id;

        interaction.user.send(`Insira a historia do seu personagem`)

        await interaction.user.dmChannel?.awaitMessages({filter, max: 1, time: 30000, errors: ["time"] }).then(collected => {
            console.log(collected)
            interaction.user.send("teste")
        })

    }
}