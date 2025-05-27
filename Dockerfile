# Use an official PHP image with Apache
FROM php:8.2-apache

# Enable Apache mod_rewrite (often used in PHP apps)
RUN a2enmod rewrite

# Copy your PHP project files into the container
COPY . /var/www/html/

# Set the working directory
WORKDIR /var/www/html

# Set recommended PHP.ini settings
COPY php.ini /usr/local/etc/php/

# Expose port 80 (Apache runs on 80 inside the container)
EXPOSE 80
