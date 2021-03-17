/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');

const Language = require('../language');
const Lang = Language.getString('unvoice'); // Language support

Asena.addCommand({pattern: 'unvoice', fromMe: false, desc: Lang.UV_DESC}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage(Lang.UV_REPLY);
    var downloading = await message.client.sendMessage(message.jid,Lang.UV_PROC,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .format('mp3')
        .save('output.mp3')
        .on('end', async () => {
            await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true,quoted:message.data});
        });
    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
}));


Asena.addCommand({pattern: 'unvideo', fromMe: false, desc: Lang.UV_DESC}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage(Lang.UV_REPLY);
    var downloading = await message.client.sendMessage(message.jid,Lang.UV_PROC,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .format('mp4')
        .save('output.mp4')
        .on('end', async () => {
            await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, {mimetype: Mimetype.mpeg,quoted:message.data});
        });
    return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
}));
