package eu.programisci.Test.user.api;

/**
 * Created by student on 25.04.17.
 */

import eu.programisci.Test.user.dto.TowarDTO;
import eu.programisci.Test.user.service.ITowarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/towar")
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class TowarRestController {
    @Autowired
    private ITowarService TowarService;

    @RequestMapping(value = "/findOne", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public TowarDTO findOne(@RequestParam("id") Long aId) {
        return TowarService.findOne(aId);
    }
    @RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<TowarDTO> findAll() {
        return (List<TowarDTO>) TowarService.findAll();
    }

    @RequestMapping(value = "/deleteOne", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void deleteOne(@RequestParam("id") Long aId) {
        TowarService.deleteOne(aId);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public TowarDTO save(@RequestBody TowarDTO aTowarDTO) {
        return TowarService.save(aTowarDTO);
    }
}
