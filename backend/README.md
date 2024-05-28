## Backend API Documentation
This documentation outlines the API endpoints, request/response formats, authentication/authorization, error handling, and usage examples for our backend services.

# Base URL
The base URL for all API endpoints is:
https://example.com/api

# Authentication
## Register a New User
* Endpoint: POST /auth/signup
* Description: Registers a new user with the specified details.
* Request Body:
```javascript
{
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "role": "seller",
  "region": "North America"
}
```
* Response (Success - 201 Created):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
* Response (Error - 400 Bad Request):
```json
{
  "message": "Email already exists. Please try a new Email"
}
```

## Login
* Endpoint: POST /auth/login
* Description: Logs in a user with valid credentials.
* Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
* Response (Success - 200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
* Response (Error - 400 Bad Request):
```json
{
  "message": "Invalid Credentials!"
}
```

## Logout
* Endpoint: POST /auth/logout
* Description: Logs out the currently authenticated user.
* Response (Success - 200 OK):
```json
{
  "message": "Logout successful"
}
```

#User Endpoints

## Get All Users
* Endpoint: GET /users
* Description: Retrieves a list of all users (admin only).

## Get User by ID
* Endpoint: GET /users/:id
* Description: Retrieves a specific user by their ID.

## Update User Profile
* Endpoint: PUT /users/:id
* Description: Updates a user's profile information.

## Delete User
* Endpoint: DELETE /users/:id
* Description: Deletes a user's account.

#Product Endpoints
## Get All Products
* Endpoint: GET /products
* Description: Retrieves a list of all products.

## Get Product by ID
* Endpoint: GET /products/:id
* Description: Retrieves a specific product by its ID.

## Add Product
* Endpoint: POST /products
* Description: Adds a new product to the database (seller only).

## Update Product
* Endpoint: PUT /products/:id
* Description: Updates a product's information (seller only).

## Delete Product
* Endpoint: DELETE /products/:id
* Description: Deletes a product from the database (seller only).

# Error Responses
## 400 Bad Request:
* Description: The request is invalid or missing required parameters.
## 401 Unauthorized:
* Description: Authentication credentials are missing or invalid.
## 403 Forbidden:
* Description: The user is not authorized to access the requested resource.
## 404 Not Found:
* Description: The requested resource was not found.
## 500 Internal Server Error:
* Description: An unexpected server error occurred.

# Usage Examples
Here are some usage examples in JavaScript using Axios:

## Register a New User
```javascript
axios.post('https://example.com/api/auth/signup', {
  fullName: 'John Doe',
  email: 'johndoe@example.com',
  password: 'securepassword',
  role: 'seller',
  region: 'North America'
})
.then(response => {
  console.log(response.data.token);
})
.catch(error => {
  console.error(error.response.data.message);
});
```

## Login
```javascript
axios.post('https://example.com/api/auth/login', {
  email: 'johndoe@example.com',
  password: 'securepassword'
})
.then(response => {
  console.log(response.data.token);
})
.catch(error => {
  console.error(error.response.data.message);
});
``` 

## Get All Users
```javascript
axios.get('https://example.com/api/users')
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error.response.data.message);
});
```
## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express, MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/Code-Gale/simplicy_backend
```

Go to the project directory

```bash
  cd simplicy
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon app
```

## All Endpoints
# Authentication
**Signup(POST) - /api/auth/signup**
**Login(POST) - /api/auth/login**
**Logout(POST) - /api/auth/logout**
# USers
**All Users(GET) - /api/users/**
**UserById(GET) - /api/users/:id**
**Update User(PUT) - /api/users/:id**
**Delete User(DELETE) - /api/users/:id**
# Products
**All Products(GET) - /api/products/**
**ProductById(GET) - /api/products/:id**
**ProductsBySeller(GET) - /api/products/:id/products**
**New Product(POST)(Sellers only) - /api/products/newProducts**
**Update Product(PUT)(Sellers only) - /api/products/:id**
**Delete Product(DELETE)(Sellers only) - /api/products/:id**

## Appendix
To be integrated into Simplicy Frontend

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@Code Singer](https://www.github.com/Code-Gale)

