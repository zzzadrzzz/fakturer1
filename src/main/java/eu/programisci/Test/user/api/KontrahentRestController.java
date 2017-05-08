package eu.programisci.Test.user.api;

import eu.programisci.Test.user.dto.KontrahentDTO;
import eu.programisci.Test.user.service.IKontrahentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/kontrahent")
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class KontrahentRestController {

    @Autowired
    private IKontrahentService KontrahentService;

    @RequestMapping(value = "/findOne", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public KontrahentDTO findOne(@RequestParam("id") Long aId) {
        return KontrahentService.findOne(aId);
    }

    @RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<KontrahentDTO> findAll() {
        return (List<KontrahentDTO>) KontrahentService.findAll();
    }

    @RequestMapping(value = "/deleteOne", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void deleteOne(@RequestParam("id") Long aId) {
        KontrahentService.deleteOne(aId);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public KontrahentDTO save(@RequestBody KontrahentDTO aUserDTO) {return KontrahentService.save(aUserDTO);
    }
}
