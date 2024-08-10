Currency Converter
A currency converter application built with React, Node.js, and MongoDB. This app allows users to convert between different currencies using up-to-date exchange rates from the ExchangeRate API. It features user authentication and a simple, intuitive interface for currency conversion.

Features
User authentication (login and registration)
Currency conversion based on real-time exchange rates
User-friendly interface for selecting currencies and converting amounts
Responsive design
Technologies Used
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB
API: ExchangeRate API
Authentication: JSON Web Tokens (JWT)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/G-Bharat-Sai/currency-converter.git
Navigate to the project directory:

bash
Copy code
cd currency-converter
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Set up environment variables:

Create a .env file in the backend directory and add your environment variables. Example:

makefile
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EXCHANGE_RATE_API_KEY=your_api_key
Start the backend server:

bash
Copy code
cd ../backend
node index.js

Start the frontend server:

bash
Copy code
cd ../frontend
npm start
Usage
Registration and Login:

Navigate to http://localhost:3000 to access the frontend.
Register a new user by filling out the registration form.
Log in using the credentials you created.
Currency Conversion:

After logging in, you will be redirected to the currency converter page.
Select the currencies you wish to convert and enter the amount.
The conversion result will be displayed instantly.
API Endpoints
Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Log in an existing user
POST /api/auth/reset-password - Request password reset
Currency Conversion
GET /api/convert - Convert currencies (query parameters: from, to, amount)
Testing with Postman
Register a new user:

Method: POST
URL: http://localhost:5000/api/auth/register
Body (JSON):
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
Log in:

Method: POST
URL: http://localhost:5000/api/auth/login
Body (JSON):
json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Convert currencies:

Method: POST
URL:  http://localhost:5000/api/currency/convert
Body (JSON):
json
Copy code
 
{
"fromCurrency": "USD",
"toCurrency": "EUR",
"amount": 100
}
