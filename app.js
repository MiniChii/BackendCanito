//Requires
var express = require("express");
const mysql = require('mysql');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
//para encriptar la contrseña
var bcrypt = require('bcrypt');
//para ocupar JWT (JsonWebToken)
var jwt = require('jsonwebtoken');
//para el cors
var cors = require('cors');

//Inicializar variable
var app = express();
app.use(cors());
app.use(bodyParser.json());//para acceder a los paramettros post   
app.use(bodyParser.urlencoded({ extended: true })); //para poder adjuntar archivos
app.use(fileUpload());

//CORS Middleware: para que no lance errores de seguridad
app.use(function (req, res, next) {
  //enabling cors
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});


//conf conexion
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'canito',
});
//crear tabla
mc.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  let dropDetalle = "DROP TABLE IF EXISTS detalle_pedido";
  let createDetalle = `create table if not exists detalle_pedido(
                          id int(11) primary key auto_increment NOT NULL,
                          id_producto int(11) NOT NULL,
                          id_pedido int(11) NOT NULL,
                          id_cliente int(11) NOT NULL,
                          cantidad int(11) NOT NULL,
                          FOREIGN KEY (id_producto) REFERENCES producto(id),
                          FOREIGN KEY (id_pedido) REFERENCES pedido(id),
                          FOREIGN KEY (id_cliente) REFERENCES cliente(id)                                                
                          )ENGINE=InnoDB;`;
  let dropProducto = "DROP TABLE IF EXISTS producto";
  let createProducto = `create table if not exists producto(
                           id int(11) primary key auto_increment,
                           nombre varchar(70) NOT NULL,
                           precio int(11) NOT NULL,
                           descripcion text NOT NULL,
                           categoria enum('empanada','torta','pan') NOT NULL,
                           imagen text NOT NULL,
                           cantidad_personas int(11) DEFAULT NULL,
                           tiempo_produccion int(11) NOT NULL                           
                          )ENGINE=InnoDB;`;
  let dropCliente = "DROP TABLE IF EXISTS cliente";
  let createCliente = `create table if not exists cliente(
                          id int(11) primary key  auto_increment NOT NULL,
                          email varchar(100) NOT NULL,
                          contraseña varchar(300) NOT NULL,
                          rut varchar(12) NOT NULL,
                          nombres varchar(70) NOT NULL,
                          ap_paterno varchar(40) NOT NULL,
                          ap_materno varchar(40) NOT NULL
                          )ENGINE=InnoDB;`;

  let dropPedido = "DROP TABLE IF EXISTS pedido";
  let createPedido = `create table if not exists pedido(
                          id int(11) primary key auto_increment NOT NULL,
                          modo_entrega enum('retiro local','despacho domicilio')  NOT NULL DEFAULT 'retiro local',
                          fecha_inicio date NOT NULL,
                          fecha_entrega date NOT NULL,
                          fecha_pago date NOT NULL,
                          valor_total int(11) NOT NULL,
                          metodo_pago enum('débito','crédito','efectivo') NOT NULL,
                          direccion varchar(200) NOT NULL,
                          estado enum('cancelado por cliente','procesando','aprobado','preparando','listo para entrega','entregado') NOT NULL                                    
                          )ENGINE=InnoDB;`;

  mc.query(dropProducto, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log('Drop producto realizado');
  });
  mc.query(createProducto, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log('create producto realizado');
  });

  mc.query(dropPedido, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log('Drop pedido realizado');
  });
  mc.query(createPedido, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log('create pedido realizado');
  });
  mc.query(dropCliente, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log('Drop cliente realizado');
  });
  mc.query(createCliente, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log('create cliente realizado');
  });

  mc.query(dropDetalle, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log('Drop detalle realizado');
  });
  mc.query(createDetalle, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    console.log('create detalle realizado');
  });
});

//Escuchar peticiones
app.listen(3005, () => {
  console.log('Express server - puerto 3005 online');
});


/**productos */
var producto = require('./producto');
var cliente = require('./cliente');


app.post('/producto', producto.crear);
app.put('/producto/:id', producto.actualizar);
app.delete('/producto/:id', producto.borrar);
app.get('/productos', producto.listar);
app.get('/producto/', producto.buscarPorNombre);
app.get('/producto/categoria/:cat', producto.listarCategoria);
app.get('/producto/:id', producto.ver);

app.get('/clientes', cliente.listarClientes);
app.post('/cliente', cliente.crearCliente);
app.put('/cliente/:id', cliente.actualizarCliente);
app.delete('/cliente/:id', cliente.borrarCliente);
