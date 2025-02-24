import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token does not exist!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isAuthenticated;
