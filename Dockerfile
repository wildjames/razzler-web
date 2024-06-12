# Stage 1: Build the React application
FROM node:18 as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built assets from the build stage and place them in Nginx's serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx when the container has launched. Nginx will then serve the React app
CMD ["nginx", "-g", "daemon off;"]
