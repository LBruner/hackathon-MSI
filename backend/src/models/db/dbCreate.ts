import query from "./dbConnection";

export const setDB = async () => {
    try {
        await query(`SELECT *
                     FROM functionaries` as any);
        console.log("DONE")
    } catch (e) {
        console.log("CREATED")
        await query(`DROP DATABASE IF EXISTS construtora` as any);
        await query(`CREATE DATABASE construtora;` as any);
        await query(`USE construtora` as any);
        await query(`CREATE TABLE functionaries
                     (
                         id       int AUTO_INCREMENT,
                         name     VARCHAR(100) NOT NULL,
                         position VARCHAR(100) NOT NULL,
                         photo_uri varchar(255),
                         birth_date VARCHAR(255) NOT NULL ,
                         zip_code VARCHAR(8) NOT NULL ,
                         primary key (id)
                     );
        ` as any);
        await query(`CREATE TABLE teams
                     (
                         id   int AUTO_INCREMENT,
                         name varchar(255),
                         primary key (id)
                     );` as any);
        await query(`CREATE TABLE functionariesTeams
                     (
                         functionaryId int,
                         teamId        int,
                         foreign key (functionaryId) references functionaries (id),
                         foreign key (teamId) references teams (id)
                     );` as any);
        await query(`CREATE TABLE telephones
                     (
                         id            int auto_increment,
                         number        varchar(20),
                         functionaryId int,
                         primary key (id),
                         foreign key (functionaryId) references functionaries (id)
                     );` as any);
        await query(`CREATE TABLE constructions
                     (
                         id         int AUTO_INCREMENT,
                         name       VARCHAR(100),
                         photo_uri varchar(255),
                         start_date VARCHAR(255),
                         end_date   VARCHAR(255),
                         primary key (id)
                     );` as any);
        await query(`CREATE TABLE functionariesConstructions
                     (
                         functionaryId  int,
                         constructionId int,
                         foreign key (functionaryId) references functionaries (id),
                         foreign key (constructionId) references constructions (id)
                     );` as any);
        await query(`create table calls
                     (
                         id             INT AUTO_INCREMENT PRIMARY KEY,
                         date           VARCHAR(255),
                         constructionId INT,
                         employeeId INT,
                         periodo ENUM('morning', 'afternoon', 'evening'),
                         FOREIGN KEY (constructionId) REFERENCES constructions (id),
                         FOREIGN KEY (employeeId) REFERENCES functionaries (id),
                         primary key (constructionId,employeeId)
                     );` as any);
    }
}