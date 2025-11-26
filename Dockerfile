# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy project file and restore as distinct layers
COPY *.sln .
COPY src/Application/*.csproj ./src/Application/
COPY src/Domain/*.csproj ./src/Domain/
COPY src/Infrastructure/*.csproj ./src/Infrastructure/
COPY src/WebAPI/*.csproj ./src/WebAPI/
RUN dotnet restore

# Copy source code and publish app
COPY src/ ./src/
WORKDIR /source/src/WebAPI
RUN dotnet publish -c Release -o /app --no-restore

# Final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
ENTRYPOINT ["dotnet", "WebAPI.dll"]
