import mongoose, {Schema} from "mongoose";


const eventSchema = new Schema(
    {
        eventTitle: {
            type: String,
            required: true,
            trim: true, 
        }, 
        description: { 
            type: String,
            trim: true
        },
        participants: {
            type: [String], 
            default: [] 
        },
        date: { 
            type: Date, 
            required: true 
        },
        time: { 
            type: String, 
            required: true 
        },
        duration: { 
            type: Number, 
            required: true 
        },
        sessionNotes: { 
            type: String 
        }
    }
)