package eu.programisci.Test;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.HEAD, RequestMethod.OPTIONS, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
public class TestRestController {

    @RequestMapping(value = "/odwrocString", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String odwrocString(@RequestParam("stringDoOdwrocenia") String aStringDoOdwrocenia) {
        return new StringBuilder(aStringDoOdwrocenia).reverse().toString();
    }

    @RequestMapping(value = "/dodajWartosci", method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public OdpowiedzDTO dodajWartosci(@RequestBody ParaLiczbDTO aParaLiczbDTO) {
        return new OdpowiedzDTO(aParaLiczbDTO.getX() + aParaLiczbDTO.getY(), "Kopytko");
    }
}
