const { connect, model } = require("mongoose");

connect("mongodb://localhost/moi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error("Could not connect to MongoDB...", error));

const Moi = model("Moi", { name: String, location: String });

async function createMoiRecord() {
  const moi = new Moi({ name: "Balasundaram", location: "Vadakadu" });
  result = await moi.save();
  console.log(result);
}

// createMoiRecord();

async function getTotalCounts() {
  try {
    const totalMois = await Moi.find().countDocuments();
    console.log(totalMois);
  } catch (error) {
    console.error(error);
  }
}

// getTotalCounts()

async function getAllMois() {
  try {
    const mois = await Moi.find().select({
      name: 1,
      location: 1,
    });
    console.log(mois);
  } catch (error) {
    console.error(error);
  }
}

// getAllMois();

async function getByNameStartsWith(str) {
  try {
    const regEx = new RegExp(`^${str}`, "i");
    const query = { name: regEx };
    const mois = await Moi.find(query).select();
    console.log(mois);
  } catch (error) {
    console.error("Error to get record(s).", error);
  }
}

getByNameStartsWith("Thi");
