const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    dueDate: { 
        type: Date 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'low' 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed'], 
        default: 'pending' 
    },
  userId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true 
    },
});

module.exports = mongoose.model('Task', taskSchema);