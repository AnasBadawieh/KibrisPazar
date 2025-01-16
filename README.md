# KibrisPazar

KibrisPazar is an eCommerce platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Redux for state management. This platform enables buyers, sellers, and admins to interact with products and services seamlessly. It includes role-based access, live bidding, secure payments, and responsive design.

## Features

- **User Authentication**: Secure login and registration for users.
- **User Roles**: Distinct workflows and dashboards for buyers, sellers, and admins.
- **Product and Inventory Management**: Add, edit, delete products and manage stock counts.
- **Cart Operations**: Manage cart with options to add/remove items and adjust quantities.
- **Real-Time Updates**: Features such as live bidding and notifications.
- **Secure Payment Integration**: Payments processed securely using Stripe API.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Dynamic UI**: React.js-powered interface for smooth navigation and interaction.
- **Role-Based Access Control**: Secure access to data based on user roles.
- **API Communication**: RESTful API for seamless interaction between frontend and backend.
- **Database Management**: MongoDB with collections for users, products, carts, etc.
- **Error Handling**: Comprehensive error messages and validations for a better user experience.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- MongoDB

### Cloning the Repository
```bash
git clone https://github.com/yourusername/KibrisPazar.git
cd KibrisPazar
```

### Setting Up Environment Variables
Create a `.env` file in the root of both the backend and frontend directories with the following keys:

#### Backend `.env` file
```
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
STRIPE_KEY=your_stripe_secret_key
```

#### Frontend `.env` file
```
REACT_APP_API_URL=http://localhost:5000
```

---

## Running the Application

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The backend server will run at `http://localhost:5000` by default.

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend server will run at `http://localhost:3000` by default.

---

## Folder Structure
```
KibrisPazar/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── .env
├── README.md
└── package.json
```

---

## Technologies Used

### Frontend
- React.js
- Redux.js
- Bootstrap (for styling)

### Backend
- Node.js
- Express.js
- MongoDB

### Additional Tools
- Stripe API (payment integration)
- JWT (JSON Web Tokens for authentication)

---

## Contact
For questions or support, please contact:
- **Name**: Anas Badawieh
- **Email**: a.badawiah@gmail.com
- **GitHub**: [AnasBadawieh](https://github.com/AnasBadawieh)
