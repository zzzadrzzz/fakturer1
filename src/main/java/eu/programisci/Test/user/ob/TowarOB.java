package eu.programisci.Test.user.ob;

import eu.programisci.Test.user.dto.EJednostkaMiary;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by student on 25.04.17.
 */
@Entity
@Table(name = "test_towars")
@SequenceGenerator(allocationSize = 1, name = "SEKWENCJA", sequenceName = "gen_test_towars_id")
public class TowarOB {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEKWENCJA")
    private Long id;
    @Column(name = "nazwa")
    private String nazwa;
    @Column(name = "pkwiu")
    private String pkwiu;
    @Column(name = "creation_date", columnDefinition = "TIMESTAMP")
    private Date creationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "jednostkaMiary")
    private EJednostkaMiary jednostkaMiary;
    @Column(name = "vat")
    private Integer vat;
    @Column(name = "cenaNetto")
    private Double cenaNetto;
}
