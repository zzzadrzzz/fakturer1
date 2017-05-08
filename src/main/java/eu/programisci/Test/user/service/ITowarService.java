package eu.programisci.Test.user.service;

import eu.programisci.Test.user.dto.TowarDTO;

import java.util.List;

/**
 * Created by student on 25.04.17.
 */
public interface ITowarService {
    TowarDTO findOne(Long id);
    List<TowarDTO> findAll();
    void deleteOne(Long id);
    TowarDTO save(TowarDTO towar);
    EJednostkaMiary[] getJednostkiMiary();
}
