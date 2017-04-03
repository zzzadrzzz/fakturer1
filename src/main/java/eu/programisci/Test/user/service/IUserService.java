package eu.programisci.Test.user.service;

import eu.programisci.Test.user.dto.UserDTO;
import eu.programisci.Test.user.dto.UserForTableDTO;

import java.util.List;

public interface IUserService {

    UserDTO findOne(Long id);

    List<UserForTableDTO> findAllForTable();

    void deleteOne(Long id);

    UserDTO save(UserDTO userDTO);
}
