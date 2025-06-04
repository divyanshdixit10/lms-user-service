# LMS User Service

An enterprise-level Spring Boot microservice for managing user data collection in the OSOP Coding Learning Management System (LMS).

## 🚀 Features

- **User Registration & Management**: Complete CRUD operations for user data
- **Enterprise Architecture**: Layered architecture with Controller → Service → Repository pattern
- **Data Validation**: Comprehensive input validation using Bean Validation
- **MySQL Integration**: Full database integration with JPA/Hibernate
- **RESTful APIs**: Well-designed REST endpoints with consistent response structure
- **Exception Handling**: Global exception handling with proper HTTP status codes
- **Pagination & Sorting**: Built-in pagination and sorting support
- **Monitoring**: Spring Boot Actuator for health checks and metrics
- **Logging**: Structured logging with SLF4J and Logback

## 🏗️ Architecture

```
├── controller/          # REST Controllers
├── service/            # Business Logic Layer
│   └── impl/          # Service Implementations
├── repository/         # Data Access Layer
├── entity/            # JPA Entities
├── dto/               # Data Transfer Objects
├── exception/         # Custom Exceptions & Global Handler
└── config/            # Configuration Classes
```

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, VS Code)

## 🛠️ Setup Instructions

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE lms_user_db;
CREATE USER 'lms_user'@'localhost' IDENTIFIED BY 'lms_password';
GRANT ALL PRIVILEGES ON lms_user_db.* TO 'lms_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Application Configuration

Update `src/main/resources/application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lms_user_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Build and Run

```bash
# Clone the repository
git clone <repository-url>
cd lms-user-service

# Build the project
mvn clean compile

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api/v1/users
```

### User Registration Request Format
```json
{
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "email": "john.doe@example.com",
    "courseName": "Java Full Stack Development"
}
```

### API Endpoints

#### 1. Register New User
```http
POST /api/v1/users
Content-Type: application/json

{
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "email": "john.doe@example.com",
    "courseName": "Java Full Stack Development"
}
```

#### 2. Get User by ID
```http
GET /api/v1/users/{id}
```

#### 3. Get User by Email
```http
GET /api/v1/users/email/{email}
```

#### 4. Get All Users (Paginated)
```http
GET /api/v1/users?page=0&size=10&sortBy=createdAt&sortDir=desc
```

#### 5. Get Users by Course
```http
GET /api/v1/users/course/{courseName}
```

#### 6. Search Users by Name
```http
GET /api/v1/users/search?name=john
```

#### 7. Update User
```http
PUT /api/v1/users/{id}
Content-Type: application/json

{
    "fullName": "John Smith",
    "phoneNumber": "+1234567890",
    "email": "john.smith@example.com",
    "courseName": "React Development"
}
```

#### 8. Update User Status
```http
PATCH /api/v1/users/{id}/status?status=INACTIVE
```

#### 9. Delete User
```http
DELETE /api/v1/users/{id}
```

#### 10. Check Email Existence
```http
GET /api/v1/users/exists/email/{email}
```

#### 11. Get User Count by Course
```http
GET /api/v1/users/count/course/{courseName}
```

### Response Format

All API responses follow a consistent structure:

```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "userId": 1,
        "fullName": "John Doe",
        "phoneNumber": "+1234567890",
        "email": "john.doe@example.com",
        "courseName": "Java Full Stack Development",
        "status": "ACTIVE",
        "createdAt": "2024-01-15T10:30:00",
        "updatedAt": "2024-01-15T10:30:00"
    },
    "timestamp": "2024-01-15T10:30:00",
    "path": null
}
```

### Error Response Format

```json
{
    "success": false,
    "message": "User with email john.doe@example.com already exists",
    "data": null,
    "timestamp": "2024-01-15T10:30:00",
    "path": "uri=/api/v1/users"
}
```

## 🔍 Validation Rules

- **Full Name**: 2-100 characters, letters and spaces only
- **Phone Number**: 10-15 digits, may start with +
- **Email**: Valid email format, max 150 characters
- **Course Name**: 2-100 characters, required

## 📊 User Status Values

- `ACTIVE`: User is active and can access the system
- `INACTIVE`: User is temporarily inactive
- `SUSPENDED`: User is suspended
- `PENDING_VERIFICATION`: User registration is pending verification

## 🔧 Monitoring & Health Checks

### Health Check
```http
GET /actuator/health
```

### Application Info
```http
GET /actuator/info
```

### Metrics (requires authentication)
```http
GET /actuator/metrics
Authorization: Basic admin:admin123
```

## 🧪 Testing

### Using cURL

#### Register a new user:
```bash
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "phoneNumber": "+1987654321",
    "email": "jane.smith@example.com",
    "courseName": "Python Data Science"
  }'
```

#### Get all users:
```bash
curl -X GET "http://localhost:8080/api/v1/users?page=0&size=5"
```

### Using Postman

Import the following collection to test all endpoints:

1. Create a new collection named "LMS User Service"
2. Add requests for each endpoint listed above
3. Set the base URL to `http://localhost:8080`

## 🚀 Deployment

### Docker Deployment (Future Enhancement)

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/lms-user-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Production Configuration

For production deployment:

1. Update database credentials
2. Enable HTTPS
3. Configure proper logging levels
4. Set up monitoring and alerting
5. Implement proper security configurations

## 🔮 Future Enhancements

- [ ] JWT-based authentication
- [ ] Role-based access control
- [ ] Email verification system
- [ ] File upload for profile pictures
- [ ] Integration with course management module
- [ ] Advanced search and filtering
- [ ] Audit logging
- [ ] Rate limiting
- [ ] Caching with Redis
- [ ] Docker containerization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@osop.in
- Documentation: [Wiki](link-to-wiki)
- Issues: [GitHub Issues](link-to-issues)

---

**OSOP Coding LMS User Service** - Building the future of online learning! 🎓 