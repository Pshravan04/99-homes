const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    configuration: {
        type: String,
        required: true,
        enum: ['1 BHK', '2 BHK', '3 BHK']
    },
    preferredLocation: {
        type: String,
        required: true,
        enum: ['Virar', 'Nalasopara', 'Vasai']
    },
    projectStatus: {
        type: String,
        required: true,
        enum: ['Ready', 'Near Possession', 'Under Construction']
    },
    status: {
        type: String,
        default: 'New',
        enum: ['New', 'Contacted', 'Closed', 'Lost']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', leadSchema);
