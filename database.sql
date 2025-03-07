-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: dualab
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
UNLOCK TABLES;
--
-- Table structure for table `alumnos`
--
drop database if exists dualab;
create database dualab;
use dualab;


--
-- Table structure for table `dualab`
--

DROP TABLE IF EXISTS `dualab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dualab` (
  `Empresa` varchar(100) DEFAULT NULL,
  `Dirección` varchar(200) DEFAULT NULL,
  `Teléfono` varchar(50) DEFAULT NULL,
  `Correoelectrónico` varchar(100) DEFAULT NULL,
  `Páginaweb` varchar(100) DEFAULT NULL,
  `Encargado` varchar(100) DEFAULT NULL,
  `Puesto` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dualab`
--

LOCK TABLES `dualab` WRITE;
/*!40000 ALTER TABLE `dualab` DISABLE KEYS */;
INSERT INTO `dualab` VALUES ('Rocman Producciones','Calle Sao Paulo S/N , Ed.IMEF, of.138, 35008, Las Palmas','619 60 36 03','info@rocmanproducciones.com','N/A','Manuel de los Reyes','Dueño'),('Cargolíder Canarias','C. Sao Paulo, 6, Of. 132, 35008 Las Palmas de Gran Canaria, Las Palmas','652 84 44 40','comercial@cargolidercanarias.com','https://cargolidercanarias.com/','Ángel  Fernandez','Director'),('Picanarias','C. Sao Paulo, 6, Oficina 127, 35008 Las Palmas de Gran Canaria, Las Palmas','928 20 49 22','infopicanarias@gmail.com','https://picanarias.com/','Ricardo',NULL),('TotalEnergy','Av. Rafael Cabrera, 14, 35002 Las Palmas de Gran Canaria, Las Palmas','+33 1 47 44 45 46',NULL,'https://grupocomercialconsulting.com/','Ana Inmaculada ','gerente '),('Asociación de empresarios puerto canteras','C. López Socas, 11, 35008 Las Palmas de Gran Canaria, Las Palmas','928 46 31 88','puertocanteras@yahoo.es','https://asociacionpuertocanteras.wordpress.com/','Dori','Presidenta'),('Cubas de Agua Las Palmas Transmer','Edificio Emprendedores, El Sebadal, C. Sao Paulo, 6, Oficina 108 - 1º planta, 35008 Las Palmas de Gran Canaria, Las Palmas','928 949 314  -  628 220 272','administracion@transmer.es','Empresa de transportes de agua en Las Palmas con Transmer',NULL,NULL),('De Pura Raza | Productos Cárnicos Premium\n','C. Sao Paulo, 6, local 8, 35008 Las Palmas de Gran Canaria, Las Palmas','662 158 938','administracion@depuraraza.es','https://www.depuraraza.es/index.html','Judit ','Dueña/administradora');
/*!40000 ALTER TABLE `dualab` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nif` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(25) NOT NULL CHECK (role IN ('profesor', 'empresa', 'alumno')),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nif` (`nif`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'78592247M','81dc9bdb52d04dc20036dbd8313ed055', 'profesor'),(2,'78592243M','6562c5c1f33db6e05a082a88cddab5ea', 'alumno');
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07  9:17:09