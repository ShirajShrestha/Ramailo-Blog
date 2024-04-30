// dataSeeder.js
import mongoose from "mongoose";
import Category from "./models/category.js";

// Function to seed categories
export const seedCategories = async () => {
  try {
    await Category.create({ name: "Technology" });
    await Category.create({ name: "Travel" });
    await Category.create({ name: "Food" });
    await Category.create({ name: "Health and Fitness" });
    await Category.create({ name: "Fashion and Beauty" });
    await Category.create({ name: "Sports and Fitness" });
    await Category.create({ name: "Business and Finance" });
    await Category.create({ name: "Arts and Entertainment" });
    await Category.create({ name: "Education and Learning" });
    await Category.create({ name: "Lifestyle and Personal Development" });
    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    mongoose.disconnect();
  }
};
