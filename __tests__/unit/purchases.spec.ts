import Purchase from "../../src/schemas/Purchase";
import MongoMock from "../utils/MongoMock";
// jest.setTimeout(30000);

describe("Unit Tests ) Purchases", () => {
    beforeAll(async () => {
        await MongoMock.connect();
    });

    afterAll(async () => {
        await MongoMock.disconnect();
    });

    beforeEach(async () => {
        await Purchase.deleteMany();
    });

    it("Should be able to create a new purchase", async () => {
        const purchase = {
            orderNumber: 1,
            clientName: "Paulo Ricardo",
            productName: "Mouse Gamer",
            quantity: 1,
            unitValue: 99,
            totalValue: 99 
        };

        await Purchase.create(purchase);

        const result = await Purchase.findOne(purchase);

        expect(result).toEqual(
            expect.objectContaining(purchase)
        );
    });

    it("Should be able get the total of sales", async () => {
        const purchases = [
            {
                orderNumber: 1,
                clientName: "Paulo Ricardo",
                productName: "Mouse Gamer",
                quantity: 1,
                unitValue: 99,
                totalValue: 99 
            },
            {
                orderNumber: 2,
                clientName: "Paulo Ricardo",
                productName: "Mouse Gamer 2",
                quantity: 7,
                unitValue: 100,
                totalValue: 700 
            },
            {
                orderNumber: 3,
                clientName: "Paulo Ricardo",
                productName: "Mouse Gamer 3",
                quantity: 5,
                unitValue: 120,
                totalValue: 600
            },
        ]

        await Purchase.insertMany(purchases);

        const result = await Purchase.aggregate([ { $group: { _id: null, totalValue: { $sum: "$totalValue" } } } ]);

        expect(result).toEqual([
            expect.objectContaining({ _id: null, totalValue: 1399 })
        ]);
    });

    it("Should be able to make new purchases and incrementing the orderNumber correctly", async () => {
        const purchases = [
            {
                orderNumber: 10,
                clientName: "Paulo Ricardo",
                productName: "Mouse Gamer",
                quantity: 1,
                unitValue: 99,
                totalValue: 99 
            },
            {
                orderNumber: 11,
                clientName: "Paulo Ricardo",
                productName: "Mouse Gamer 2",
                quantity: 7,
                unitValue: 100,
                totalValue: 700 
            },
            {
                orderNumber: 12,
                clientName: "Paulo Ricardo",
                productName: "Mouse Gamer 3",
                quantity: 5,
                unitValue: 120,
                totalValue: 600
            },
        ]

        await Purchase.insertMany(purchases);

        const result = await Purchase.aggregate([ { $group: { _id: null, orderNumber: { $max: "$orderNumber" } } } ]);

        expect(result).toEqual([
            expect.objectContaining({ _id: null, orderNumber: 12 })
        ]);

        const newPurchase = purchases[0];
        newPurchase.orderNumber = result[0].orderNumber + 1

        const result2 = await Purchase.create(newPurchase);

        expect(result2).toEqual(
            expect.objectContaining(newPurchase)
        );
    });
})
