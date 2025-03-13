# Stage 1: Set up the build stage
FROM php:8.4.4-fpm-alpine as build-stage

# Install necessary packages
RUN apk add --no-cache nginx openssl

# Remove unnecessary files to reduce image size
RUN rm -rf /var/cache/apk/*

# Generate a self-signed SSL certificate and key
RUN mkdir -p /etc/ssl && \
    openssl req -x509 -nodes -days 365 -subj "/CN=localhost" -newkey rsa:2048 -keyout /etc/ssl/key.pem -out /etc/ssl/cert.pem

# Stage 2: Create the final image
FROM php:8.4.4-fpm-alpine

# Install necessary packages
RUN apk add --no-cache nginx

# Remove unnecessary files to reduce image size
RUN rm -rf /var/cache/apk/*

# Copy SSL certificates from the build stage
COPY --from=build-stage /etc/ssl /etc/ssl

# Create necessary directories
RUN mkdir -p /var/www/html/

# Copy website files into container
COPY errors /var/www/html/errors
COPY pages /var/www/html/pages
COPY style /var/www/html/style
COPY favicon.ico /var/www/html/favicon.ico
COPY index.php /var/www/html/index.php

# Convert .http files to .php and modify the content
RUN rm /var/www/html/errors/template.http && \
    find /var/www/html/errors -name "*.http" -exec sh -c 'mv "$0" "${0%.http}.php" && sed -i "1,3c <!DOCTYPE html>" "${0%.http}.php"' {} \;

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html

# Copy Nginx and PHP-FPM configurations
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/php-fpm.conf /usr/local/etc/php-fpm.conf

# Expose ports 80 and 443
EXPOSE 80 443

# Start Nginx and PHP-FPM
CMD ["sh", "-c", "php-fpm -D && exec nginx -g 'daemon off;'"]