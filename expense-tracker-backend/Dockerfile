# Use an official OpenJDK runtime as a parent image
# We use a slim version for a smaller image size
FROM openjdk:17-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file from the target folder into our container
# and rename it to app.jar for a simpler start command.
COPY target/expense-tracker-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# The command to run when the container launches
ENTRYPOINT ["java", "-jar", "app.jar"]