import query from "./dbConnection";

export const setDB = async () => {
    try {
        await query(`SELECT *
                     FROM funcionarios` as any);
        console.log("DONE")
    } catch (e) {
        console.log("CREATED")
        await query(`DROP DATABASE IF EXISTS construtora` as any);
        await query(`CREATE DATABASE construtora;` as any);
        await query(`USE construtora` as any);
        await query(`CREATE TABLE funcionarios
                     (
                         id     int AUTO_INCREMENT,
                         nome   VARCHAR(100) NOT NULL,
                         funcao VARCHAR(100) NOT NULL,
                         primary key (id)
                     );
        ` as any);
        await query(`CREATE TABLE equipes
                     (
                         id   int AUTO_INCREMENT,
                         nome varchar(255),
                         primary key (id)
                     );` as any);
        await query(`CREATE TABLE funcionariosEquipes
                     (
                         funcionarioId int,
                         equipeId      int,
                         foreign key (funcionarioId) references funcionarios (id),
                         foreign key (equipeId) references equipes (id)
                     );` as any);
        await query(`CREATE TABLE telefones
                     (
                         id            int auto_increment,
                         numero        varchar(20),
                         funcionarioId int,
                         primary key (id),
                         foreign key (funcionarioId) references funcionarios (id)
                     );` as any);
        await query(`CREATE TABLE obras
                     (
                         id           int AUTO_INCREMENT,
                         nome         VARCHAR(100),
                         data_inicio  DATE,
                         data_termino DATE,
                         primary key (id)
                     );` as any);
        await query(`CREATE TABLE funcionariosObras
                     (
                         funcionarioId int,
                         obraId        int,
                         foreign key (funcionarioId) references funcionarios (id),
                         foreign key (obraId) references obras (id)
                     );` as any);
        await query(`CREATE TABLE estados
                     (
                         id   int auto_increment,
                         nome varchar(255),
                         primary key (id)
                     );` as any);
        await query(`CREATE TABLE cidades
                     (
                         id       int auto_increment,
                         nome     varchar(255),
                         estadoId int,
                         foreign key (estadoId) references estados (id),
                         primary key (id)
                     );` as any);
        await query(`create table enderecos
                     (
                         id          INT AUTO_INCREMENT PRIMARY KEY,
                         logradouro  VARCHAR(255),
                         complemento VARCHAR(255),
                         bairro      VARCHAR(255),
                         cep         VARCHAR(8),
                         cidadeId    int,
                         foreign key (cidadeId) references cidades (id)
                     );
        ` as any);
        await query(`create table chamadas
                     (
                         id           INT AUTO_INCREMENT PRIMARY KEY,
                         data         DATE,
                         obraId       INT,
                         hora_inicial TIME,
                         hora_final   TIME,
                         FOREIGN KEY (obraId) REFERENCES obras (id)
                     );` as any);
    }
}