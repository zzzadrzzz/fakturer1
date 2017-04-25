package eu.programisci.Test.user.dto;

/**
 * Created by student on 25.04.17.
 */
public class KontrahentDTO {
    private Long id;
    private String nazwa;
    private String adres;
    private String nip;

    public KontrahentDTO(String nazwa, String adres, String nip)
    {
        this.nazwa = nazwa;
        this.adres = adres;
        this.nip = nip;
    }

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
