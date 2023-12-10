import { db } from "../dbConnect.js";

// get specific user information
export const getUserInfo = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, req.query.email, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
};

// update specific user information
export const updateUserInfo = (req, res) => {
    const q = "UPDATE users SET `fname` = ?, `lname` = ?, `profession` = ?, `username` = ? WHERE `email` = ?";
    const values = [req.body.fname, req.body.lname, req.body.profession, req.body.username, req.body.email];
    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Information edited.");
    });
};