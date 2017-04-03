package eu.programisci.Test.user.converters;

import eu.programisci.Test.user.dto.UserDTO;
import eu.programisci.Test.user.dto.UserForTableDTO;
import eu.programisci.Test.user.ob.UserOB;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserCoverter {

    public UserDTO obToDto(UserOB in) {
        UserDTO out = new UserDTO();
        out.setId(in.getId());
        out.setCreationDate(in.getCreationDate());
        out.setLogin(in.getLogin());
        out.setPassword(in.getPassword());
        out.setEmail(in.getEmail());
        out.setName(in.getName());
        out.setLastname(in.getLastname());
        return out;
    }

    public UserOB dtoToOb(UserDTO in) {
        UserOB out = new UserOB();
        out.setId(in.getId());
        out.setCreationDate(in.getCreationDate());
        out.setLogin(in.getLogin());
        out.setPassword(in.getPassword());
        out.setEmail(in.getEmail());
        out.setName(in.getName());
        out.setLastname(in.getLastname());
        return out;
    }


    public List<UserForTableDTO> userObToUserForTable(List<UserOB> inList) {
        if (inList == null) {
            return null;
        }
        List<UserForTableDTO> outList = new ArrayList<>();
        for (UserOB in : inList) {
            outList.add(userObToUserForTable(in));
        }
        return outList;
    }

    private UserForTableDTO userObToUserForTable(UserOB in) {
        UserForTableDTO out = new UserForTableDTO();
        out.setId(in.getId());
        out.setCreationDate(in.getCreationDate());
        out.setLogin(in.getLogin());
        out.setName(in.getName());
        out.setLastname(in.getLastname());
        return out;
    }
}
