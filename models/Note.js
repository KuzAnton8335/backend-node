//  mongoose для работы с базой данных
const mongoose = require("mongoose");

//  Схема данных для заметки
const NoteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	}
})

// Модель базы данных
const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;