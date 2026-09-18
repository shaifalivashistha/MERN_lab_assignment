const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET /api/notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/notes
router.post("/", async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            content: req.body.content,
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/notes/:id
router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        await note.deleteOne();
        res.status(200).json({ message: "Note deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;