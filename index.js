const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const api = express();

api.use(express.json());
api.use(express.urlencoded({extended: false}))

const PORT = 8080;

api.get("/data", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

api.get("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

api.post("/data", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

api.put("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(500).json({ message: "Product not found" });
    }

    const updateProduct = await Product.findById(id);

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

api.delete("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(500).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://islomjonabduganiyev18482:BzpPTsvsNIMeucyE@nodeapi.d7hd2mg.mongodb.net/?retryWrites=true&w=majority&appName=NodeApi"
  )
  .then(() => {
    console.log("conected");
    api.listen(PORT, () => console.log(`https://localhost:${PORT}`));
  });
