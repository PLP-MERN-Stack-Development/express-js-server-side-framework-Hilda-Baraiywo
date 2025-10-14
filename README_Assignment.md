# Express.js - RESTful API Project

## Overview

This project implements a RESTful  API built with Node.js and Express.js, performing standard CRUD operations on a collection called products. It also integrates:
- MongoDB Atlas (via Mongoose)
- API key authentication middleware
- Request validation middleware
- Custom logger
- Global error handling
- Filtering, searching and pagination

## Objectives

- Understand how to create and organize an Express.js application
- Implement **CRUD** endpoints (Create, Read, Update, Delete)
- Use **Mongoose** to connect and interact with a MongoDB database
- Implement **custom middleware** for logging, authentication, and validation
- Handle **errors** gracefully
- Add **advanced features** like filtering, pagination, and search

## Folder Structure

```
📦 express-js-api-project
│
├── 📁 controllers
│   └── productController.js
│
├── 📁 middleware
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── logger.js
│   └── validationMiddleware.js
│
├── 📁 models
│   └── Product.js
│
├── 📁 routes
│   └── productRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

## Technologies Used

| **Technology** | **Purpose**|
|----------------|------------|
| **Node.js** | Server runtime environment |
| **Express.js** | Backend web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | Object Data Modelling (ODM) for MongoDB |
| **Nodemon** | Auto-restart server during developmet |
| **dotenv** | Manage environment variables |

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd <your-project-folder>
```

### 2. Install Dependecies
```bash
npm install
```

### 3. Create .env File
Create a `.env` file in the project root with the following content:

```env
PORT = 3000
API_KEY = 7ac0ba253eb3bb8ebef73e70645546883bbc86f2809665819d1112e74697c1e1
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.abcd123.mongodb.net/products_db?retryWrites=true&w=majority
```
> Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

### 4. Run the Server

For development (auto-reload on changes):

```bash
npm run dev
```

For production:

```bash
npm start
```

### 5. Verify Server Startup
```
MongoDB connected successfully!
Server running on http://localhost:3000
```

## Authentication

All API routes (except `/`) are protected by an **API key middleware**.
You must include the header below every request:

| **Key** | **Value** | **Description** |
|---------|-----------|-----------------|
| `x-api-key` | `your-secret-api-key` | Required for access |

If the header is missing or invalid, you'll get:

```json
{
    "message": "Invalid API key."
}
```

## API Endpoints

**Base URL:** `https://localhost:3000/api/products`

| **Method** | **Endpoint** | **Description** |
| **GET** | `/` | Welcome route ("Hello World") |
| **GET** | `/api/products` | Get all products (with filters, search, pagination) |
| **GET** | `/api/products/:id` | Get product by ID |
| **POST** | `/api/products` | Create one or multiple products |
| **PUT** | `/api/products/:id` | Update an existing product |
| **DELETE** | `/api/products/:id` | Delete a product |

## Request & Response Examples

### GET /

**Response**

```html
Hello World!
```

### GET /api/products

**Oprional Query Parameters:**

- `category` → filter by category
- `search` → search by name
- `page` → page number
- `limit` → items per page

**Example**

```
GET /api/products?category=electronics&page=2&limit=5
```

**Response**
```json
{
  "count": 5,
  "total": 15,
  "currentPage": 2,
  "totalPages": 3,
  "data": [ ...products... ]
}
```

### POST /api/products

Creating a new product

**Headers**

```
x-api-key: your-secret-api-key-123
Content-Type: application/json
```

**Body**

```
raw
JSON
```

**Example**

POST /api/products
Insert the JSON in the body

```json
{
  "name": "Coffee Maker",
  "description": "Programmable coffee maker with timer",
  "price": 50,
  "category": "kitchen",
  "inStock": true
}
```

**Response**

```json
{
  "message": "Product created successfully",
  "data": [ ...inserted documents... ]
}
```
### PUT /api/products/:id

**Example:**

```
PUT /api/products/6734a123e7...
```

**Body:**

```json
{
  "price": 45,
  "inStock": false
}
```

**Response:**

```json
{
  "message": "Product updated successfully",
  "data": { ...updated fields... }
}
```

### DELETE /api/products/:id

**Example:**

```
DELETE /api/products/6734a789d...
```

**Response:**

```json
{
  "message": "Product deleted successfully"
}
```

## Middleware Summary

| **Middleware** | **File** | **Description** |
|----------------|----------|-----------------|
| **Logger** | `/middleware/logger.js` | Logs request method, URL, and timestamp |
| **Authentication** | `/middleware/authMiddleware.js` | Verifies `x-api-key` in headers |
| **Validation** | `/middleware/validation.js` | Validates product data for creation and updates |
| **Error Handler** | Global | Handles invalid routes and server errors |

## Error Handling

All routes return clear, consistent error responses.

| **Example Error** | **Description** |
|-------------------|-----------------|
| 400 Bad Request | Validation failed |
| 401 Unauthorized | Missing API key |
| 403 Forbidden | Invalid API key |
| 404 Not Found | Product does not exist |
| 500 Internal Server Error | Server/database issues |

**Example:**

```json
{
  "message": "Validation failed",
  "errors": ["Name is required", "Price must be positive"]
}
```

## Testing the API with Postman

1. Open Postman
2. Set request URL (e.g., `http://localhost:3000/api/products`)
3. Add header:
   ```
   x-api-key: your-secret-api-key
   ```
4. Choose the HTTP method (GET, POST, PUT, DELETE)
5. Add body (for POST or PUT)
6. Click **Send**

### Examples

#### Pagination Test

```
GET http://localhost:3000/api/products?page=2&limit=5
```

**Response:**

```json
{
  "count": 5,
  "total": 20,
  "currentPage": 2,
  "totalPages": 4,
  "data": [ ...5 products... ]
}
```

#### Pagination, Filtering and Limit

```
GET /api/products?category=electronics&search=laptop&page=1&limit=5
```

**Response**

```json
{
    "count": 1,
    "total": 1,
    "currentPage": 1,
    "totalPages": 1,
    "data": [...product...]
}
```

## Validation Rules

| **Field** | **Type** | **Required** | **Rules** |
|-----------|----------|--------------|-----------|
| name | String | ✅ | Non-empty |
| description | String | ✅ | Non-empty |
| price | Number | ✅ | Positive number |
| category | String | ✅ | Non-empty |
| inStock | Boolean | ✅ | true/false |

## Conclusion
This project showcases the development of a RESTful API using Node.js, Express.js, and MongoDB Atlas, featuring CRUD operations, authentication, validation, and advanced query options such as filtering, search, and pagination.