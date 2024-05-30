import mongoose, {Schema} from "mongoose";
import { isValid, parse } from "date-fns";

const validDateFormat = (dateStr) => {
    const formats = ['dd-mm-yyyy', 'mm-dd-yyyy', 'yyyy-mm-dd']
    return formats.some(format => {
        const parsedDate = parse(dateStr, format, new Date());
        return isValid(parsedDate) && parse(dateStr, format, new Date()).toISOString().startsWith(parsedDate.toISOString().split('T')[0]);
      });
};

const validTimeFormat = (time) => {
    const formats = ['HH:mm', 'hh:mm a']
    return formats.some((format => isValid(parse(time, format, new Date()))));
}

const eventSchema = new Schema(
    {
        title: {
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
            type: String,
            required: [true, 'Event date is required'],
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

export const Event = mongoose.model("Event", eventSchema);