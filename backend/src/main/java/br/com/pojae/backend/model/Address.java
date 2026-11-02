package br.com.pojae.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_addresses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address {

    @Id
    @Column(length = 9, nullable = false)
    private String cep;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private Integer number;

    @Column(nullable = false)
    private String neighborhood;

    @Column(nullable = false)
    private String city = "Maceió";

    @Column(nullable = false)
    private String state = "AL";

}
