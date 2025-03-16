#!/bin/sh

# Waiting for MySQL to be ready
until mysqladmin ping -h mysql -u root -ppassword123 --silent; do
  echo "Waiting for MySQL to be ready..."
  sleep 2
done

echo "MySQL is ready! Running migrations..."

# Next Run migrations and start the server
python manage.py migrate
python manage.py runserver 0.0.0.0:8000