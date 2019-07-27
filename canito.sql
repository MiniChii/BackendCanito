-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2019 a las 22:45:29
-- Versión del servidor: 10.3.15-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `canito`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `rut_cliente` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `nombres` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `ap_paterno` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `ap_materno` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `rut_cliente`, `nombres`, `ap_paterno`, `ap_materno`, `password`, `email`) VALUES
(1, 'sdfgh', 'dfghj', 'sfdfg', 'sfdgfhgj', '$2b$10$QIinonKKA42kOZdXpBD7qOAjFvIsFecKmibttXZAsv5SNAD0.OpQ.', 'qa@a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id_pedido`, `id_producto`, `cantidad_producto`) VALUES
(31, 4, 1),
(31, 17, 1),
(32, 4, 1),
(32, 17, 1),
(32, 4, 1),
(33, 13, 1),
(34, 13, 1),
(35, 4, 1),
(36, 4, 1),
(36, 4, 1),
(37, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinion`
--

CREATE TABLE `opinion` (
  `nombreUsuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `comentario` varchar(250) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `opinion`
--

INSERT INTO `opinion` (`nombreUsuario`, `comentario`) VALUES
('Francisca', 'Muy ricos los productos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `rut` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` int(9) NOT NULL,
  `direccion` varchar(400) COLLATE utf8_spanish_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `modo_entrega` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_entrega` date NOT NULL,
  `fecha_pago` date NOT NULL,
  `valor_total` int(11) NOT NULL,
  `metodo_pago` text COLLATE utf8_spanish_ci NOT NULL,
  `estado` enum('Bolsa de compras','Generado','Aprobado','Listo para entrega','Entregado','Cancelado') COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `nombre`, `rut`, `telefono`, `direccion`, `mail`, `modo_entrega`, `fecha_inicio`, `fecha_entrega`, `fecha_pago`, `valor_total`, `metodo_pago`, `estado`) VALUES
(31, 'Francisca Palma ', '184312905', 987456321, '', 'f.p.chii@gmail.com', 'retiro', '2019-07-27', '0000-00-00', '0000-00-00', 5240, 'debito', 'Generado'),
(32, 'Francisca', '184312905', 987456321, '', 'f.p.c@gmail.com', 'retiro', '2019-07-27', '0000-00-00', '0000-00-00', 10240, 'credito', 'Generado'),
(33, 'Fasdf', '15632', 851289456, 'asdf', 'a@a', 'despacho', '2019-07-27', '0000-00-00', '0000-00-00', 1600, 'debito', 'Generado'),
(34, 'fcg', 'dgfg', 741225896, '', 'gfg@a', 'retiro', '2019-07-27', '0000-00-00', '0000-00-00', 1600, 'debito', 'Generado'),
(35, 'dgfgh', 'dgfhghhtt', 789654123, '', 'fhg@asd', 'retiro', '2019-07-27', '0000-00-00', '0000-00-00', 5000, 'debito', 'Generado'),
(36, 'dgfhg', 'dgfhgh', 741258963, '', 'a@a', 'retiro', '2019-07-27', '0000-00-00', '0000-00-00', 10000, 'debito', 'Generado'),
(37, 'Francisca Palma', '184312905', 789654123, '', 'a@a', 'retiro', '2019-07-27', '0000-00-00', '0000-00-00', 3490, 'debito', 'Aprobado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(70) COLLATE utf8_spanish_ci NOT NULL,
  `precio` int(11) NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `categoria` enum('Tortas','Empanadas','Panaderia') COLLATE utf8_spanish_ci NOT NULL,
  `imagen` text COLLATE utf8_spanish_ci NOT NULL,
  `cantidad_personas` int(11) NOT NULL,
  `tiempo_produccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `precio`, `descripcion`, `categoria`, `imagen`, `cantidad_personas`, `tiempo_produccion`) VALUES
(3, 'Bocado Príncipe', 3490, 'Masas de hoja con nuez, manjar y mermelada de damasco cubierta con merengue.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta1.jpg', 10, 1),
(4, 'Brasileira', 5000, 'Panqueque blanco con puré de lúcuma, manjar y cubierta con ralladura de chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta2.jpg', 6, 1),
(5, 'Chocolate', 6000, 'Panqueque chocolate con crema de chocolate cubierta con chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta3.jpg', 6, 1),
(6, 'Chocolate Frambuesa\r\n', 4000, 'Panqueque chocolate con crema de chocolate y mermelada de frambuesa cubierta con chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta4.jpg', 5, 1),
(7, 'Chocolate Manjar', 4500, 'Panqueque chocolate con crema de chocolate y manjar cubierta con chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta5.jpg', 4, 1),
(8, '\r\nFlorencia', 3400, 'Bizcocho blanco, bizcocho chocolate, masas de hojas, disco de merengue, manjar y mermelada de frutilla cubierta de crema chantillí.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta6.jpg', 4, 1),
(9, '\r\nMil Hoja\r\n', 4100, 'Hoja de alfajor con manjar.\r\n\r\n', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta8.jpg', 4, 1),
(10, 'Mil Hoja Frambuesa', 4300, 'Hoja de alfajor con manjar y mermelada de frambuesa.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta9.jpg', 7, 1),
(11, '\r\nCeliaco\r\n', 5000, 'Bizcocho Chocolate (hecho de harina de almendra) con crema chocolate, mermelada frambuesa cubierta de crema de chocolate y placas de chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta15.jpg', 10, 1),
(12, 'Empanada Pino Grande 24cm', 1300, 'Horneada y lista para servir. Incluye 1 unidad.', 'Empanadas', 'https://res.cloudinary.com/admsys-storage/image/fetch/c_fill,f_auto,q_auto:best,w_auto/https://elpalaciodelasempanadas.cl/site/resources/uploads/productos/normal/7b05557f7e5f9c09d522636354e32b58.jpg', 1, 1),
(13, 'Empanadas Queso Medialuna Grande', 1600, 'Para freír. Incluye 5 unidades.', 'Empanadas', 'https://res.cloudinary.com/admsys-storage/image/fetch/c_fill,f_auto,q_auto:best,w_auto/https://elpalaciodelasempanadas.cl/site/resources/uploads/productos/normal/0a7b487f4ba6fffaf5f758833d7bc250.jpg', 1, 1),
(14, 'Sopaipilla Coctel', 1600, 'para Freir.incluye 40 unidades', 'Empanadas', 'https://res.cloudinary.com/admsys-storage/image/fetch/c_fill,f_auto,q_auto:best,w_auto/https://elpalaciodelasempanadas.cl/site/resources/uploads/productos/normal/c60fced93dff4223f6479655bb586ce1.jpg', 1, 1),
(15, 'Pan Ciabatta Rústico', 500, 'Pan Rustico de calidad', 'Panaderia', 'https://jumbo.vteximg.com.br/arquivos/ids/294068-750-750/Principal-1304.jpg?v=636869721493230000', 1, 1),
(16, 'Croissant artesano', 359, 'destaca por su crujiente hojaldre y su esponjoso interior. ¡Un clásico imprescindible! Con un formato ideal para desayunos y meriendas.', 'Panaderia', 'https://jumbo.vteximg.com.br/arquivos/ids/296384-750-750/295669-01.png?v=636886002290870000', 1, 1),
(17, 'Pan Coliza Peruana', 240, 'pan algo crocante y de sabor un poco dulce', 'Panaderia', 'https://jumbo.vteximg.com.br/arquivos/ids/294103-750-750/Principal-134637.jpg?v=636869721677230000', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
