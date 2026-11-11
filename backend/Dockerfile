FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B -ntp dependency:go-offline
COPY src/ src/
RUN ./mvnw -B -ntp verify

FROM eclipse-temurin:25-jre
WORKDIR /app
RUN groupadd --system weddingly && useradd --system --gid weddingly weddingly
COPY --from=build --chown=weddingly:weddingly /app/target/weddingly-api-0.1.0.jar app.jar
USER weddingly
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
