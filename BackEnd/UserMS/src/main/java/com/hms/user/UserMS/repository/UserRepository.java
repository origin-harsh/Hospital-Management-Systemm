package com.hms.user.UserMS.repository;

import org.springframework.stereotype.Repository;
import com.hms.user.UserMS.entity.User;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
}
