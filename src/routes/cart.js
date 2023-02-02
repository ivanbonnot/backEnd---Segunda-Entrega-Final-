import { Router } from "express";
import Cart from "../Class/Cart.js";
import { DBController } from "../config/connectToDb.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
  const cartToAdd = new Cart();

  await DBController.saveCart(cartToAdd);

  res.json("Ok");
});

cartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const cart = await DBController.getCartById(id);

  if (!cart) {
    res.status(404).json({ error: "Carrito no encontrado" });
    return;
  }

  await DBController.deleteCart(id);

  res.json(id);
});

cartRouter.get("/:id/productos", async (req, res) => {
  const { id } = req.params;

  const cart = await DBController.getCartById(id);

  if (!cart) {
    res.status(404).json({ error: "Carrito no encontrado" });
    return;
  }

  res.json(cart.products);
});

cartRouter.post("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;

  const cart = await DBController.getCartById(id);
  const product = await DBController.getProductById(id_prod);

  if (!cart || !product) {
    res.status(404).json({ error: "Carrito o producto no encontrado" });
    return;
  }

  await DBController.addProductInCart(id, id_prod);

  res.json(id);
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;

  const cart = await DBController.getCartById(id);
  const product = await DBController.getProductById(id_prod);

  if (!cart || !product) {
    res.status(404).json({ error: "Carrito o producto no encontrado" });
    return;
  }

  const productToDelete = cart.products.find(
    (product) => product.id === id_prod
  );

  if (!productToDelete) {
    res
      .status(404)
      .json({ error: "Producto no se encuentra dentro del carrito" });
    return;
  }

  await DBController.deleteProductInCart(id, id_prod);

  res.json(id);
});

export default cartRouter;
