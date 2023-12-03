import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/posts.js";
import { db } from "./dbConnect.js";

const app = express();

app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req,res)=>{
    res.json("Hello, this is the backend");
})

app.get("/users", (req,res)=>{
    const q = "SELECT * FROM aspiredb.users"; 
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
})

app.listen(8800, ()=> {
    console.log("Connected to backend");
});