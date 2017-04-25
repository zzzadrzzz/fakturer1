package eu.programisci.Test.user.ob;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by student on 25.04.17.
 */
@Entity
@Table(name = "test_kontrahents")
@SequenceGenerator(allocationSize = 1, name = "SEKWENCJA", sequenceName = "gen_test_kontrahents_id")
public class KontrahentOB {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEKWENCJA")
    private Long id;
    @Column(name = "nazwa")
    private String nazwa;
    @Column(name = "adres")
    private String adres;
    @Column(name = "nip")
    private String nip;
    @Column(name = "creation_date", columnDefinition = "TIMESTAMP")
    private Date creationDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public String getAdres() {
        return adres;
    }

    public void setAdres(String adres) {
        this.adres = adres;
    }

    public String getNip() {
        return nip;
    }

    public void setNip(String nip) {
        this.nip = nip;
    }

}
