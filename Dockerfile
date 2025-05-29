# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the app port (match the port used in server.js)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
