const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const Property = require('./models/Property');

const sampleProperties = [
    {
        name: "99 Homes - Vasai Elegance",
        description: "A premium residential project in Vasai West featuring luxury 2 BHK apartments with modern architecture.",
        address: "Near Navapur Road, Vasai West",
        location: "Vasai",
        price: "72,00,799",
        amenities: ["Swimming Pool", "Gym", "Landscaped Garden", "24/7 Security"],
        area: "950",
        configuration: "2 BHK",
        possessionDate: "Ready to Move",
        status: "Approved",
        images: ["/assets/img/all-images/property/property-img1.png"]
    },
    {
        name: "99 Homes - Virar Heights",
        description: "Experience sky-high living in Virar East. Close to station and schools.",
        address: "Manvel Pada Road, Virar East",
        location: "Virar",
        price: "35,99,999",
        amenities: ["Clubhouse", "Children Play Area", "Power Backup", "Intercom"],
        area: "650",
        configuration: "1 BHK",
        possessionDate: "Dec, 2026",
        status: "Approved",
        images: ["/assets/img/all-images/property/property-img2.png"]
    },
    {
        name: "99 Homes - Vasai Green Valley",
        description: "Lush green surroundings with modern interiors. Perfect for family living.",
        address: "Evershine City, Vasai East",
        location: "Vasai",
        price: "55,00,000",
        amenities: ["Jogging Track", "Yoga Center", "Rain Water Harvesting", "CCTV"],
        area: "1100",
        configuration: "3 BHK",
        possessionDate: "June, 2025",
        status: "Approved",
        images: ["/assets/img/all-images/property/property-img3.png"]
    },
    {
        name: "99 Homes - Virar Global City Premier",
        description: "Located in the most sought-after township in Virar. Fully furnished options available.",
        address: "Global City, Virar West",
        location: "Virar",
        price: "42,50,000",
        amenities: ["Solar Water Heater", "Basement Parking", "Fire Safety", "Wi-Fi Connectivity"],
        area: "720",
        configuration: "1 BHK",
        possessionDate: "Ready to Move",
        status: "Approved",
        images: ["/assets/img/all-images/property/property-img4.png"]
    },
    {
        name: "99 Homes - Vasai Ocean View",
        description: "Luxury apartments with sea views and premium finishings.",
        address: "Parnaka, Vasai West",
        location: "Vasai",
        price: "1,20,00,000",
        amenities: ["High-speed Elevators", "Video Door Phone", "Modular Kitchen", "Penthouse Access"],
        area: "1450",
        configuration: "3 BHK",
        possessionDate: "March, 2027",
        status: "Approved",
        images: ["/assets/img/all-images/property/property-img1.png"]
    }
];

async function seedDB() {
    console.log('Connecting to Atlas...');
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to Atlas DB');

        console.log('Clearing existing properties...');
        await Property.deleteMany({});
        
        console.log('Seeding 5 Vasai/Virar properties...');
        await Property.insertMany(sampleProperties);
        console.log('Successfully seeded 5 properties.');

    } catch (err) {
        console.error('Seeding Failed:', err.message);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
}

seedDB();
