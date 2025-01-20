

FROM golang:1.23.5-alpine

# Set the working directory in the container
WORKDIR /app

# Enable CGO (for SQLite)
ENV CGO_ENABLED=1

# Install necessary build dependencies for SQLite and Air
RUN apk add --no-cache gcc musl-dev sqlite-dev \
    && go install github.com/air-verse/air@latest

# Copy go.mod and go.sum for Go dependencies
COPY go.mod go.sum ./

# Download Go modules
RUN go mod download

# Copy the rest of the application code
COPY . .

# Expose the port you want your app to run on (change as needed)
EXPOSE 5000

# Run Air for live reloading
CMD ["air"]

