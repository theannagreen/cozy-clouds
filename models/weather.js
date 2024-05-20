const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const weatherSchema = new Schema({
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    temperature: { type: Number, required: true },
    description: { type: String, required: true }
}, {
    timestamp: true
});

module.exports = mongoose.model('Weather', weatherSchema);