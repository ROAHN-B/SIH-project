# Use Node.js base image
FROM node:18-alpine

# Upgrade npm
RUN npm install -g npm@latest

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the project
RUN npm run build

# Expose React/Next.js dev port
EXPOSE 80
# Start app
CMD ["npm", "start"]

