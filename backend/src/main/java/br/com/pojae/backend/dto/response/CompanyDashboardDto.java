package br.com.pojae.backend.dto.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record CompanyDashboardDto(String companyName, String cnpj, List<Vacancy> vacancies) {
    public record Vacancy(UUID id, String status, String titulo, String descricao, int tipoVaga,
            Integer quantidadeVagas, int quantidadeCandidaturas, String diasSemana, Integer diasSemanaCount,
            Integer cargaHorariaDiaria, Integer cargaHorariaSemanal, BigDecimal valorBolsa,
            String objetivoOportunidade, String atividadesPrevistas, String periodoRecesso,
            String inicioPrevisto, String terminoPrevisto, String beneficiosOferecidos,
            String empresaResponsavel, String localidadeVaga, int modalidadeTrabalho,
            int setorAtuacao, String habilidadesDesejadas, String cursosRelacionados,
            int escolaridade, String seriePeriodoDesejado, String observacoesCriterios,
            String supervisorNome, String supervisorFormacao, List<Application> candidaturas) {}
    public record Application(UUID idCandidatura, String dataHoraCandidatura, int statusCandidatura,
            UUID candidatoId, String nomeCandidato, String email, String telefone, String curriculoId,
            String historicoEscolarId, String mensagemApresentacao, String instituicaoEnsino,
            String nomeCurso, String seriePeriodo, String turno, String conclusaoPrevista,
            List<Skill> habilidades) {}
    public record Skill(int tipoHabilidade, String habilidade, Integer nivelProficiencia, String observacoes) {}
}
