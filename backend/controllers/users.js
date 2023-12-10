import { db } from "../dbConnect.js";

// get specific user information
export const getUserInfo = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    console.log(req.query.email);

    db.query(q, req.query.email, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
};

// update specific user information
export const updateUserInfo = (req, res) => {
    res.send("User info");
};