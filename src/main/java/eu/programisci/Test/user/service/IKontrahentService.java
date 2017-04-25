package eu.programisci.Test.user.service;

import eu.programisci.Test.user.dto.KontrahentDTO;

import java.util.List;

/**
 * Created by student on 25.04.17.
 */
public interface IKontrahentService {
    KontrahentDTO findOne(Long id);
    List<KontrahentDTO> findAll();
    void deleteOne(Long id);
    KontrahentDTO save(KontrahentDTO kontrahent);
}
