package in.osop.lms_user_service.service.impl;

import in.osop.lms_user_service.dto.UserRegistrationRequest;
import in.osop.lms_user_service.dto.UserResponse;
import in.osop.lms_user_service.entity.User;
import in.osop.lms_user_service.exception.DuplicateResourceException;
import in.osop.lms_user_service.exception.ResourceNotFoundException;
import in.osop.lms_user_service.repository.UserRepository;
import in.osop.lms_user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of UserService interface
 * Contains business logic for user operations
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponse registerUser(UserRegistrationRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());

        // Check for duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Attempt to register user with existing email: {}", request.getEmail());
            throw new DuplicateResourceException("User with email " + request.getEmail() + " already exists");
        }

        // Check for duplicate phone number
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            log.warn("Attempt to register user with existing phone number: {}", request.getPhoneNumber());
            throw new DuplicateResourceException("User with phone number " + request.getPhoneNumber() + " already exists");
        }

        // Create new user entity
        User user = User.builder()
                .fullName(request.getFullName().trim())
                .phoneNumber(request.getPhoneNumber().trim())
                .email(request.getEmail().toLowerCase().trim())
                .courseName(request.getCourseName().trim())
                .status(User.UserStatus.ACTIVE)
                .build();

        // Save user
        User savedUser = userRepository.save(user);
        log.info("Successfully registered user with ID: {} and email: {}", savedUser.getUserId(), savedUser.getEmail());

        return UserResponse.fromEntity(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long userId) {
        log.debug("Fetching user with ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", userId);
                    return new ResourceNotFoundException("User not found with ID: " + userId);
                });

        return UserResponse.fromEntity(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserByEmail(String email) {
        log.debug("Fetching user with email: {}", email);
        
        User user = userRepository.findByEmail(email.toLowerCase().trim())
                .orElseThrow(() -> {
                    log.warn("User not found with email: {}", email);
                    return new ResourceNotFoundException("User not found with email: " + email);
                });

        return UserResponse.fromEntity(user);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        log.debug("Fetching all users with pagination: {}", pageable);
        
        Page<User> users = userRepository.findAll(pageable);
        return users.map(UserResponse::fromEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getUsersByCourse(String courseName) {
        log.debug("Fetching users for course: {}", courseName);
        
        List<User> users = userRepository.findByCourseName(courseName.trim());
        return users.stream()
                .map(UserResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponse> getUsersByCourse(String courseName, Pageable pageable) {
        log.debug("Fetching users for course: {} with pagination: {}", courseName, pageable);
        
        Page<User> users = userRepository.findByCourseName(courseName.trim(), pageable);
        return users.map(UserResponse::fromEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> searchUsersByName(String name) {
        log.debug("Searching users by name: {}", name);
        
        List<User> users = userRepository.findByFullNameContainingIgnoreCase(name.trim());
        return users.stream()
                .map(UserResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUser(Long userId, UserRegistrationRequest request) {
        log.info("Updating user with ID: {}", userId);

        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", userId);
                    return new ResourceNotFoundException("User not found with ID: " + userId);
                });

        // Check for duplicate email (excluding current user)
        if (!existingUser.getEmail().equals(request.getEmail().toLowerCase().trim()) &&
            userRepository.existsByEmail(request.getEmail())) {
            log.warn("Attempt to update user with existing email: {}", request.getEmail());
            throw new DuplicateResourceException("User with email " + request.getEmail() + " already exists");
        }

        // Check for duplicate phone number (excluding current user)
        if (!existingUser.getPhoneNumber().equals(request.getPhoneNumber().trim()) &&
            userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            log.warn("Attempt to update user with existing phone number: {}", request.getPhoneNumber());
            throw new DuplicateResourceException("User with phone number " + request.getPhoneNumber() + " already exists");
        }

        // Update user fields
        existingUser.setFullName(request.getFullName().trim());
        existingUser.setPhoneNumber(request.getPhoneNumber().trim());
        existingUser.setEmail(request.getEmail().toLowerCase().trim());
        existingUser.setCourseName(request.getCourseName().trim());

        User updatedUser = userRepository.save(existingUser);
        log.info("Successfully updated user with ID: {}", updatedUser.getUserId());

        return UserResponse.fromEntity(updatedUser);
    }

    @Override
    public UserResponse updateUserStatus(Long userId, User.UserStatus status) {
        log.info("Updating status for user ID: {} to: {}", userId, status);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", userId);
                    return new ResourceNotFoundException("User not found with ID: " + userId);
                });

        user.setStatus(status);
        User updatedUser = userRepository.save(user);
        log.info("Successfully updated status for user ID: {}", updatedUser.getUserId());

        return UserResponse.fromEntity(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {
        log.info("Deleting user with ID: {}", userId);

        if (!userRepository.existsById(userId)) {
            log.warn("User not found with ID: {}", userId);
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }

        userRepository.deleteById(userId);
        log.info("Successfully deleted user with ID: {}", userId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email.toLowerCase().trim());
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByPhoneNumber(String phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber.trim());
    }

    @Override
    @Transactional(readOnly = true)
    public long getUserCountByCourse(String courseName) {
        return userRepository.countByCourseName(courseName.trim());
    }

    @Override
    @Transactional(readOnly = true)
    public long getUserCountByStatus(User.UserStatus status) {
        return userRepository.countByStatus(status);
    }
} 