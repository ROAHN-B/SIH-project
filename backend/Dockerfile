# Use lightweight NGINX base image
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy all portfolio files into NGINX web root
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
