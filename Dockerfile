# Use Python 3.9 as the base image
FROM python:3.9

# Install yt-dlp
RUN pip install -U yt-dlp

# Set up the working directory
WORKDIR /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Copy your project files into the container
COPY . /app

# Install your Node.js dependencies (if any)
RUN npm install

# Expose the necessary port
EXPOSE 3000

# Start your Node.js app
CMD ["node", "server.js"]
