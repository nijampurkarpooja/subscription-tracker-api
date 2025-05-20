# Subscription Tracker API

Subscription Tracker API is a RESTful service designed to help users manage and track their recurring subscriptions. It provides endpoints for user authentication, subscription management, and renewal reminders, making it easy to organize and monitor all your subscriptions in one place. Built with Node.js, Express, and MongoDB, this API supports secure authentication, automated reminders, and robust workflow management.

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- JWT for authentication
- Arcjet for bot detection and rate limiting
- Upstash for workflow management
- Nodemailer for sending emails

## API Endpoints

### Authentication

- `POST /api/v1/auth/sign-up`  
  Create a new user account

- `POST /api/v1/auth/sign-in`  
  Sign in to an existing account

- `POST /api/v1/auth/sign-out`  
  Sign out of the current session

### Subscriptions

- `GET /api/v1/subscriptions/user/:id`  
  Retrieve all subscriptions for the authenticated user.

- `GET /api/v1/subscriptions/:id`  
  Retrieve a specific subscription by ID.

- `POST /api/v1/subscriptions`  
  Create a new subscription.

- `PUT /api/v1/subscriptions/:id`  
  Update an existing subscription by ID.

- `DELETE /api/v1/subscriptions/:id`  
  Delete a subscription by ID.

- `PUT /api/v1/subscriptions/:id/cancel`  
  Cancel a subscription by ID.

- `PUT /api/v1/subscriptions/:id/reactivate`  
  Reactivate a canceled subscription by ID.

### Users

- `GET /api/v1/users`
  Retrieve all users.

- `GET /api/v1/users/:id`
  Retrieve a specific user by ID.

- `PUT /api/v1/users/:id`
  Update a specific user by ID.

- `DELETE /api/v1/users/:id`
  Delete a specific user by ID.

### Workflows

- `POST /api/v1/workflows/subscription/reminder`
  Trigger a workflow for subscription reminder emails. (Triggered by subscription creation)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nijampurkarpooja/subscription-tracker-api.git
   cd subscription-tracker-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example` for reference).

4. Start the server:
   ```bash
   npm start
   ```

## Usage

- Use tools like Postman or curl to interact with the API endpoints.
- Authenticate using the provided token for protected routes.
