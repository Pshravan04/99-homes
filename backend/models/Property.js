const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String },
    configuration: { type: String }, // e.g. "1, 2 BHK"
    price: { type: String }, // Storing as string to handle ranges like "49.53 L - 73.46 L"
    amenities: [{ type: String }],
    possessionDate: { type: String }, // e.g. "Dec, 2027"
    description: { type: String },
    images: [{ type: String }], // Array of image URLs/paths
    status: { type: String, enum: ['Listing', 'Approved', 'Pending', 'Sold'], default: 'Pending' },
    propertyType: { type: String }, // Villa, Studio, etc.
    area: { type: String }, // e.g. "413 - 612 sq.ft"
    units: { type: Number },
    reraNumber: { type: String },
    reraQrCode: { type: String }, // URL to RERA QR code image
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
