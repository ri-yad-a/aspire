import { db } from "../dbConnect.js";
import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  //CHECK ADMIN
  const q = "SELECT * FROM admins WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Admin not found!");

    // Check password
    const storedPassword = data[0].password;

    if (req.body.password !== storedPassword) {
      return res.status(400).json("Wrong email or password!");
    }

    const token = jwt.sign({ id: data[0].email, isAdmin: true }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token_admin", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const adminLogout = (req, res) => {
  res.clearCookie("access_token_admin",{
    sameSite:"none",
    secure:true
  }).status(200).json("Admin has been logged out.")
};
