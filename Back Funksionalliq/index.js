import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
import "dotenv/config";
import mongoose, { Schema } from "mongoose";
app.use(cors());

const productSchema = new Schema({
  name: String,
  desc: String,
  image: String,
  price:Number
});
const ProductsModel = mongoose.model("ProductsModel", productSchema);

app.get("/", async (req, res) => {
  try {
    const product = await ProductsModel.find({});
    res.json(product);
  } catch (error) {
    res.send(error.message);
  }
});
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsModel.findById(id);
    res.json(product);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, desc, image ,price} = req.body;
    const newProduct = new ProductsModel({ name, desc, image ,price});
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, desc, image,price } = req.body;
        const product = await ProductsModel.findByIdAndUpdate(id,{ name, desc, image,price });
        res.json(product);
      } catch (error) {
        res.send(error.message);
      }
});

app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductsModel.findByIdAndDelete(id);
        res.json(product);
      } catch (error) {
        res.send(error.message);
      }
});

mongoose
  .connect(process.env.DB_SECRET_KEY)
  .then(() => console.log("Connected!"))
  .catch(() => console.log(" not Connected!"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
