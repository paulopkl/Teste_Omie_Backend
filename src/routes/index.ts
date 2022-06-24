import { Router } from "express";
import { purchases } from "../controllers/Purchases";

const routes = Router();

routes.get("/", (req, res) => res.status(200).json({ ok: true }));
routes.get("/get-total-orders", purchases.getTotalOrders);
routes.post("/create-purchase", purchases.makePurchase);
routes.get("/total-value", purchases.getAllSales);

export default routes;
