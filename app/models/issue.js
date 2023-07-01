const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const IssueSchema = new Schema({
    id: { type: String, default: "" },
    client_id: { type: String, default: "" },
    project_id: { type: String, default: "" },
    done: { type: Boolean, default: true },
    title: { type: String, default: "" },
    due_date: { type: Date, default: "0000-00-00 00:00:00" },
    priority: { type: String, default: "" }
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue