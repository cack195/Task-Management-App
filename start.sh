#!/bin/bash

# Start the backend server
echo "Starting the backend server..."
cd server
npm start &

# Start the frontend server
echo "Starting the frontend development server..."
cd ../client
npm start