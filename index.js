const TelegramBot = require("node-telegram-bot-api");
const { BOT_TOKEN, commands } = require("./config");
const { Handler } = require("./todo/todoHandler");

const bot = new TelegramBot(BOT_TOKEN, {polling: true})
bot.setMyCommands(commands)
const todoHandler = new Handler(bot)
bot.on('polling_error', console.log)
todoHandler.start()
bot.on('message', (msg) => {
    console.log(`[${msg.from.first_name} -> ${msg.text}`)
})