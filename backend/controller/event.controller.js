import { Event } from "../models/event.model.js";

export const createEvent  = async(req, res) => {
    const { title, description, participants, date, time, duration, sessionNotes, userEmail } = req.body;

    try {
        const event  = new Event({ title, description, participants, date, time, duration, sessionNotes, userEmail })
        await event.save()
        res.status(201).json(event)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

