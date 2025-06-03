# 🚀 Postman Testing Guide for LMS User Service

## 📋 Prerequisites

1. **Install Java 17+** and ensure it's in your system PATH
2. **Install MySQL** and create the database:
   ```sql
   CREATE DATABASE osopdb;
   ```
3. **Install Postman** from [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

## 🛠️ Setup Instructions

### Step 1: Start the Application

1. **Open Terminal/Command Prompt** in the project directory
2. **Run the application**:
   ```bash
   # Using Maven (if installed)
   mvn spring-boot:run
   
   # OR using Maven Wrapper (Windows)
   .\mvnw.cmd spring-boot:run
   
   # OR using Maven Wrapper (Linux/Mac)
   ./mvnw spring-boot:run
   ```
3. **Wait for the application to start** - you should see:
   ```
   Started LmsUserServiceApplication in X.XXX seconds
   ```
4. **Verify the application is running**:
   - Open browser and go to: `http://localhost:8080/actuator/health`
   - You should see: `{"status":"UP"}`

### Step 2: Import Postman Collection

1. **Open Postman**
2. **Import Collection**:
   - Click "Import" button
   - Select "Upload Files"
   - Choose `LMS-User-Service.postman_collection.json`
   - Click "Import"

3. **Import Environment**:
   - Click "Import" button
   - Select "Upload Files"
   - Choose `LMS-User-Service.postman_environment.json`
   - Click "Import"

4. **Set Environment**:
   - In the top-right corner, select "LMS User Service Environment"

## 🧪 Testing Scenarios

### Scenario 1: Complete User Lifecycle Test

**Run these requests in order:**

1. **Health Check** (Request #17)
   - Verify application is running
   - Expected: Status 200, `"status": "UP"`

2. **Register New User** (Request #1)
   - Creates a new user
   - Expected: Status 201, user data returned
   - **Note**: The `userId` will be automatically saved for subsequent tests

3. **Get User by ID** (Request #2)
   - Retrieves the created user
   - Expected: Status 200, user data matches

4. **Get User by Email** (Request #3)
   - Retrieves user by email
   - Expected: Status 200, correct user returned

5. **Update User** (Request #5)
   - Updates user information
   - Expected: Status 200, updated data returned

6. **Update User Status** (Request #6)
   - Changes user status to INACTIVE
   - Expected: Status 200, status updated

7. **Delete User** (Request #19)
   - Removes the user
   - Expected: Status 200, success message

### Scenario 2: Search and Filter Tests

1. **Register Multiple Users** (Request #1)
   - Create 3-4 users with different courses
   - Modify the request body for each user

2. **Get All Users** (Request #4)
   - Test pagination
   - Expected: Paginated response with user list

3. **Get Users by Course** (Request #7)
   - Filter by specific course
   - Expected: Only users from that course

4. **Search Users by Name** (Request #10)
   - Search for partial names
   - Expected: Matching users returned

5. **Get User Counts** (Requests #9, #13)
   - Check counts by course and status
   - Expected: Correct numerical counts

### Scenario 3: Error Handling Tests

1. **Invalid Validation** (Request #15)
   - Test with invalid data
   - Expected: Status 400, validation errors

2. **Duplicate Email** (Request #14)
   - Try to register with existing email
   - Expected: Status 409, conflict error

3. **User Not Found** (Request #16)
   - Try to get non-existent user
   - Expected: Status 404, not found error

## 📊 Expected Response Formats

### Success Response
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

### Error Response
```json
{
    "success": false,
    "message": "User with email john.doe@example.com already exists",
    "data": null,
    "timestamp": "2024-01-15T10:30:00",
    "path": "uri=/api/v1/users"
}
```

### Validation Error Response
```json
{
    "success": false,
    "message": "Validation failed",
    "data": {
        "fullName": "Full name must be between 2 and 100 characters",
        "email": "Please provide a valid email address",
        "phoneNumber": "Phone number should be 10-15 digits and may start with +"
    },
    "timestamp": "2024-01-15T10:30:00",
    "path": "uri=/api/v1/users"
}
```

## 🔧 Test Data Examples

### Valid User Registration Data
```json
{
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "email": "john.doe@example.com",
    "courseName": "Java Full Stack Development"
}
```

### Additional Test Users
```json
// User 2
{
    "fullName": "Jane Smith",
    "phoneNumber": "+1987654321",
    "email": "jane.smith@example.com",
    "courseName": "React Development"
}

// User 3
{
    "fullName": "Bob Johnson",
    "phoneNumber": "+1122334455",
    "email": "bob.johnson@example.com",
    "courseName": "Python Data Science"
}

// User 4
{
    "fullName": "Alice Brown",
    "phoneNumber": "+1555666777",
    "email": "alice.brown@example.com",
    "courseName": "Java Full Stack Development"
}
```

### Invalid Data for Testing
```json
{
    "fullName": "A",                    // Too short
    "phoneNumber": "123",               // Invalid format
    "email": "invalid-email",           // Invalid email
    "courseName": ""                    // Empty course name
}
```

## 🎯 Testing Checklist

### ✅ Basic Functionality
- [ ] Application starts successfully
- [ ] Health check returns UP status
- [ ] User registration works
- [ ] User retrieval by ID works
- [ ] User retrieval by email works
- [ ] User update works
- [ ] User deletion works

### ✅ Search & Filter
- [ ] Get all users with pagination
- [ ] Search users by name
- [ ] Filter users by course
- [ ] Get user counts by course/status
- [ ] Check email/phone existence

### ✅ Validation & Error Handling
- [ ] Invalid data returns 400 with validation errors
- [ ] Duplicate email returns 409 conflict
- [ ] Non-existent user returns 404
- [ ] All error responses follow consistent format

### ✅ Status Management
- [ ] User status update works
- [ ] Status filtering works
- [ ] Status counts are accurate

## 🐛 Troubleshooting

### Application Won't Start
1. **Check Java Installation**:
   ```bash
   java -version
   ```
   Should show Java 17 or higher

2. **Check MySQL Connection**:
   - Ensure MySQL is running
   - Verify database `osopdb` exists
   - Check credentials in `application.properties`

3. **Check Port Availability**:
   - Ensure port 8080 is not in use
   - Or change port in `application.properties`

### Postman Issues
1. **Environment Not Set**:
   - Ensure "LMS User Service Environment" is selected
   - Check that `baseUrl` variable is set to `http://localhost:8080`

2. **Tests Failing**:
   - Run requests in the suggested order
   - Check that the application is running
   - Verify database connection

3. **Variables Not Working**:
   - Ensure environment is selected
   - Check that `userId` is being set after user creation

### Database Issues
1. **Connection Refused**:
   ```properties
   # Check these settings in application.properties
   spring.datasource.url=jdbc:mysql://localhost:3306/osopdb?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=root
   ```

2. **Table Creation Issues**:
   - Check that `spring.jpa.hibernate.ddl-auto=update` is set
   - Verify MySQL user has CREATE privileges

## 📈 Performance Testing

### Load Testing with Postman
1. **Use Collection Runner**:
   - Select the collection
   - Set iterations (e.g., 10)
   - Set delay between requests (e.g., 100ms)

2. **Monitor Response Times**:
   - Check average response times
   - Look for any timeouts or errors

3. **Database Performance**:
   - Monitor MySQL logs
   - Check query execution times

## 🔄 Continuous Testing

### Automated Testing
1. **Use Newman** (Postman CLI):
   ```bash
   npm install -g newman
   newman run LMS-User-Service.postman_collection.json -e LMS-User-Service.postman_environment.json
   ```

2. **CI/CD Integration**:
   - Add Newman to your build pipeline
   - Run tests after deployment

### Test Data Management
1. **Reset Database** between test runs:
   ```sql
   TRUNCATE TABLE users;
   ```

2. **Use Test-Specific Data**:
   - Use unique emails for each test run
   - Clean up test data after tests

---

## 🎉 Happy Testing!

This comprehensive guide should help you thoroughly test the LMS User Service. Remember to:
- Start with basic functionality tests
- Progress to complex scenarios
- Always test error conditions
- Monitor application logs for any issues

For any issues or questions, refer to the main README.md or check the application logs. 