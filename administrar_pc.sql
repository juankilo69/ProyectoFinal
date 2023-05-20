-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2023 a las 21:00:07
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `administrar_pc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`username`, `pass`) VALUES
('admin', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenadores`
--

CREATE TABLE `ordenadores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `caracteristicas` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ordenadores`
--

INSERT INTO `ordenadores` (`id`, `nombre`, `precio`, `caracteristicas`, `img`) VALUES
(2, 'ASUS VivoBook 15 F1502ZA-EJ733 Intel', '499', 'Intel Core i5-1235U/8GB/512GB SSD/15.6\"', 'https://thumb.pccomponentes.com/w-530-530/articles/1063/10639019/1226-asus-vivobook-15-f1502za-ej733-intel-core-i5-1235u-8gb-512gb-ssd-156.jpg'),
(5, 'Lenovo V15 IGL Intel Celeron', '299', 'Intel Celeron N4020/8GB/256 GB SSD/15.6\"', 'https://thumb.pccomponentes.com/w-530-530/articles/1063/10633201/1361-lenovo-v15-igl-intel-celeron-n4020-8gb-256-gb-ssd-156.jpg'),
(6, 'PcCom Silver AMD', '1259', 'Ryzen 5 5600X/16GB/480GB SSD+1TB/RTX 3060 + Windows 11 Home', 'https://thumb.pccomponentes.com/w-530-530/articles/1037/10376933/6343-pccom-silver-amd-ryzen-5-5600x-16gb-480gb-ssd-1tb-rtx-3060-windows-11-home-opiniones.jpg'),
(8, 'AlurinPC Intel ', '529', 'ntel Core i5-10400/16GB/500GB SSD + Windows 11 Home', 'https://thumb.pccomponentes.com/w-530-530/articles/1066/10667171/1683-pccom-basic-intel-core-i5-10400-16gb-500gb-ssd-windows-11-home-especificaciones.jpg'),
(9, 'PcCom Bronze Intel ', '759', 'Intel Core i5-12400F/16GB/500GB SSD/GTX 1650\r\n', 'https://thumb.pccomponentes.com/w-530-530/articles/1065/10655543/173-pccom-bronze-intel-core-i5-12400f-16gb-500gb-ssd-gtx-1650-comprar.jpg'),
(10, 'PcCom Gold Élite Intel', '959', 'Intel Core i5-11400F/16GB/500GBSSD/RTX3060', 'https://thumb.pccomponentes.com/w-530-530/articles/1002/10023724/1354-pccom-gold-elite-intel-core-i5-11400f-16gb-500gbssd-rtx3060-comprar.jpg'),
(11, 'HP 15S-FQ5013NS Intel ', '569', 'Intel Core i5-1235U/8GB/512GB SSD/15.6\"', 'https://thumb.pccomponentes.com/w-530-530/articles/1042/10428549/1392-hp-15s-fq5013ns-intel-core-i5-1235u-8gb-512gb-ssd-156.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`username`, `pass`) VALUES
('d', '$2b$12$o3kd/kpLtsttsnm9GP/Q8OHVqUJ0zQvR22U/SxbrMBCNyHS.pmpq2'),
('e', '$2b$12$JFsmUShRlWHeERqVCF5T1eXVEMVT3jC5kl49XTRneP/l34iQn416m'),
('juanki', '$2b$12$zuogiqlWm/2uDtmNjyXTWOxbpTNe/UVf9uxqVhiohLnZj0N3CMG3G'),
('juanki2', '$2b$12$2q/izgnqhF55p6FxCA2UsODR0yp5r4OzBbiUlhRdeKtLq1dBVGk1S'),
('juankilo69', '$2b$12$ZffSj8m0IGTHQI8laVjuP.7.V.BGmWg3mrNgkPH2dHMvIagvTo942');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `ordenadores`
--
ALTER TABLE `ordenadores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ordenadores`
--
ALTER TABLE `ordenadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
