const mongoose = require('mongoose');
const Property = require('./models/Property');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();

async function check() {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Property.countDocuments();
    console.log('Total properties in DB:', count);
    const props = await Property.find({}, 'name location');
    console.log('Properties:', props);
    process.exit(0);
}
check();
