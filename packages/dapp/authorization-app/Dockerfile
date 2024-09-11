# Use the official Node.js 16 image from Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from src directory to the container
COPY src/package.json src/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the src directory to the container
COPY src/ .

# Command to run the application
ENTRYPOINT [ "node", "/app/app.js"]
