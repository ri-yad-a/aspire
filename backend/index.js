import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/posts.js";
import jobRoutes from "./routes/jobs.js";
import { db } from "./dbConnect.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

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