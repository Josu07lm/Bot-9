const {
    WAConnection,
    MessageType,
    waChatKey,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { decryptMedia, Client } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const google = require('google-it')
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))

prefix = setting.prefix
blocked = []
cr = 'Samu330~NyanBot'

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})


	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Hola @${num.split('@')[0]}\nBienvenido al grupo *${mdata.subject}*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Bye, @${num.split('@')[0]}👋Que te vaya bien, total, nadie te extrañara aqui:D`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = setting.apiKey // contact me on whatsapp wa.me/6285892766102
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
                        const q = args.join(' ')

			mess = {
				wait: '⌛ *𝗘𝗻 𝗽𝗿𝗼𝗰𝗲𝘀𝗼* ⌛',
				success: '✔️ *Listo* ✔️',
				bot: '_*𝗟𝗼𝗮𝗱𝗶𝗻𝗴 𝗕𝗼𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻...*_',
				link: '_*Link detectado\n\nEliminando participante...*_',
				error: '❰❗❱ *Ocurrio un error, verifica que el comando este bien escrito, eh intenta otra vez:D*',
				error: {
					stick: '❌ _𝗙𝗮𝗹𝗹𝗼́, 𝘀𝗲 𝗽𝗿𝗼𝗱𝘂𝗷𝗼 𝘂𝗻 𝗲𝗿𝗿𝗼𝗿 𝗮𝗹 𝗰𝗼𝗻𝘃𝗲𝗿𝘁𝗶𝗿 𝗹𝗮 𝗶𝗺𝗮𝗴𝗲𝗻 𝗮 𝘀𝘁𝗶𝗰𝗸𝗲𝗿_ ❌',
					Iv: '❌ Enlace inválido ❌'
				},
				only: {
					group: '❌ *¡𝗘𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝘀𝗼𝗹𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝘂𝘀𝗮𝗿 𝗲𝗻 𝗴𝗿𝘂𝗽𝗼𝘀!* ❌',
					ownerG: '❌ *¡𝗘𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝘀𝗼𝗹𝗼 𝗽𝘂𝗲𝗱𝗲 𝘀𝗲𝗿 𝘂𝘁𝗶𝗹𝗶𝘇𝗮𝗱𝗼 𝗽𝗼𝗿 𝗲𝗹 𝗽𝗿𝗼𝗽𝗶𝗲𝘁𝗮𝗿𝗶𝗼 𝗱𝗲𝗹 𝗴𝗿𝘂𝗽𝗼!* ❌',
					ownerB: '❌ *¡𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐬𝐞𝐫 𝐮𝐭𝐢𝐥𝐢𝐳𝐚𝐝𝐨 𝐩𝐨𝐫 𝐞𝐥 𝐩𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 𝐝𝐞𝐥 𝐛𝐨𝐭 !* ❌',
					admin: '❌ *¡𝗘𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝘀𝗼𝗹𝗼 𝗽𝘂𝗲𝗱𝗲 𝘀𝗲𝗿 𝘂𝘁𝗶𝗹𝗶𝘇𝗮𝗱𝗼 𝗽𝗼𝗿 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿𝗲𝘀 𝗱𝗲𝗹 𝗴𝗿𝘂𝗽𝗼!* ❌',
					Badmin: '❌ *¡𝗘𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝘀𝗼𝗹𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝘂𝘀𝗮𝗿 𝗰𝘂𝗮𝗻𝗱𝗼 𝗲𝗹 𝗯𝗼𝘁 𝗲𝘀 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿!* ❌',
				}
			}
			const botNumber = client.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isDetectorOn = isGroup ? _antilink.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedGif = 'extendedTextMessage' && content.includes('image/gif')
        const isQuotedAudio = 'extendedTextMessage' && content.includes('audio')
        const isQuotedVoice = 'extendedTextMessage' && content.includes8('ptt')
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isAudio = type === 'audio'
        const isVoice = type === 'ptt'
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'Samu330'; if (!author) author = 'NyanBot';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
			// Anti-group link detector
        if (!isGroup && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await client.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color('Received a group link and it is a valid link!', 'yellow'))
                    await client.reply(mess.link)
                    await client.removeParticipant(groupId, sender.id)
                } else {
                    console.log(color('[WARN]', 'yellow'), color('Received a group link but is not a valid link!', 'yellow'))
                }
            }
        }

        // Simple anti virtext, sorted by chat length, by: VideFrelan
        if (!isGroup && !isGroupAdmins && isBotGroupAdmins && !isOwner) {
            if (chats.length > 5000) {
                await client.sendTextWithMentions(from, `Lo siento @${sender.id} Pero no se aceptan mensajes largos\nBye:D!`)
                await client.removeParticipant(groupId, sender.id)
             }
         }
        // Anti-fake-group link detector
        if (!isGroup && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color('Received a fake group link.', 'yellow'))
                await reply('Fake group link detected!')
                await client.removeParticipant(groupId, sender.id)
            }
        }
			switch(command) {
				case 'help':
				case 'menu':
					client.sendMessage(from, help(prefix), text, tescuk, cr)
					break
				case 'nyan':
				case 'bot':
					gatauda = body.slice(6)
                                        reply(mess.bot)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '*Hola, Soy NyanBot🐬, un pequeño ptroyecto de Samu330.*\n\nEspero serte de ayuda, mis funciones no son muchas, son basicas, pero apenas estoy empezando a crecer:D\n\n_Saludos👑✨_'})
					break
					case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*✅Nombre del bot* : ${me.name}\n*📲Numero del Bot* : @${me.jid.split('@')[0]}\n*✏Prefijo* : ${prefix}\n*📁Total Block Contact* : ${blocked.length}\n*📆The bot is active on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
	case 'bass':
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    client.updatePresence(from, Presence.composing)
		if (args.length !== 1) return reply('❰❗❱ Etiqueta un audio ❰❗❱')
		reply(mess.wait)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? content.includes : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`equalizer=f=40:width_type=h:width=50:g=${args[0]}`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await client.sendPtt(from, fileOutputPath)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await reply(mess.error)
                }
            break
	case 'antilink':
                if (!isGroup) return await reply(mess.only.group)
                if (!isGroupAdmins) return await reply(mess.only.admin)
                if (!isBotGroupAdmins) return await reply(mess.only.Badmin)
                if (Number(args[0]) === 1) {
                    if (isDetectorOn) return await reply('Tod@ pemdej@, el antilink ya esta activo.... JAJAJAJA imbecil🙄')
                    _antilink.push(from)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await reply('Antilink activado')
                } else if (Number(args[0]) === 0) {
                    _antilink.splice(from, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await reply('Antilink desactivado')
                } else {
                    await reply('1 para activar, 0 para desactivar')
                }
            break
				case 'google':
                await reply(mess.wait)
                google({ 'query': q, 'no-display': true })
                    .then(async (results) => {
                        let txt = `🐬[ *GOOGLE SEARCH* ]🐬🐬\n\n_*Search results for: ${q}*_`
                        for (let i = 0; i < results.length; i++) {
                            txt += `\n\n➸ *Title*: ${results[i].title}\n➸ *Desc*: ${results[i].snippet}\n➸ *Link*: ${results[i].link}\n\n🔥🛑🔥🛑🔥🛑🔥🛑🔥🛑🔥🛑🔥`
                        }
                        await reply(from, txt)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await reply('ERROR')
                    })
            break
				case 'blocklist':
					teks = 'Esta es la lista de números bloqueados :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Necesitas una foto')
					}
					break
				case 'tp':
					if (args.length < 1) {
						return reply('Elige el tema, 1 - 162')
					} else if (args[0].toLowerCase() === 'list') {
						teks = await fetchText('https://mhankbarbar.moe/api/textpro/listtheme')
						teks = teks.replace(/<br>/g, '\n')
						return reply(teks)
					} else if (args.length < 2) {
						return reply('Y el texto?')
					}
					reply(mess.wait)
					anu = `https://mhankbarbar.moe/api/textpro?pack=${args[0]}&text=${body.slice(3+args[0].length+1)}&apiKey=${apiKey}`
					voss = await fetch(anu)	
					ftype = require('file-type')	
					vuss = await ftype.fromStream(voss.body)
					if (vuss !== undefined) {
						client.sendMessage(from, await getBuffer(anu), image, { caption: mess.success, quoted: mek })
					} else {
						reply('Ocurrió un error, elija otro tema')
					}
					break
				case 'ep':
					if (args.length < 1) {
						return reply('Elige el tema, 1-216')
					} else if (args[0].toLowerCase() === 'list') {
						teks = await fetchText('https://mhankbarbar.moe/api/ephoto/listtheme')
						teks = teks.replace(/<br>/g, '\n')
						return reply(teks)
					} else if (args.length < 2) {
						return reply('Y el texto?')
					}
					reply(mess.wait)
					anu = `https://mhankbarbar.moe/api/ephoto?pack=${args[0]}&text=${body.slice(3+args[0].length+1)}&apiKey=${apiKey}`
					voss = await fetch(anu)
					ftype = require('file-type')
					vuss = await ftype.fromStream(voss.body)
					//console.log(vuss)
					if (vuss !== undefined) {
						client.sendMessage(from, await getBuffer(anu), image, { caption: mess.success, quoted: mek })
					} else {
						reply('Ocurrió un error, elija otro tema')
					}
					break
				case 'stiker':
				case 'sticker':
				case 's':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('BySamu330', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
								/*client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Error, en el momento de la conversión ${tipe}del stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('Samu330NyanBot', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
								/*client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Falló, se produjo un error, inténtelo de nuevo más tarde.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								exec(`webpmux -set exif ${addMetadata('StNoBgSamu330', authorname)} ${ranw} -o ${ranw}`, async (error) => {
									if (error) return reply(mess.error.stick)
									client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
									fs.unlinkSync(ranw)
								})
								//client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Envie imagen con el comando ${prefix}sticker o etiquete una imagen`)
					}
					break
			case 'snowwrite':
					var gh = body.slice(11)
					var gbl7 = gh.split("|")[0];
					var gbl8 = gh.split("|")[1];
					if (args.length < 1) return reply(`Escriba el comando ${prefix}snowwrite text1|text2, ejemplo ${prefix}snowwrite Samu|330`)
					reply(mess.wait)
					anu = await Json(`https://zeksapi.herokuapp.com/api/snowwrite?text1=${gbl7}&text2=${gbl8}&apikey=apivinz`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'marvellogo':
					var gh = body.slice(12)
					if (args.length < 1) return reply(`Escriba el comando ${prefix}marvellogo text, ejemplo ${prefix}marvellogo Samu 330`)
					reply(mess.wait)
					anu = await Json(`https://tobz-api.herokuapp.com/api/textpro?theme=snow&text=${gh}&apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
			case 'setppbot':
				client.updatePresence(from, Presence.composing) 
				if (!isQuotedImage) return reply(`Etiquete una imagen y escriba ${prefix}setbotpp`)
					if (!isOwner) return reply(mess.only.ownerB)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Se actualizo la foto del bot😊')
					break
			case 'closegc':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `El grupo fue cerrado por @${nomor.split("@s.whatsapp.net")[0]}\nAhora solo *los administradores* podran enviar mensajes`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
                case 'opengc':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `El grupo fue abierto por @${sender.split("@")[0]}\nYa pueden ingresar al chat`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
			case 'tomp3':
                	client.updatePresence(from, Presence.composing)
					if (!isQuotedVideo) return reply('❰❗❱ Etiqueta un video ❰❗❱')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❰❗❱ *Error* ❰❗❱')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					break
				case 'chat':
					client.loadConversation ("xyz-abc@g.us", 25) // query the last 25 messages (replace 25 with the number of messages you want to query)
					.then (messages => console.log("got back " + messages.length + " messages"))
					break
			case 'water':
					if (args.length < 1) return reply(mess.blank)
					tels = body.slice(7)
					if (tels.length > 15) return reply('Maximo 20 caracteres')
					reply(mess.wait)
					anu = await Json(`https://kocakz.herokuapp.com/api/flamingtext/water?text=${tels}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
			case 'translate':
                                        aruga = body.slice(10)
                                        lang = aruga.split("|")[0];
                                        teksnya = aruga.split("|")[1];
                                        if (args.length < 1) return reply(`Y el codigo del idioma?\nEjemplo: ${prefix}translate en|Hola que tal`)
                                        if (args.length < 2) return reply(`Y el texto?\nEjemplo: ${prefix}translate en| Hola que tal`)
                                        anu = await fetchJson(`https://arugaz.my.id/api/edu/translate?lang=${lang}&text=${teksnya}`, {method: 'get'})
                                        arteks = `*TRANSLATE*\n➣ Text : ${teksnya} \n ➣ Translate : ${anu.text} \n ➣ *Pronunciation* : ${anu.pronunciation}`
                                        client.sendMessage(from, arteks, text)
                                        break
			case 'getstatus':
					client.getStatus ("@c.us") // leave empty to get your own
					.then ((json, q) => console.log("status: " + json.status))
					break
				case 'tts':
					if (args.length < 1) return client.sendMessage(from, 'Qué código de idioma es?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Y el texto?', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					dtt.length > 600
					? reply('El texto es demasiado largo')
					: gtts.save(ranm, dtt, function() {
						client.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
						fs.unlinkSync(ranm)
					})
					break
				case 'meme':
					meme = await fetchJson('https://kagchi-api.glitch.me/meme/memes', { method: 'get' })
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					setting.prefix = prefix
					fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
					reply(`El prefijo se ha cambiado correctamente a : ${prefix}`)
					break
				case 'loli':
                                        gatauda = body.slice(6)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek})
                                        break
				case 'nsfwloli':
					if (!isNsfw) return reply('❌ *FALSE* ❌')
					loli.getNSFWLoli(async (err, res) => {
						if (err) return reply('❌ *ERROR* ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					})
					break
				case 'hilih':
					if (args.length < 1) return reply('Teksnya mana um?')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'ytmp3':
					if (args.length < 1) return reply('Y el link?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://mhankbarbar.tech/api/yta?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `➣ *🔥Title* : ${anu.title}\n➣ *📁Filesize* : ${anu.filesize}\n\nEspera un minuto, el audio se está enviando...`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
				case 'ytmp4':
					if (args.length < 1) return reply('Y el link?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://mhankbarbar.tech/api/ytv?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `➣ *🔥Title* : ${anu.title} \n➣ *📁Size* : ${anu.filesize} \n➣ *✏Desc* : ${anu.desc} \n\n*EL VIDEO SE ESTÁ ENVIANDO...*`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
				case 'play':   
                			reply(mess.wait)
                			play = body.slice(5)
                			anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               				if (anu.error) return reply(anu.error)
                 			infomp3 = `*Canción encontrada!!!*\nTítulo : ${anu.result.title}\nSource : ${anu.result.source}\nTamaño : ${anu.result.size}\n\n*ENVIANDO AUDIO...*`
                			buffer = await getBuffer(anu.result.thumbnail)
                			lagu = await getBuffer(anu.result.url_audio)
                			anker.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                			anker.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                			break
				case 'tiktok':
					if (args.length < 1) return reply('Y el linkna um?')
					if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.moe/api/tiktok?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {quoted: mek})
					break
				case 'tiktokstalk':
					try {
						if (args.length < 1) return client.sendMessage(from, 'Username?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*✅ID* : ${user.id}\n*🙍🏻‍♂️Username* : ${user.uniqueId}\n*✏Nickname* : ${user.nickname}\n*💻Followers* : ${stats.followerCount}\n*📲Followings* : ${stats.followingCount}\n*🎞Posts* : ${stats.videoCount}\n*♻Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Posible nombre de usuario no válido')
					}
					break
				case 'nulis':
				case 'tulis':
					if (args.length < 1) return reply('¿Qué quieres escribir??')
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.moe/nulis?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'url2img':
					tipelist = ['desktop','tablet','mobile']
					if (args.length < 1) return reply('¿Qué tipo es??')
					if (!tipelist.includes(args[0])) return reply('Tipe desktop|tablet|mobile')
					if (args.length < 2) return reply('¿Dónde está la URL??')
					if (!isUrl(args[1])) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.moe/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
				case 'tstiker':
				case 'tsticker':
					if (args.length < 1) return reply('Y el texto?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(9).trim()
					anu = await fetchJson(`https://mhankbarbar.moe/api/text2image?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${rano} -o ${rano}`, async (error) => {
							if (error) return reply(mess.error.stick)
							client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
							fs.unlinkSync(rano)
						})
						/*client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
						fs.unlinkSync(rano)*/
					})
					break
				case 'all':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
                                case 'all2':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
                                case 'all3':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
				case 'clearall':
					if (!isOwner) return reply('Quién eres tú?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('delete all chat :)')
					break
				case 'bc':
					if (!isOwner) return reply('Quién eres tú?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ EnBroadcast ]\n\n${body.slice(4)}`})
						}
						reply('Success broadcast')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ Ini Broadcast ]\n\n${body.slice(4)}`)
						}
						reply('Success broadcast')
					}
					break
                                case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Target Promote\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Promobido @${mentioned[0].split('@')[0]} Como administrador de grupo!`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Target Demote\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Demote @${mentioned[0].split('@')[0]}!`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('¿A quieres agregar?')
					if (args[0].startsWith('08')) return reply('Utilice el código de país +')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('No se pudo agregar el destino, tal vez porque es privado')
					}
					break
				case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Etiqueta a uno:D!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Órdenes recibidas, Eliminando\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Eliminado:D : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'listadmins':
					if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
                case 'link':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await client.groupInviteCode(from)
                    reply('https://chat.whatsapp.com/'+linkgc)
                    break
                case 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
                    	client.groupLeave(from)
                    } else {
                        reply(mess.only.admin)
                    }
                    break
				case 'toimg':
					if (!isQuotedSticker) return reply('❌ *ETIQUETA UN STICKER ❌*')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Error al convertir Sticker en imágen ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
				case 'simi':
					if (args.length < 1) return reply('.')
					teks = body.slice(5)
					anu = await simih(teks) //fetchJson(`https://simsumi.herokuapp.com/api?text=${teks}`, {method: 'get'})
					//if (anu.error) return reply('Simi ga tau kak')
					reply(anu)
					break
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('El modo SIM está activo')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Activado con éxito el modo simi en este grupo ✔️')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Activado con éxito el modo simi en este grupo ✔️')
					} else {
						reply('1 para activar, 0 para desactivar')
					}
					break
				case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Ya activo 🙄😑')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Activado con éxito la función de bienvenida en este grupo ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Desactivado con éxito la función de bienvenida en este grupo ✔️')
					} else {
						reply('1 para activar, 0 para desactivar')
					}
                                      break
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Etiqueta el destino a clonar😌')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`La foto de perfil se actualizó correctamente con la foto de perfil de @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Fallo XD')
					}
					break
				case 'wa.me':
				  case 'wame':
  client.updatePresence(from, Presence.composing) 
      options = {
          text: `『 *LINK WHATSAPP* 』\n\n_Request by_ : *@${sender.split("@s.whatsapp.net")[0]}\n\nYour link WhatsApp : *wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Or ( / )*\n*api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Y la foto??')
					}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return //console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
