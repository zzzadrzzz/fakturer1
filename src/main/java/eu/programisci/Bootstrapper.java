package eu.programisci;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class Bootstrapper implements ApplicationListener<ContextRefreshedEvent> {

    Logger log = Logger.getLogger(this.getClass().getName());

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        log.info("Tutaj wykona sie import danych");
    }
}
