# 🎨 Color Similarity Checker

## 📌 Overview
This project allows users to upload an image and check how similar its colors are to predefined default colors. Users can update the default colors, but only when logged in. The application provides authentication, user profile management, and contact functionalities.

## ✨ Features
- 🖼 **Image Upload**: Users can upload an image to analyze its color similarity to default colors.
- 🎨 **Default Color Management**: Users can update the default colors (only when logged in).
- 📖 **About Page**: Describes the functionality and purpose of the site.
- 📞 **Contact Page**: Allows users to reach out via email or phone.
- 👤 **Profile Page**: Available only to logged-in users to update information and manage colors.
- 🔐 **Authentication**: Includes Sign-up and Login pages with JWT-based authentication.
- 🚀 **Enhanced UI/UX**: Uses Reactbit animations, TailwindCSS, and FortAwesome icons.

## 🛠 Tech Stack
### Frontend:
- ⚛️ **React.js**
- 🎨 **Tailwind CSS** (for styling)
- 🖼 **React-Dropzone** (for image upload)
- 🎭 **Reactbit** (for animations)
- 🎨 **Tinycolor2** (for color manipulation)
- 🎨 **Color Thief** (for extracting dominant colors from images)
- 📄 **jsPDF** (for PDF generation)
- 🌍 **Axios** (for API requests)

### Backend:
- 🌐 **Node.js** (server environment)
- 🚀 **Express.js** (web framework)
- 🗄 **MongoDB & Mongoose** (database & ODM for user data and color info)
- 🔒 **JWT (JSON Web Token)** (for authentication)
- 🛡 **bcryptjs** (for password hashing)
- 🍪 **cookie-parser** (for handling cookies)
- 🔄 **CORS** (for cross-origin resource sharing)
- 🛠 **dotenv** (for environment variables)
- 📡 **Socket.io** (for real-time updates)

## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/color-similarity-checker.git
cd color-similarity-checker
```

### 2️⃣ Install Dependencies
#### Backend:
```sh
cd backend
npm install
```
#### Frontend:
```sh
cd frontend
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CLIENT_URL=http://localhost:3000
```

### 4️⃣ Run the Application
#### Start the Backend:
```sh
cd backend
npm start
```
#### Start the Frontend:
```sh
cd frontend
npm start
```

## 🔑 Authentication Middleware
The project includes authentication middleware to protect routes:
```js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
```

## 📂 Project Structure
```
📦 color-similarity-checker
📂 project-root/
├── 📂 frontend/
│   ├── 📂 node_modules/
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 assets/
│   │   ├── 📂 components/
│   │   │   ├── 📄 About.jsx
│   │   │   ├── 📄 CircularText.css
│   │   │   ├── 📄 CircularText.jsx
│   │   │   ├── 📄 ColorChecker.jsx
│   │   │   ├── 📄 Contact.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   ├── 📄 Header.jsx
│   │   │   ├── 📄 Login.jsx
│   │   │   ├── 📄 Profile.jsx
│   │   │   ├── 📄 Signup.jsx
│   │   │   ├── 📄 Threads.css
│   │   │   ├── 📄 Threads.jsx
│   │   ├── 📄 App.css
│   │   ├── 📄 App.jsx
│   │   ├── 📄 index.css
│   │   ├── 📄 main.jsx
│   ├── 📄 .gitignore
│   ├── 📄 eslint.config.js
│   ├── 📄 index.html
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
│   ├── 📄 README.md
│   ├── 📄 vite.config.js
│
├── 📂 backend/
│   ├── 📂 config/
│   │   ├── 📄 database.js
│   ├── 📂 controllers/
│   │   ├── 📄 colorController.js
│   │   ├── 📄 reportController.js
│   │   ├── 📄 userController.js
│   ├── 📂 middleware/
│   │   ├── 📄 isAuthenticated.js
│   ├── 📂 models/
│   │   ├── 📄 colorModel.js
│   │   ├── 📄 reportModel.js
│   │   ├── 📄 userModel.js
│   ├── 📂 routes/
│   │   ├── 📄 colorRoute.js
│   │   ├── 📄 reportRoute.js
│   │   ├── 📄 userRoute.js
│   ├── 📄 .env
│   ├── 📄 index.js
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
│
└── 📄 README.md
```

## 🔗 API Endpoints
| Method | Route | Description |
|--------|------|-------------|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/login` | Login user and get token |
| GET | `/api/v1/user/logout` | Logout user |
| GET | `/api/v1/user/` | Fetch user profile (requires auth) |
| GET | `/api/v1/colors` | Get default colors |
| PUT | `/api/v1/colors/` | Update default colors (requires auth) |

## 💡 Future Enhancements
- 📸 Add an option to compare images instead of just colors.
- 🔥 Implement AI-based color recommendation.
- 📊 Add a history section for uploaded images and its analysis.

---
Made with ❤️ by Amrit Sharma
