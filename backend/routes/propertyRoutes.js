const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Property = require('../models/Property');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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
        
        const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

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
            images: imagePaths
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
