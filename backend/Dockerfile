FROM python

WORKDIR /app

# Install mysql-client for mysqladmin
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Make the wait script executable
RUN chmod +x wait_for_mysql.sh

CMD ["./wait_for_mysql.sh"]