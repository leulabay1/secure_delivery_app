
# Secure Delivery System with OTP and Session Management

This repository features a secure delivery system using OTP authentication and session management. The project employs Angular for the front end, Express.js for the back end, and MongoDB for the database.

## Features

- **Secure Delivery**: OTP authentication ensures secure information delivery.
- **Session Management**: Securely manages user sessions for enhanced experience and security.
- **Angular Front End**: Responsive UI developed with Angular.
- **Express.js Back End**: Server for authentication, requests, and database interactions.
- **MongoDB Database**: Stores and retrieves user and delivery data.

## Folder Structure

```plaintext
secure-delivery-system/
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── docs/
│   ├── design-doc.md
│   └── ...
│
├── .gitignore
├── .env.example
├── LICENSE
├── README.md
└── CONTRIBUTING.md
```

## Prerequisites

- Node.js and npm: Install Node.js and npm.
- MongoDB: Install and run MongoDB.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/leulabay1/secure-delivery-app.git
   ```

2. Install dependencies:

   ```bash
   cd secure-delivery-system/frontend
   npm install

   cd ../backend
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the `backend` folder with required configurations.

4. Start the application:

   ```bash
   cd ../frontend
   ng serve

   cd ../backend
   npm start
   ```

5. Open `http://localhost:4200` in your browser.

## Configuration

Copy the example `.env` file in the `backend` folder and configure necessary variables.

## Contributing

Contributions welcome!.

## License

This project is licensed under the [MIT License](LICENSE).
