# Library Management System API

A comprehensive backend application for managing books, user borrowing, notifications, and administrative functions. Built with Node.js, Express, MongoDB, and Redis.

**Version:** 1.0.0  
**Runtime:** Node.js (ES Modules)

---

## Features

### Core Functionality
- **User Authentication** - Register, login, and session management with JWT
- **Book Management** - Create, read, update, and delete books with metadata
- **Borrowing System** - Issue and return books with automatic 7-day due date tracking
- **Notifications** - Real-time notifications via WebSocket and email alerts
- **Admin Functions** - Import books from CSV, scrape books from web, export data
- **File Management** - Upload and serve book covers and PDF files
- **Performance Optimization** - Redis caching for frequently accessed data

### Advanced Features
- **Real-time Updates** - WebSocket broadcasts for book borrowing/returning events
- **Email Notifications** - Automated emails when books are borrowed
- **Rate Limiting** - Protection against abuse with request throttling
- **JWT Authentication** - Secure token-based authentication
- **File Upload** - Support for images (JPEG, PNG) and PDF files with validation
- **Data Import/Export** - CSV-based book import and export capabilities
- **Response Caching** - Redis-based caching to reduce database queries

---

## Technical Stack

### Backend & Runtime
- **Express.js** (v5.2.1) - Web application framework
- **Node.js** - JavaScript runtime with ES Modules
- **Nodemailer** (v8.0.5) - Email service

### Database & Caching
- **MongoDB** (via Mongoose v9.4.1) - Primary data persistence
- **Redis** (v5.11.0) - In-memory caching and data store

### Security & Authentication
- **JWT** (jsonwebtoken v9.0.3) - Token-based authentication
- **bcryptjs** (v3.0.3) - Password hashing and verification
- **express-rate-limit** (v8.3.2) - Rate limiting middleware
- **CORS** (v2.8.6) - Cross-Origin Resource Sharing

### File Handling & Processing
- **Multer** (v2.1.1) - Multipart form data handling (file uploads)
- **csv-writer** (v1.6.0) - CSV file generation
- **Cheerio** (v1.2.0) - Web scraping and HTML parsing
- **Axios** (v1.15.0) - HTTP client

### Real-time Communication
- **WebSocket (ws)** (v8.20.0) - Real-time bidirectional communication

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v14+ with npm
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Redis** (local or cloud instance)
- **SMTP Email Server** credentials (Gmail, SendGrid, etc.)
- **Git** (optional, for version control)

---

## Installation & Setup

### 1. Clone or Download the Project
```bash
cd library-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/library-app
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/library-app

# Redis
REDIS_URL=redis://localhost:6379
# Or use Redis cloud connection string

# JWT
JWT_SECRET=your_secret_key_here_change_this_in_production

# Email (SMTP Configuration)
EMAIL=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### 4. Start the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT)

---

## API Endpoints

### Authentication Routes (`/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register new user with email/password |
| POST | `/auth/login` | No | Login and receive JWT token |
| POST | `/auth/logout` | Yes | Clear user session |

### Book Routes (`/books`)
| Method | Endpoint | Auth | Cache | Description |
|--------|----------|------|-------|-------------|
| GET | `/books` | No | Yes | Retrieve all books (cached for 60s) |
| POST | `/books` | Yes | No | Create new book (with cover upload) |
| PUT | `/books/:id` | Yes | No | Update book details |
| DELETE | `/books/:id` | Yes | No | Delete book |

### Borrowing Routes (`/borrow`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/borrow/borrow` | Yes | Borrow a book (marks as unavailable, sets 7-day due date) |
| POST | `/borrow/return` | Yes | Return a borrowed book (marks as available) |

### Notification Routes (`/notifications`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/notifications` | Yes | Retrieve user notifications |

### File Routes (`/files`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/files/upload` | Yes | Upload book cover or PDF |
| GET | `/files/:filename` | No | Download uploaded file |

### Admin Routes (`/admin`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/admin/import` | Yes | Import books from CSV file |
| POST | `/admin/fetch` | Yes | Scrape and store books from external website |
| GET | `/admin/export` | Yes | Export all books to CSV file |

---

## Architecture

### Layered Architecture Pattern

```
┌─────────────────────────────────────┐
│    Express Routes (API Endpoints)   │
├─────────────────────────────────────┤
│  Controllers (Request Handling)     │
├─────────────────────────────────────┤
│   Services (Business Logic)         │
├─────────────────────────────────────┤
│    Models (Mongoose Schemas)        │
├─────────────────────────────────────┤
│ Config (DB, Redis, WebSocket, Env)  │
└─────────────────────────────────────┘
```

### Request Flow Example (Book Borrowing)

```
User Request (POST /borrow/borrow)
    ↓
[Auth Middleware] - Verify JWT token
    ↓
[Borrow Controller] - Handle request
    ↓
[Borrow Service] - Business logic
    ├─ Check book availability
    ├─ Mark book unavailable
    ├─ Create Borrow record
    ├─ Send email notification
    └─ Broadcast WebSocket event
    ↓
MongoDB - Store borrow record
    ↓
Email Service - Send confirmation
    ↓
WebSocket Server - Broadcast to all clients
    ↓
Response to Client
```

---

## Project Structure

```
library-app/
├── index.js                          # Entry point
├── package.json                      # Dependencies and scripts
├── books.csv                         # Sample book data
├── README.md                         # This file
├── src/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection setup
│   │   ├── env.js                   # Environment variables
│   │   ├── redis.js                 # Redis client configuration
│   │   └── ws.js                    # WebSocket server setup
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication request handlers
│   │   ├── bookController.js        # Book CRUD request handlers
│   │   ├── borrowController.js      # Book borrowing request handlers
│   │   ├── fileController.js        # File upload request handlers
│   │   ├── notificationController.js# Notification request handlers
│   │   └── adminController.js       # Administrative request handlers
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js        # JWT token verification
│   │   ├── cacheMiddleware.js       # Redis response caching
│   │   ├── errorMiddleware.js       # Centralized error handling
│   │   ├── rateLimiter.js           # Request rate limiting
│   │   └── uploadMiddleware.js      # Multer file upload configuration
│   │
│   ├── models/
│   │   ├── user.js                  # User Mongoose schema
│   │   ├── book.js                  # Book Mongoose schema
│   │   ├── borrow.js                # Borrow Mongoose schema
│   │   ├── notification.js          # Notification Mongoose schema
│   │   ├── file.js                  # File Mongoose schema
│   │   └── cache.js                 # Cache helper utilities
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication endpoints
│   │   ├── bookRoutes.js            # Book management endpoints
│   │   ├── borrowRoutes.js          # Book borrowing endpoints
│   │   ├── fileRoutes.js            # File upload endpoints
│   │   ├── notificationRoutes.js    # Notification endpoints
│   │   └── adminRoutes.js           # Admin management endpoints
│   │
│   ├── services/
│   │   ├── authService.js           # Authentication business logic
│   │   ├── bookService.js           # Book management business logic
│   │   ├── borrowService.js         # Borrowing business logic
│   │   ├── cacheService.js          # Redis cache operations
│   │   ├── emailService.js          # Email sending functionality
│   │   └── scraperService.js        # Web scraping functionality
│   │
│   └── utils/
│       ├── csv.js                   # CSV writing utilities
│       ├── date.js                  # Date manipulation utilities
│       ├── hash.js                  # Password hashing utilities
│       ├── mailer.js                # Email configuration
│       ├── response.js              # Response formatting helpers
│       └── token.js                 # JWT token utilities
│
└── uploads/                         # Directory for uploaded files (covers, PDFs)
```

---

## Security Features

### Password Security
- Passwords hashed with **bcryptjs** (10 salt rounds)
- Plain text passwords never stored in database

### Authentication
- **JWT (JSON Web Tokens)** for stateless authentication
- Tokens stored in HTTP cookies
- Token signature validated on protected routes

### Rate Limiting
- **100 requests per 15 minutes** on authentication routes
- Prevents brute force and DDoS attacks

### File Upload Security
- **MIME type validation** - Only JPEG, PNG, PDF accepted
- **File size limit** - 5MB maximum per file
- **Filename sanitization** - Timestamp prevents overwrites
- Uploads isolated in dedicated `/uploads` directory

### CORS Protection
- Cross-Origin Resource Sharing properly configured

### Environment Variables
- Sensitive data (JWT secret, DB URI, email credentials) stored in `.env`
- Never hardcoded in source code

---

## Real-Time Features (WebSocket)

The system uses WebSocket on **port 8080** for real-time updates:

### WebSocket Events

#### BOOK_BORROWED
Triggered when a user successfully borrows a book
```json
{
  "type": "BOOK_BORROWED",
  "bookId": "65a7f2d3e4c5b9a1f2g3h4i5"
}
```

#### BOOK_RETURNED
Triggered when a user returns a borrowed book
```json
{
  "type": "BOOK_RETURNED",
  "bookId": "65a7f2d3e4c5b9a1f2g3h4i5"
}
```

All connected clients receive these events in real-time.

---

## Database Models

### User
- `name` - User full name
- `email` - Unique email address
- `password` - Hashed password (bcryptjs)
- `googleId` - Optional OAuth Google ID
- `createdAt` - Account creation timestamp

### Book
- `title` - Book title (required)
- `author` - Author name
- `description` - Book description
- `available` - Availability status (default: true)
- `cover` - Path to cover image
- `file` - Path to PDF file
- `createdAt` - Creation timestamp

### Borrow
- `user` - Reference to User document
- `book` - Reference to Book document
- `issuedAt` - When book was borrowed
- `dueDate` - Due date (7 days from issue)
- `returned` - Return status (default: false)

### Notification
- `user` - Reference to User document
- `message` - Notification message
- `read` - Read status (default: false)
- `createdAt` - Creation timestamp

### File
- `filename` - Original filename
- `path` - File storage path
- `mimetype` - File MIME type
- `uploadedAt` - Upload timestamp

---

## Performance Optimization

### Redis Caching
- **GET /books** endpoint responses cached for 60 seconds
- Significantly reduces database queries for book listing
- Automatic cache expiration

### Database Indexing
- Email field indexed for faster user lookups
- Book references indexed in Borrow model

### Lazy Loading
- Related documents populated on-demand using `.populate()`
- Reduces unnecessary data transfer

### Async Operations
- Email sending non-blocking
- File I/O asynchronous
- All database queries promise-based

---

## Example Usage

### Register a User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Get All Books
```bash
curl http://localhost:3000/books
```

### Borrow a Book (requires authentication)
```bash
curl -X POST http://localhost:3000/borrow/borrow \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "bookId": "65a7f2d3e4c5b9a1f2g3h4i5"
  }'
```

### Import Books from CSV
```bash
curl -X POST http://localhost:3000/admin/import \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -F "file=@books.csv"
```

---

## Error Handling

The API returns standard HTTP status codes:

- **200** - Success
- **201** - Created
- **400** - Bad Request (invalid input)
- **401** - Unauthorized (no token)
- **403** - Forbidden (invalid token)
- **404** - Not Found
- **500** - Server Error

Error responses include a JSON error message explaining the issue.

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/library-app` |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |
| `JWT_SECRET` | Secret for JWT signing | `your_secret_key_here` |
| `EMAIL` | SMTP email address | `your_email@gmail.com` |
| `EMAIL_PASS` | SMTP email password/app password | `your_app_password` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Your Google OAuth ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | Your Google OAuth secret |
| `GOOGLE_CALLBACK_URL` | Google OAuth callback URL | `http://localhost:3000/auth/google/callback` |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is part of the 4th Semester Honors Assignment at RBU (Rajasthan Bhagwati University).

---

## Support

For issues, questions, or suggestions, please open an issue in the project repository or contact the development team.

---

## Acknowledgments

- Built as part of the Assignment-2 for the 4th Semester Honors Program
- Uses modern Node.js and Express best practices
- Implements industry-standard security patterns and performance optimizations

---

**Last Updated:** April 2026  
**Project Version:** 1.0.0
