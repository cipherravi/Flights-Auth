# ✈️ Flight Auth Service

A secure and scalable authentication microservice built using Node.js and MySQL. This service handles user authentication, session management, and logging for a flight booking platform. Built with MVC architecture and logs powered by Winston.

---

## 🔐 Features

- User registration with hashed passwords (using `bcrypt`)
- Secure login with JWT stored as HTTP-only cookies
- Role-based access control support (e.g., admin/user)
- JWT-based authentication and session handling
- Clean and modular MVC folder structure
- Sequelize ORM with migration support
- Winston-based logging system with log file persistence

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MySQL** with **Sequelize ORM**
- **JWT** for secure authentication
- **bcrypt** for password hashing
- **Sequelize CLI** for DB migrations
- **Winston** for structured logging

---

## 📁 Folder Structure
<pre>
Flights-Auth/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── migrations/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── app.js
│ └── index.js
├── .env.example
├── package.json
└── README.md
</pre>

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cipherravi/Flights-Auth.git
cd Flights-Auth
```


### 2. Install Dependencies

npm install

### 3. Setup Environment Variables
change .env.example file to .env with actual values

### 4. Run Database Migrations

cd src
npx sequelize-cli db:migrate

### 5. Start the Development Server

npm run dev

Server will start on http://localhost:PORT

<pre>

| Method | Endpoint         | Description          | Protected |
| ------ | ---------------  | -------------------- | --------- |
| POST   | `/auth/signup`   | Register new user    |   ❌      |
| POST   | `/auth/login`    | Login and get cookie |   ❌      |
| GET    | `/auth/profile`  | Get user profile     |   ✅      |
| PATCH  | `/auth/profile`  | Update user profile  |   ✅      |
| POST   | `/auth/logout`   | Clear auth cookie    |   ✅      |

</pre>

### 📜 Logging

Winston is used to log:

- Request and response activity
- Errors and exceptions
- Authentication-related events
Logs are stored in the /logs/ directory with time-stamped filenames.


🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

👨‍💻 Author

Made with ❤️ by Ravi yadav



