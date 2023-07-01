const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProjectSchema = new Schema({
    id: { type: String, default: "" },
    client_id: { type: String, default: "" },
    title: { type: String, default: '' },
    active: { type: Boolean, default: true },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project