import jwt from "jsonwebtoken";
import 'dotenv/config';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
    console.log(`Cookies: ${ req.cookies} \n`);       // See all cookies
    console.log('Token:', req.cookies.token);  // See just the token cookie
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Please log in again.' });
  }

  try {
    console.log("Decode id create");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded?.id) {
      req.user = { id: decoded.id }; 
      console.log('\nDecode token:', JSON.stringify(decoded, null, 2));

      next();
    } else {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
