# --- Stage 1: Build the application ---
# Use a Maven image to build the project
FROM maven:3.8.5-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and the source code
COPY pom.xml .
COPY src ./src

# Build the project and create the JAR file
RUN mvn clean install -DskipTests


# --- Stage 2: Create the final, small image ---
# Use a slim Java image to run the application
FROM openjdk:17-slim

# Set the working directory
WORKDIR /app

# Copy ONLY the built JAR file from the 'build' stage
COPY --from=build /app/target/expense-tracker-0.0.1-SNAPSHOT.jar app.jar

# Expose the port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]