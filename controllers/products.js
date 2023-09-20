const Product = require('../models/Product')

//GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

//GET ONE PRODUCT BY ID
const getOneProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

//Create a product

const createProduct = async (req, res) => {
  const { title, image, description, price, id } = req.body

  const newProduct = new Product({ title, image, description, price, id })

  try {
    await newProduct.save()
    res.status(200).json(newProduct)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
}

const updateProduct = async (req, res) => {
  const { title, image, description, price, id } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.title = title
    product.image = image
    product.description = description
    product.price = price
    product.id = id

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct
}
