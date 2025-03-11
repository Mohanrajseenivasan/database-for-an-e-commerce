const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Define Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});
const Product = mongoose.model("Product", productSchema);
// API to add product
app.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});
// API to get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
// API to delete a product by ID
app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});
// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));