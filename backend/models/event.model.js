import mongoose, {Schema} from "mongoose";
import { isValid, parse } from "date-fns";


const eventSchema = new Schema(
    {
        eventTitle: {
            type: String,
            required: [true, 'Event is required!'],
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
            required: true,
            validate: {
                validator: validDateFormat,
                message: 'Invalid date format. Accepted formats: dd-MM-yyyy, MM-dd-yyyy, yyyy-MM-dd'
            }
        },
        time: { 
            type: String, 
            required: true,
            validator: {
                validator: validTimeFormat,
                message: 'Invalid time format. Accepted formats: HH:mm (24hrs) or hh:mm a (12hrs)'
            }
        },
        duration: { 
            type: Number, 
            required: [true, 'Event duration is required']
        },
        sessionNotes: { 
            type: String,
            trim: true 
        },
        userEmail: { 
            type: String, 
            required: [true, 'User email is required'],
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
        }
    }
);

const validDateFormat = (date) => {
    const formats = ['dd-MM-yyyy', 'MM-dd-yyyy', 'yyyy-MM-dd']
    return formats.some((format => isValid(parse(date, format, new Date()))));
};

const validTimeFormat = (time) => {
    const formats = ['HH:mm', 'hh:mm a']
    return formats.some((format => isValid(parse(time, format, new Date()))));
}

export const Event = mongoose.model("Event", eventSchema);