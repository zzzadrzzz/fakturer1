package eu.programisci.Test.user.service;

import eu.programisci.Test.user.converters.UserCoverter;
import eu.programisci.Test.user.dto.UserDTO;
import eu.programisci.Test.user.dto.UserForTableDTO;
import eu.programisci.Test.user.ob.UserOB;
import eu.programisci.Test.user.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private UserCoverter userCoverter;

    @Override
    public UserDTO findOne(Long id) {
        UserOB ob = userRepository.findOne(id);
        UserDTO dto = userCoverter.obToDto(ob);
        return dto;
    }

    @Override
    public List<UserForTableDTO> findAllForTable() {
        List<UserOB> obList = userRepository.findAll();
        List<UserForTableDTO> dtoList = userCoverter.userObToUserForTable(obList);
        return dtoList;
    }

    @Override
    public void deleteOne(Long id) {
        userRepository.delete(id);
    }

    @Override
    public UserDTO save(UserDTO dto) {
        if (dto.getId() == null) {
            return userCoverter.obToDto(create(dto));
        } else {
            return userCoverter.obToDto(update(dto));
        }
    }

    private UserOB create(UserDTO dto) {
        UserOB ob = userCoverter.dtoToOb(dto);
        ob.setCreationDate(new Date());
        ob = userRepository.save(ob);
        return ob;
    }

    private UserOB update(UserDTO dto) {
        UserOB ob = userRepository.findOne(dto.getId());
        ob.setLogin(dto.getLogin());
        ob.setPassword(dto.getPassword());
        ob.setEmail(dto.getEmail());
        ob.setName(dto.getName());
        ob.setLastname(dto.getLastname());
        ob = userRepository.save(ob);
        return ob;
    }
}
