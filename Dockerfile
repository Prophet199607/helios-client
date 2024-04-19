# Use Node.js as the base image
FROM node:latest as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ENV VITE_APP_API_URL="http://34.87.29.178:8888/api/v1/"

# Build the Vue application
RUN npm run build

# Use nginx as the base image for the production stage
FROM nginx:stable-alpine as production-stage
# Copy the built Vue app from the build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
