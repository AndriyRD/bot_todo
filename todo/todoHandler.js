const {Storage} = require("./storage")
const {DB} = require("./db")

class Handler {

    __getIndexArgByMsg = (msg, index) => {
        const args = msg.text.split(' ')
        return args[index] 
    }

    add = (msg) => {
        const article = this.__getIndexArgByMsg(msg, 1)
        const userId = msg.from.id
        if (!article) return this.bot.sendMessage(userId, "set article for task [/add article]")

        const task = {
            article: article,
            complited: false
        }
        this.DB.addTask(userId, task)
    }

    remove = (msg) => {
        const article = this.__getIndexArgByMsg(msg, 1)
        const userId = msg.from.id
        if (!article) return this.bot.sendMessage(userId, "set article for task [/remove article]")

        this.DB.removeTask(userId, article)
    }

    start = async () => {
        await this.DB.connect()
        this.bot.on('message', (msg) => {
            if (!msg) return
            const args = msg.text.split(' ')
            const commandName = args[0].replace('/', '')
            const currentHandler = this.handlers[commandName]
            if (!currentHandler) return console.error(`not found handler for command: ${commandName}`)
            currentHandler(msg)
        }) 
    }

    constructor(bot) {
        this.bot = bot
        this.handlers = {}
        this.DB = DB
        

        this.handlers.add = this.add
        this.handlers.remove = this.remove
    }
}

module.exports.Handler = Handler