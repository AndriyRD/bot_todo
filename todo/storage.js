class Storage {
    getUserBufferedTasks = (userId) => {
        const userData = this.usersBufferedTasks.get(userId)
        if (!userData) userData = this.usersBufferedTasks.set(userId, new Map())
        return userData
    }
    
    addTask = (userId, task) => {
        if (!task.article) return console.error(`not valid task: ${toString(task)}`)
        const tasks = this.getUserBufferedTasks(userId)
        if (tasks.get(task.article)) return console.error(`exist task with article: ${task.article}`)
        tasks.set(article, task)
    }

    removeTask = (userId, taskKey) => {
    }

    __saveTasks = () => {
        for (const tasks in this.usersBufferedTasks.values) {
            for (const task of tasks) {
                console.log(`save task: ${task.article}`)
            }
        }
    }

    start = async () => {
        setInterval(() => {
            if (this.Enabled)
                this.__saveTasks()
        }, this.options.SaveTasksTimeSeconds);
    }

    stop = () => {
        this.Enabled = false
    }

    constructor(options){
        this.usersBufferedTasks = new Map()
        this.Enabled = true
        this.options = options
        this.options.SaveTasksTimeSeconds = options.SaveTasksTimeSeconds || 100
    }
}




module.exports.Storage = Storage