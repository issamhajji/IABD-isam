# Use a lightweight Python base image
FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy project files
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose the port (Railway uses $PORT)
ENV PORT=5000
EXPOSE $PORT

# Start the app using waitress
CMD ["flask --app api  run"]
