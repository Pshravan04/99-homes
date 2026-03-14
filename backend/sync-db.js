const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function checkAndSync() {
    const localUri = 'mongodb://localhost:27017/realestate';
    const remoteUri = process.env.MONGO_URI;

    console.log('Checking local data...');
    try {
        const localConn = await mongoose.createConnection(localUri).asPromise();
        console.log('Connected to local DB');
        
        // Define Schema (simplified or import from model)
        const PropertySchema = new mongoose.Schema({
            name: String,
            description: String,
            address: String,
            location: String,
            price: String,
            amenities: [String],
            area: String,
            configuration: String,
            possessionDate: String,
            images: [String],
            isSold: { type: Boolean, default: false }
        });
        
        const LocalProperty = localConn.model('Property', PropertySchema);
        const properties = await LocalProperty.find({});
        console.log(`Found ${properties.length} properties locally.`);

        if (properties.length > 0) {
            console.log('Attempting to connect to Remote Atlas DB...');
            try {
                const remoteConn = await mongoose.createConnection(remoteUri, {
                    connectTimeoutMS: 10000,
                    socketTimeoutMS: 45000,
                }).asPromise();
                console.log('Connected to remote Atlas DB');

                const RemoteProperty = remoteConn.model('Property', PropertySchema);
                
                for (const prop of properties) {
                    const exists = await RemoteProperty.findOne({ name: prop.name, location: prop.location });
                    if (!exists) {
                        const newProp = prop.toObject();
                        delete newProp._id; // Remove local ID
                        await RemoteProperty.create(newProp);
                        console.log(`Synced: ${prop.name}`);
                    } else {
                        console.log(`Already exists: ${prop.name}`);
                    }
                }
                console.log('Sync complete.');
            } catch (err) {
                console.error('Remote Atlas Connection Failed:', err.message);
                console.log('Please ensure your IP is whitelisted in MongoDB Atlas.');
            }
        } else {
            console.log('No local data to sync.');
        }
        
        await localConn.close();
    } catch (err) {
        console.error('Local DB error:', err.message);
    }
    process.exit();
}

checkAndSync();
