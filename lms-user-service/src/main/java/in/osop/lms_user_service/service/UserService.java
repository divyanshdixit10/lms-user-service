package in.osop.lms_user_service.service;

import in.osop.lms_user_service.dto.UserRegistrationRequest;
import in.osop.lms_user_service.dto.UserResponse;
import in.osop.lms_user_service.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Service interface for User operations
 * Defines business logic contracts for user management
 */
public interface UserService {

    /**
     * Register a new user
     * @param request User registration request
     * @return UserResponse with created user details
     */
    UserResponse registerUser(UserRegistrationRequest request);

    /**
     * Get user by ID
     * @param userId User ID
     * @return UserResponse
     */
    UserResponse getUserById(Long userId);

    /**
     * Get user by email
     * @param email User email
     * @return UserResponse
     */
    UserResponse getUserByEmail(String email);

    /**
     * Get all users with pagination
     * @param pageable Pagination information
     * @return Page of UserResponse
     */
    Page<UserResponse> getAllUsers(Pageable pageable);

    /**
     * Get users by course name
     * @param courseName Course name
     * @return List of UserResponse
     */
    List<UserResponse> getUsersByCourse(String courseName);

    /**
     * Get users by course name with pagination
     * @param courseName Course name
     * @param pageable Pagination information
     * @return Page of UserResponse
     */
    Page<UserResponse> getUsersByCourse(String courseName, Pageable pageable);

    /**
     * Search users by name
     * @param name Full name or part of it
     * @return List of UserResponse
     */
    List<UserResponse> searchUsersByName(String name);

    /**
     * Update user information
     * @param userId User ID
     * @param request Updated user information
     * @return UserResponse with updated details
     */
    UserResponse updateUser(Long userId, UserRegistrationRequest request);

    /**
     * Update user status
     * @param userId User ID
     * @param status New status
     * @return UserResponse with updated status
     */
    UserResponse updateUserStatus(Long userId, User.UserStatus status);

    /**
     * Delete user by ID
     * @param userId User ID
     */
    void deleteUser(Long userId);

    /**
     * Check if user exists by email
     * @param email User email
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Check if user exists by phone number
     * @param phoneNumber User phone number
     * @return true if exists, false otherwise
     */
    boolean existsByPhoneNumber(String phoneNumber);

    /**
     * Get user count by course
     * @param courseName Course name
     * @return Number of users enrolled in the course
     */
    long getUserCountByCourse(String courseName);

    /**
     * Get user count by status
     * @param status User status
     * @return Number of users with the specified status
     */
    long getUserCountByStatus(User.UserStatus status);
} 