
const help = (pushname, prefix, getLevelingLevel, getLevelingXp, sender, reqXp, _registered) => { 
	return `
*「✅ACERCA DEL USUARIO✅」*
〚 *🙍🏻‍♂️nombre* : ${pushname}
〚 *📲numero* : wa.me/${sender.split("@")[0]}
〚 *✨XP* : ${getLevelingXp(sender)}/${reqXp}
〚 *♻level* : ${getLevelingLevel(sender)}
〚 *💻Registro de usuario : ${_registered.length}
〚 *🙍🏻‍♂️Creador* : 🔐𝗦𝗮𝗺𝘂𝟯𝟯𝟬👑


͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙┏╾╾╾╾╾╾ *✨NIVEL 1✨* ╾╾╾╾╾╾
 *${prefix}sticker* 
 *${prefix}sticker nobg*
 *${prefix}tts*
 *${prefix}toimg*
 *${prefix}ttp*
 *${prefix}getsticker*
 *${prefix}stickerlist*
 *${prefix}getvn*
 *${prefix}addvn*
 *${prefix}listvn*
 *${prefix}addimage*
 *${prefix}getimage*
 *${prefix}imagelist*
 *${prefix}addvideo*
 *${prefix}getvideo*
 *${prefix}videolist*
͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙╾╾╾╾╾╾╾ *💢NIVEL 2💢* ╾╾╾╾╾╾
 *${prefix}ocr*
 *${prefix}maker*
 *${prefix}tiktokstalk*
 *${prefix}fototiktok*
 *${prefix}imagen*
╾╾╾╾╾╾╾ *🏆NIVEL 3🏆* ╾╾╾╾╾╾
 *${prefix}text3d*
 *${prefix}bucin*
 *${prefix}hilih*
 *${prefix}ssweb*
 *${prefix}nulis*
╾╾╾╾╾╾╾ *👑NIVEL 4👑* ╾╾╾╾╾╾
 *${prefix}artinama*
 *${prefix}spamcall*
 *${prefix}quotes*
 *${prefix}kbbi*
͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙ *${prefix}map*
 *${prefix}cerpen*
╾╾╾╾╾╾╾ *✅NIVEL 5✅* ╾╾╾╾╾╾
 *${prefix}chord*
 *${prefix}lirik*
 *${prefix}pornhub*
 *${prefix}light*
 *${prefix}glitch*
 *${prefix}wasted*
 *${prefix}triggered*
 *${prefix}triggered*
 *${prefix}triggered*
 *${prefix}gtav*
 *${prefix}drawing*
 *${prefix}wanted*
 *${prefix}triggered*
 *${prefix}tourl*
͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙ *${prefix}qr*
 *${prefix}tomp3*
 *${prefix}bass* Etiqueta un audio
 *${prefix}slowmo* Etiqueta un audio
 *${prefix}tupai* Etiqueta un audio
 *${prefix}gemok* Etiqueta un audio
╾╾╾╾╾╾╾ *❤NIVEL 6❤* ╾╾╾╾╾╾
 *${prefix}owner*
 *${prefix}info*
 *${prefix}donate*
 *${prefix}ping*
╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾

╾╾╾╾╾╾╾ *🔥NSFW🔥* ╾╾╾╾╾╾
 *${prefix}waifu*
 *${prefix}anime*
 *${prefix}neko*
͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙ *${prefix}dewabatch*
 *${prefix}pokemon*
 *${prefix}anjing*
 *${prefix}indohot*
╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾

╾╾╾╾╾╾╾ *📁GRUPOS📁* ╾╾╾╾╾╾
 *${prefix}hidetag*
 *${prefix}linkgc*
 *${prefix}all/all2/all3*
 *${prefix}setpp*
 *${prefix}add*
 *${prefix}kick*
 *${prefix}kickall*
 *${prefix}setname*
 *${prefix}setdesc*
 *${prefix}demote*
͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙ *${prefix}promote*
 *${prefix}listadmin*
 *${prefix}closegc/opengc* 
 *${prefix}leveling* [enable/disable]
 *${prefix}nsfw* [1/0]
 *${prefix}simih* [1/0]
 *${prefix}welcome* [1/0]
 *${prefix}nobadword* [enable/disable]
 *${prefix}antilink* [1/0]
 *${prefix}addbadword*
 *${prefix}delbadword*
 *${prefix}listbadword*
╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾

╾╾╾╾╾╾╾ *⚠OWNER⚠* ╾╾╾╾╾╾
 *${prefix}bc*
 *${prefix}setprefix*
͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙͙ *${prefix}getses*
 *${prefix}clearall*
 *${prefix}block*
 *${prefix}unblock*
 *${prefix}leave*
 *${prefix}clone*
╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾

╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾
 ⚠No son todos los comandos, poco a poco se iran agregando al menu✏🗒
╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾
 📲Cualquier duda o comentario, puedes comunicarte con migo:

 💻wa.me/+529984907794
╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾

  *╭━━╮╱╱╭━━━┳━━━┳━━━╮*
  *┃━━╋━━┫╭━╮┃╭━╮┃╭━╮┃*
  *┣━━┃┃┃┣╯╭╯┣╯╭╯┃┃┃┃┃*
  *╰━━┻┻┻╋╮╰╮┣╮╰╮┃┃┃┃┃*
  *╱╱╱╱╱╱┃╰━╯┃╰━╯┃╰━╯┃*
li.✵⃘⃘⃘⃘่่่่่่่่่่่่่่่่่่่่่่่่่่͜͡✵⃘͜͡ํ่่่่่่่่่่่่่่่่่่่่่่่่่͜✵⃘่่่่่่่่่่่่่่่่่่่่่่่่่่͜͡✵⃘่่่่่่่่่่่่่่่͜͡✵⃘่่่่่่่่่่่่่่่่่่่่่่่่่͜͡✵⃘่่่่่่่่่่่่่่่่่͜͡✵⃘่่่่่่่่่่่่่่่่่่่่่่่่่͜͡✵⃘⃘่่่่่่่่่่่่่่่่่่͜͡✵⃘่่่่่่่่่่่่่่่่่่่่่่่่่่͜͡✵⃘⃘⃘⃘่่่่่่่่่่่่่่่่่͜͡✵⃘͜͡ํ่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่͜✵⃘่่่่่่่่่่่่่่่่͜͡✵⃘่่่่่่่่่่่่่่่่่่่่่่่่่่͜͡✵⃘่่่่่่่่่่่่่่่่่่่่่่่่่่͜͡✵⃘่่่่่่่่่่่่่่่่่͜͡✵⃘͜͡ํ่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่่͜✵⃘่่่่่่่่่่่่่่่่่͜͡✵.li

`
}
exports.help = help



  
