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

// Helper: Create a slug from a string
function createSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Helper: Ensure slug is unique
async function getUniqueSlug(name, model, excludeId = null) {
    let slug = createSlug(name);
    let count = 0;
    while (true) {
        const query = { slug: count === 0 ? slug : `${slug}-${count}` };
        if (excludeId) query._id = { $ne: excludeId };
        
        const existing = await model.findOne(query);
        if (!existing) return count === 0 ? slug : `${slug}-${count}`;
        count++;
    }
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

// @route   GET /api/properties/:idOrSlug
// @desc    Get property by ID or Slug
router.get('/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        let property;
        
        // Try finding by ID first if it looks like an ObjectId
        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            property = await Property.findById(idOrSlug);
        }
        
        // If not found by ID or not an ID, try searching by slug
        if (!property) {
            property = await Property.findOne({ slug: idOrSlug });
        }

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

        // Upload RERA QR code if provided
        let reraQrUrl = '';
        if (req.files) {
            const qrFile = req.files.find(f => f.fieldname === 'reraQrCode');
            if (qrFile) {
                reraQrUrl = await uploadToImgBB(qrFile.buffer, 'rera-qr');
            }
        }

        const propertySlug = await getUniqueSlug(name, Property);

        const newProperty = new Property({
            name,
            slug: propertySlug,
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
            images: imageUrls, // Now stores full ImgBB URLs
            reraNumber: req.body.reraNumber,
            reraQrCode: reraQrUrl
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
// @desc    Update property details
router.patch('/:id', upload.array('images', 10), async (req, res) => {
    try {
        const updates = { ...req.body };
        
        // Handle image updates if any
        if (req.files && req.files.length > 0) {
            const currentProperty = await Property.findById(req.params.id);
            const newImageUrls = [];
            for (const file of req.files) {
                const url = await uploadToImgBB(file.buffer, file.originalname);
                newImageUrls.push(url);
            }
            updates.images = [...(currentProperty.images || []), ...newImageUrls];
        }

        // Generate new slug if name is being updated
        if (updates.name) {
            updates.slug = await getUniqueSlug(updates.name, Property, req.params.id);
        }

        // Handle amenities splitting if it comes as string
        if (updates.amenities && typeof updates.amenities === 'string') {
            updates.amenities = updates.amenities.split(',');
        }

        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(updatedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
