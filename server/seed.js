const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Event");

dotenv.config();

const sampleEvents = [
  {
    title: "Global Tech Innovation Summit 2026",
    description: "Join world-class developers, AI researchers, and tech founders for a 2-day conference on future tech trends.",
    category: "Technology",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    location: "Auditorium A, Campus Center",
    capacity: 150,
    organizer: "Tech Council",
  },
  {
    title: "Inter-Campus Hackathon",
    description: "Build innovative software solutions in 24 hours. Great prizes, food, and networking opportunities!",
    category: "Coding",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    location: "Engineering Block - Lab 302",
    capacity: 80,
    organizer: "Developer Student Club",
  },
  {
    title: "Annual Design & UI/UX Workshop",
    description: "Learn modern product design principles, Figma design systems, and responsive UX prototyping.",
    category: "Design",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    location: "Online / Zoom Conference",
    capacity: 200,
    organizer: "Design Guild",
  },
  {
    title: "Career & Internship Expo 2026",
    description: "Meet recruiters from top tech companies, startups, and research labs for hiring opportunities.",
    category: "Career",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    location: "Main Gymnasium Hall",
    capacity: 500,
    organizer: "Placement Cell",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/eventhub");
    console.log("Connected to MongoDB for seeding...");

    await Event.deleteMany({});
    await Event.insertMany(sampleEvents);

    console.log("✅ Successfully seeded 4 sample events into MongoDB!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();