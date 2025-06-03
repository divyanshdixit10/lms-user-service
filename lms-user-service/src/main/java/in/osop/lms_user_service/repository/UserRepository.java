package in.osop.lms_user_service.repository;

import in.osop.lms_user_service.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity
 * Provides data access methods for user operations
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by email address
     * @param email User email
     * @return Optional User
     */
    Optional<User> findByEmail(String email);

    /**
     * Find user by phone number
     * @param phoneNumber User phone number
     * @return Optional User
     */
    Optional<User> findByPhoneNumber(String phoneNumber);

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
     * Find users by course name
     * @param courseName Course name
     * @return List of users enrolled in the course
     */
    List<User> findByCourseName(String courseName);

    /**
     * Find users by status
     * @param status User status
     * @return List of users with the specified status
     */
    List<User> findByStatus(User.UserStatus status);

    /**
     * Find users by course name with pagination
     * @param courseName Course name
     * @param pageable Pagination information
     * @return Page of users
     */
    Page<User> findByCourseName(String courseName, Pageable pageable);

    /**
     * Find users by full name containing (case-insensitive search)
     * @param fullName Full name or part of it
     * @return List of users matching the name
     */
    List<User> findByFullNameContainingIgnoreCase(String fullName);

    /**
     * Custom query to find users by course name and status
     * @param courseName Course name
     * @param status User status
     * @return List of users
     */
    @Query("SELECT u FROM User u WHERE u.courseName = :courseName AND u.status = :status")
    List<User> findByCourseNameAndStatus(@Param("courseName") String courseName, 
                                       @Param("status") User.UserStatus status);

    /**
     * Count users by course name
     * @param courseName Course name
     * @return Number of users enrolled in the course
     */
    long countByCourseName(String courseName);

    /**
     * Count users by status
     * @param status User status
     * @return Number of users with the specified status
     */
    long countByStatus(User.UserStatus status);
} 