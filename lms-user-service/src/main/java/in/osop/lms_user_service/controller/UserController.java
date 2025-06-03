package in.osop.lms_user_service.controller;

import in.osop.lms_user_service.dto.ApiResponse;
import in.osop.lms_user_service.dto.UserRegistrationRequest;
import in.osop.lms_user_service.dto.UserResponse;
import in.osop.lms_user_service.entity.User;
import in.osop.lms_user_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for User operations
 * Provides endpoints for user management in the LMS system
 */
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final UserService userService;

    /**
     * Register a new user
     * POST /api/v1/users
     */
    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> registerUser(
            @Valid @RequestBody UserRegistrationRequest request) {
        
        log.info("Received user registration request for email: {}", request.getEmail());
        
        UserResponse userResponse = userService.registerUser(request);
        ApiResponse<UserResponse> response = ApiResponse.success(
            userResponse, 
            "User registered successfully"
        );
        
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get user by ID
     * GET /api/v1/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        log.debug("Fetching user with ID: {}", id);
        
        UserResponse userResponse = userService.getUserById(id);
        ApiResponse<UserResponse> response = ApiResponse.success(
            userResponse, 
            "User retrieved successfully"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get user by email
     * GET /api/v1/users/email/{email}
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserByEmail(@PathVariable String email) {
        log.debug("Fetching user with email: {}", email);
        
        UserResponse userResponse = userService.getUserByEmail(email);
        ApiResponse<UserResponse> response = ApiResponse.success(
            userResponse, 
            "User retrieved successfully"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get all users with pagination
     * GET /api/v1/users?page=0&size=10&sort=createdAt,desc
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        log.debug("Fetching all users - page: {}, size: {}, sortBy: {}, sortDir: {}", 
                 page, size, sortBy, sortDir);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                   Sort.by(sortBy).descending() : 
                   Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<UserResponse> users = userService.getAllUsers(pageable);
        
        ApiResponse<Page<UserResponse>> response = ApiResponse.success(
            users, 
            "Users retrieved successfully"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get users by course name
     * GET /api/v1/users/course/{courseName}
     */
    @GetMapping("/course/{courseName}")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsersByCourse(
            @PathVariable String courseName) {
        
        log.debug("Fetching users for course: {}", courseName);
        
        List<UserResponse> users = userService.getUsersByCourse(courseName);
        ApiResponse<List<UserResponse>> response = ApiResponse.success(
            users, 
            "Users retrieved successfully for course: " + courseName
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get users by course name with pagination
     * GET /api/v1/users/course/{courseName}/paginated?page=0&size=10
     */
    @GetMapping("/course/{courseName}/paginated")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getUsersByCourseWithPagination(
            @PathVariable String courseName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        log.debug("Fetching users for course: {} with pagination", courseName);
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                   Sort.by(sortBy).descending() : 
                   Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<UserResponse> users = userService.getUsersByCourse(courseName, pageable);
        
        ApiResponse<Page<UserResponse>> response = ApiResponse.success(
            users, 
            "Users retrieved successfully for course: " + courseName
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Search users by name
     * GET /api/v1/users/search?name=john
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<UserResponse>>> searchUsersByName(
            @RequestParam String name) {
        
        log.debug("Searching users by name: {}", name);
        
        List<UserResponse> users = userService.searchUsersByName(name);
        ApiResponse<List<UserResponse>> response = ApiResponse.success(
            users, 
            "Users search completed successfully"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Update user information
     * PUT /api/v1/users/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRegistrationRequest request) {
        
        log.info("Updating user with ID: {}", id);
        
        UserResponse userResponse = userService.updateUser(id, request);
        ApiResponse<UserResponse> response = ApiResponse.success(
            userResponse, 
            "User updated successfully"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Update user status
     * PATCH /api/v1/users/{id}/status?status=INACTIVE
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<UserResponse>> updateUserStatus(
            @PathVariable Long id,
            @RequestParam User.UserStatus status) {
        
        log.info("Updating status for user ID: {} to: {}", id, status);
        
        UserResponse userResponse = userService.updateUserStatus(id, status);
        ApiResponse<UserResponse> response = ApiResponse.success(
            userResponse, 
            "User status updated successfully"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Delete user
     * DELETE /api/v1/users/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        log.info("Deleting user with ID: {}", id);
        
        userService.deleteUser(id);
        ApiResponse<Void> response = ApiResponse.success("User deleted successfully");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Check if user exists by email
     * GET /api/v1/users/exists/email/{email}
     */
    @GetMapping("/exists/email/{email}")
    public ResponseEntity<ApiResponse<Boolean>> checkUserExistsByEmail(@PathVariable String email) {
        log.debug("Checking if user exists with email: {}", email);
        
        boolean exists = userService.existsByEmail(email);
        ApiResponse<Boolean> response = ApiResponse.success(
            exists, 
            "Email existence check completed"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Check if user exists by phone number
     * GET /api/v1/users/exists/phone/{phoneNumber}
     */
    @GetMapping("/exists/phone/{phoneNumber}")
    public ResponseEntity<ApiResponse<Boolean>> checkUserExistsByPhone(@PathVariable String phoneNumber) {
        log.debug("Checking if user exists with phone: {}", phoneNumber);
        
        boolean exists = userService.existsByPhoneNumber(phoneNumber);
        ApiResponse<Boolean> response = ApiResponse.success(
            exists, 
            "Phone number existence check completed"
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get user count by course
     * GET /api/v1/users/count/course/{courseName}
     */
    @GetMapping("/count/course/{courseName}")
    public ResponseEntity<ApiResponse<Long>> getUserCountByCourse(@PathVariable String courseName) {
        log.debug("Getting user count for course: {}", courseName);
        
        long count = userService.getUserCountByCourse(courseName);
        ApiResponse<Long> response = ApiResponse.success(
            count, 
            "User count retrieved successfully for course: " + courseName
        );
        
        return ResponseEntity.ok(response);
    }

    /**
     * Get user count by status
     * GET /api/v1/users/count/status/{status}
     */
    @GetMapping("/count/status/{status}")
    public ResponseEntity<ApiResponse<Long>> getUserCountByStatus(@PathVariable User.UserStatus status) {
        log.debug("Getting user count for status: {}", status);
        
        long count = userService.getUserCountByStatus(status);
        ApiResponse<Long> response = ApiResponse.success(
            count, 
            "User count retrieved successfully for status: " + status
        );
        
        return ResponseEntity.ok(response);
    }
} 