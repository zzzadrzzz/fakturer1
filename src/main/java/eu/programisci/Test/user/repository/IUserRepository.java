package eu.programisci.Test.user.repository;


import eu.programisci.Test.user.ob.UserOB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<UserOB,Long> {

}
