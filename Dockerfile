# Stage 1: Set up the SSL certificates
FROM php:8.4.4-fpm-alpine AS ssl-stage

# Create SSL certificates
RUN apk add --no-cache nginx openssl && \
    mkdir -p /etc/ssl && \
    openssl req -x509 -nodes -days 365 -subj "/CN=localhost" -newkey rsa:2048 -keyout /etc/ssl/key.pem -out /etc/ssl/cert.pem

# Stage 2: Create the final image
FROM php:8.4.4-fpm-alpine

# Install Nginx
RUN apk add --no-cache nginx && \
    mkdir -p /var/www/html/

# Copy SSL certificates from the ssl-stage
COPY --from=ssl-stage /etc/ssl /etc/ssl

# Copy website files into container
COPY errors /var/www/html/errors
COPY pages /var/www/html/pages
COPY style /var/www/html/style
COPY favicon.ico index.php /var/www/html/

# Set permissions and remove .http files
RUN rm /var/www/html/errors/template.http && \
    find /var/www/html/errors -name "*.http" -exec sh -c 'mv "$0" "${0%.http}.php" && sed -i "1,3c <!DOCTYPE html>" "${0%.http}.php"' {} \; && \
    chown -R www-data:www-data /var/www/html && \
    rm -rf /var/cache/apk/*

# Copy Nginx and PHP-FPM configurations
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/php-fpm.conf /usr/local/etc/php-fpm.conf

# Expose ports 80 and 443
EXPOSE 80 443

# Start Nginx and PHP-FPM
CMD ["sh", "-c", "php-fpm -D && exec nginx -g 'daemon off;'"]