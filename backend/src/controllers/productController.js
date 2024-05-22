const Product = require("../models/productModel");

const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};

const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ messgae: "Product Not Found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Interner Server Error" });
    cnsole.log(err);
  }
};

const addProduct = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      res.status(403).json({ message: "Unauthorised Access" });
    }

    const { name, description, category, stock, price, images } = req.body;

    const newProduct = new Product({
      name,
      description,
      category,
      stock,
      price,
      images,
      seller: req.user._id,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};

// Update a product (accessible only to sellers, and only their own products)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is the seller of the product
    if (
      req.user.role !== "seller" ||
      product.seller.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        seller: req.user._id, // Associate the updated product with the authenticated seller
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product (accessible only to sellers, and only their own products)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is the seller of the product
    if (
      req.user.role !== "seller" ||
      product.seller.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get products by seller's ID for seller profile
const getProductBySeller = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.id });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for the specified seller' });
    }
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductBySeller
}
