import express from 'express';
import { createEvent, getEventById, getEventsByUser, updateEvent, deleteEvent } from '../controller/event.controller.js';

const router = express.Router();

router.post("/", createEvent);
router.get("/:userEmail", getEventsByUser);
router.get("/event/:id", getEventById);
router.patch("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);

export default router