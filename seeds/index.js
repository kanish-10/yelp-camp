const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp-practice");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDb = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae illo pariatur hic perferendis suscipit sit ut, eum maxime quis, id debitis amet dolore, sapiente tenetur consequatur repellendus sunt voluptatum!",
      price: Math.floor(Math.random() * 20) + 10,
      user: "6474f16ae509e6316dec9228",
      images: [
        {
          url: "https://res.cloudinary.com/dtbo5j2iu/image/upload/v1685458319/YelpCampRevised/jrrtnoqfimhyuu96bwqm.jpg",
          filename: "YelpCampRevised/jrrtnoqfimhyuu96bwqm",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
