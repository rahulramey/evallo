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

export const getEventsByUser = async (req, res) => {
    try {
        const events = await Event.find({ userEmail: req.params.userEmail });
        if(!events){
            return res.status(404).json({ message: 'Cannot find event' });
        }
        res.json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Cannot find event' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Cannot find event' });
        }
        const updates = req.body;
        for (const key in updates) {
            if (updates[key] != null) {
                event[key] = updates[key];
            }
        }
        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Cannot find event' });
        }
        await event.deleteOne();
        res.json({ message: 'Deleted Event' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


