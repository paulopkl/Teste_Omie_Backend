import app from "./index";
import "dotenv/config";
import "./database/connection";

function main() {
    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`Server is Running on port: ${port}`);
    });
}

main();