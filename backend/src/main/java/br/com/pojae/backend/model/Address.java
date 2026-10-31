package br.com.pojae.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address {

    private String cep;

    private String street;

    private Integer number;

    private String neighborhood;

    private String city = "Maceió";

    private String state = "AL";

}
