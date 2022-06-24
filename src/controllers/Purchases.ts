import { Request, Response } from "express";
import Purchase from "../schemas/Purchase";

export interface IGetAllSalesResponse {
    _id: null;
    totalValue: number;
}

export interface IGetTotalOrdersResponse {
    _id: null;
    max: number;
}

class Purchases {
    async getTotalOrders(req: Request, res: Response) {
        try {
            const result: IGetTotalOrdersResponse[] = await Purchase.aggregate([ { $group: { _id: null, max: { $max: "$orderNumber" } } } ]);

            return res.status(200).json({ orderNumber: result[0].max });
        } catch (error) {
            return res.status(500).json({ error: "Error on get total of orders" });
        }
    }

    async makePurchase(req: Request, res: Response) {
        try {
            if (!req.body.productList) throw new Error();

            const data = req.body?.productList;

            const result = await Purchase.insertMany(data)
                .then(res => console.log({ res }))
                .catch(err => console.log({ err }));

            return res.status(200).json({ result });
        } catch (error) {
            return res.status(500).json({ error: "Error on save purchase" });
        }
    }

    async getAllSales(req: Request, res: Response) {
        try {
            const result: IGetAllSalesResponse[] = await Purchase.aggregate([ { $group: { _id: null, totalValue: { $sum: "$totalValue" } } } ]);

            return res.json({ totalValue: result[0].totalValue });
        } catch (err) {
            return res.status(500).json({ error: "Error getting all sales" });
        }
    }
}

const purchases = new Purchases();
export { purchases }