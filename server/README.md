CONNECT 4 BACKEND SERVER

# Backend README

## Table of Contents
1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
3. [Routes Documentation](#routes-documentation)

---

## Introduction
This document serves as the README for the backend of the application. It includes instructions for installing dependencies, setting up the environment, and understanding the available API routes.

---

## Installation and Setup

### Prerequisites
Ensure the following are installed on your system:
- Node.js (version X.X.X or higher)
- npm or yarn
- [Optional] Database system (e.g., PostgreSQL, MongoDB, etc.)


### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/paulgasbarra/PursuitHackathonFourSquare.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd server
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
1. npm install Express
2. npm install Dotenv
3. npm install PG

4. **Set up environment variables**:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=3000
   ```

5. **Start the server**:
   - For development:
     ```bash
     npm run start
     ```
   - For production:
     ```bash
     npm start
     ```

---

## Routes Documentation

### Base URL
The base URL for the API is: `http://localhost:3000`

### Authentication Routes
1. **POST** `/players`
   - **Description**: Register a new user.
   - **Request Body**:
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully",
       "data": {
         "id": "number",
         "username": "string",
         "email": "string"
       }
     }
     ```

2. **POST** `/games/`
   - **Description**: Create a game.
   - **Request Body**:
     ```json
     {
       "player1_id": "string",
       "player2_id": "string",
       "status": "string"
     }
     ```

     2. **GET** `/players/id`
   - **Description**: Check player names and stats.
   - **Request Body**:
     ```json
     {
       "id":"number",
       "username": "string",
       "email": "string",
       "last_login": "TIMESTAMP",
       "wins": "number",
       "losses":"number",
       "draws":"number"
     }
     ```
