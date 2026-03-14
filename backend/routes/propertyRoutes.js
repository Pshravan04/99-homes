const express = require('express');
const router = express.Router();
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch');
const Property = require('../models/Property');

// Use memory storage so files are kept as buffers instead of written to disk
const upload = multer({ storage: multer.memoryStorage() });

// Helper: Upload a single buffer to ImgBB and return the image URL
async function uploadToImgBB(buffer, originalname) {
    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) throw new Error('IMGBB_API_KEY is not set in environment variables');

    const form = new FormData();
    form.append('image', buffer.toString('base64'));
    form.append('name', originalname);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: form
    });

    const data = await res.json();
    if (!data.success) {
        throw new Error(`ImgBB upload failed: ${data.error?.message || 'Unknown error'}`);
    }
    return data.data.url; // Returns the direct image URL
}

// @route   GET /api/properties
// @desc    Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/properties/:id
// @desc    Get property by ID
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/properties
// @desc    Add a new property
router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        const { name, location, address, configuration, price, amenities, possessionDate, description, propertyType, area, units } = req.body;

        // Upload all images to ImgBB and collect their URLs
        const imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const url = await uploadToImgBB(file.buffer, file.originalname);
                imageUrls.push(url);
            }
        }

        const newProperty = new Property({
            name,
            location,
            address,
            configuration,
            price,
            amenities: typeof amenities === 'string' ? amenities.split(',') : amenities,
            possessionDate,
            description,
            propertyType,
            area,
            units,
            images: imageUrls // Now stores full ImgBB URLs
        });

        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/properties/:id
// @desc    Delete a property
router.delete('/:id', async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   PATCH /api/properties/:id
// @desc    Update property status or details
router.patch('/:id', async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
