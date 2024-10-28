# Fullstack Task Management

## Description
This is a fullstack task management application that allows users to manage their tasks efficiently. The app includes features such as task creation, updating, deletion, and marking tasks as completed.

## Features
- User authentication and authorization
- Create, read, update, and delete tasks
- Mark tasks as completed
- Responsive design

## Technologies Used
- Frontend: React, Redux, CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/cack195/Task-Management-App.git
    ```
2. Navigate to the project directory:
    ```sh
    cd task-management-app
    ```
3. Install dependencies for both frontend and backend:
    ```sh
    cd client
    npm install
    cd ..
    ```
4. **Add Environment Variables**:
    - Create a `.env` file in the `server` directory.
    - Add your MongoDB URI to the `.env` file:
      ```plaintext
      ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
      ```
    - Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials and the name of your database.

## Usage

1. Start the backend server:
    ```sh
    cd server
    npm start
    ```
2. Start the frontend development server:
    ```sh
    cd client
    npm start
    ```
