# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the Nuxt.js application for production
RUN npm run build

# Expose the port Nuxt.js runs on (default is 3000)
EXPOSE 3000

# Command to start the Nuxt.js application in production mode
CMD ["npm", "start"]
