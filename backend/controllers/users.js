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

// upload pdf file
export const uploadPDF = (req, res) => {
    const q = "INSERT INTO documents (`email`,`title`,`filename`,`file`,`description`,`type`,`uploadDate`,`uploadTime`) VALUES (?)";
    const values = [req.body.email, req.body.title, req.body.filename, req.body.file, req.body.description, req.body.type, req.body.uploadDate, req.body.uploadTime];
    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Resume uploaded.");
    });
};

// get all pdf files
export const getPDFs = (req, res) => {
    const q = "SELECT id, email, title, filename, file, size, description, type, uploadTime, DATE_FORMAT(uploadDate, '%Y-%m-%d') AS uploadDate FROM documents WHERE email = ?";
    db.query(q, req.query.email, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

// delete specific pdf file
export const deletePDF = (req, res) => {
    const q = "DELETE FROM documents WHERE id = ?";
    db.query(q, req.query.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Document deleted successfully.");
    });
};

// get specific pdf file
export const getPDF = (req, res) => {
    const q = "SELECT file FROM documents WHERE id = ?";
    db.query(q, req.query.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getAllUsers = (req, res) => {
    const q = "SELECT * FROM users";

    db.query(q, req.query, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE email = ?";
    db.query(q, req.query.id, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User deleted successfully.");
    });
};

export const deleteUserDocs = (req, res) => {
    const q = "DELETE FROM documents WHERE email = ?";
    db.query(q, req.query.email, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Docuements deleted for user with email " + req.query.email);
    });
};
