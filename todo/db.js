const { MongoClient } = require("mongodb");
const { DB_URL } = require("../config");
const db = {}
db.client = new MongoClient(DB_URL)
db.connect = async () => {
    try{
        await db.client.connect()
    } catch(e){
        console.error(e)
    }
}

db.__getTaskCollection = () => {
    return db.client.db().collection("Tasks")
}

db.addTask = async (userId, task) => {
    const tasks = db.client.db().collection("Tasks")
    if (!tasks) tasks = await db.client.db().createCollection("Tasks")
    const oldTask = tasks.findOne({userId: userId})
    tasks.insertOne({userId: userId, task: task})
    console.log("saved task")
}

db.removeTask = (userId, taskKey) => {
    const tasks = db.__getTaskCollection()
    const task = tasks.findOne({userId: userId})
    console.log("removed task")
}

db.compliteTask =(userId, taskKey) => {
    const tasks = db.__getTaskCollection()
    tasks.findOne({userId: userId})
}

module.exports.DB = db