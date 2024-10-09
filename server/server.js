import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";

const app = express();
const port = 8080;

// uses
app.use(express.json({ limit: "100mb" }));

// const allowedOrigin = "https://localhost:3000";

// const allowedOrigin = "https://study-easy-react.vercel.app";

// app.use(
//   cors({
//     origin: allowedOrigin,
//   })
// );

app.use(cors());

app.use(morgan("tiny"));
app.disable("x-powered-by");

app.use("/api", router);
// routes
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

connect()
  .then(() => {
    try {
      app.listen(port, (err) => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (err) {
      console.log("Cannot connect mongodb");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection");
  });
