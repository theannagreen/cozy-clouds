const mongoose = requre('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {type: String, required: true},
    latitude: { type: Number, required: true},
    longitude: { type: Number, required: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('City', citySchema);