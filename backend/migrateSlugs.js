const mongoose = require('mongoose');
const Property = require('./models/Property');
require('dotenv').config();

function createSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const properties = await Property.find({ slug: { $exists: false } });
        console.log(`Found ${properties.length} properties to migrate`);

        for (const prop of properties) {
            let slug = createSlug(prop.name);
            let originalSlug = slug;
            let count = 1;
            
            // Check for uniqueness
            while (await Property.findOne({ slug, _id: { $ne: prop._id } })) {
                slug = `${originalSlug}-${count}`;
                count++;
            }

            prop.slug = slug;
            await prop.save();
            console.log(`Updated: ${prop.name} -> ${prop.slug}`);
        }

        console.log('Migration completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
