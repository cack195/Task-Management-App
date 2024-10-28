import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Taskschema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    completed: {type: Boolean, default: false},
}, {
    timestamps: true
})

const Tasks = mongoose.model('Tasks', Taskschema)

export default Tasks