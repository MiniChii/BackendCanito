-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 27-07-2019 a las 20:48:27
-- Versión del servidor: 10.3.12-MariaDB
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
-- Base de datos: `matias.chavez1501`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id`, `user`, `password`, `rol`) VALUES
(2, 'Admin', '$2b$10$2PS3XjB41ybdUSQonm8RTOjE9wxG3iYM8SJGqkHxIaUO3QZiYPUa.', 'administrador'),
(12, 'Felipe Vera', '$2b$10$LvOK0xYk3LNY5EsmbiyceemxYOZhzEfeaaKF25xBAOe6amcnNIB6G', 'vendedor'),
(13, 'francisca', '$2b$10$b1oXcZjwAeImkNCkInA.nuFceCekJRqMVdLYO5nNojhVU.77w.Cw.', 'vendedor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `user` text NOT NULL,
  `password` text NOT NULL,
  `rol` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id`, `user`, `password`, `rol`) VALUES
(5, 'admin', '123456', 'admin'),
(6, 'maty@gmail.com', '12345', 'vendedor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinion`
--

CREATE TABLE `opinion` (
  `id` int(11) NOT NULL,
  `nombreUsuario` varchar(150) NOT NULL,
  `comentario` varchar(2500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `opinion`
--

INSERT INTO `opinion` (`id`, `nombreUsuario`, `comentario`) VALUES
(2, 'alvaro castillo', 'Muy ricas sus tortas'),
(3, 'Constanza', 'Muy recomendable :D!'),
(4, 'Matias', 'Recomendable al 100%'),
(5, 'Clemente', 'Me encanta su panaderia'),
(6, 'Rodrigo', 'Me encantan las empanadas de su local y muy buena la atencion'),
(7, 'Felipe Vilchez', 'Muy buena panaderia!');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `modo_entrega` enum('retiro local','despacho domicilio') NOT NULL DEFAULT 'retiro local',
  `fecha_inicio` date NOT NULL,
  `fecha_entrega` date NOT NULL,
  `fecha_pago` date NOT NULL,
  `valor_total` int(11) NOT NULL,
  `metodo_pago` enum('débito','crédito','efectivo') NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `estado` enum('cancelado por cliente','procesando','aprobado','preparando','listo para entrega','entregado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `modo_entrega`, `fecha_inicio`, `fecha_entrega`, `fecha_pago`, `valor_total`, `metodo_pago`, `direccion`, `estado`) VALUES
(1, 'retiro local', '2019-07-07', '2019-07-07', '2019-07-07', 111111111, 'débito', 'lalal', 'preparando');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(70) NOT NULL,
  `precio` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `categoria` enum('Empanadas','Tortas','Panaderia') NOT NULL,
  `imagen` text NOT NULL,
  `cantidad_personas` int(11) DEFAULT NULL,
  `tiempo_produccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `precio`, `descripcion`, `categoria`, `imagen`, `cantidad_personas`, `tiempo_produccion`) VALUES
(3, 'Bocado Príncipe', 3490, 'Masas de hoja con nuez, manjar y mermelada de damasco cubierta con merengue.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta1.jpg', 10, 1),
(4, 'Brasileira', 5000, 'Panqueque blanco con pure? de lu?cuma, manjar y cubierta con ralladura de chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta2.jpg', 6, 1),
(5, 'Chocolate', 6000, 'Panqueque chocolate con crema de chocolate cubierta con chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta3.jpg', 6, 1),
(6, 'Chocolate Frambuesa\r\n', 4000, 'Panqueque chocolate con crema de chocolate y mermelada de frambuesa cubierta con chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta4.jpg', 5, 1),
(7, 'Chocolate Manjar', 4500, 'Panqueque chocolate con crema de chocolate y manjar cubierta con chocolate.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta5.jpg', 4, 1),
(8, '\r\nFlorencia', 3400, 'Bizcocho blanco, bizcocho chocolate, masas de hojas, disco de merengue, manjar y mermelada de frutilla cubierta de crema chantilli?.', 'Tortas', 'http://www.pastelerialaabuelita.cl/img/torta6.jpg', 4, 1),
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
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_producto` (`id_producto`),
  ADD UNIQUE KEY `id_pedido` (`id_pedido`),
  ADD UNIQUE KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `opinion`
--
ALTER TABLE `opinion`
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
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `opinion`
--
ALTER TABLE `opinion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`),
  ADD CONSTRAINT `detalle_pedido_ibfk_3` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
