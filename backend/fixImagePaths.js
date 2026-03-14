const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

async function fixPaths() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const props = await Property.find({ images: { $regex: '/assets/img/all-images/property/' } });
        console.log(`Found ${props.length} properties to update`);

        for (const prop of props) {
            prop.images = prop.images.map(img => img.replace('/assets/img/all-images/property/', '/assets/img/all-images/properties/'));
            await prop.save();
            console.log(`Updated: ${prop.name}`);
        }

        console.log('Path correction completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Correction failed:', err);
        process.exit(1);
    }
}

fixPaths();
