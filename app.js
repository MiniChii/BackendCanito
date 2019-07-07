//Requires
var express = require("express");
const mysql = require('mysql');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
//para encriptar la contrseña
var bcrypt = require('bcrypt');
//para ocupar JWT (JsonWebToken)
var jwt=require('jsonwebtoken');
//para el cors
var cors=require('cors');

//Inicializar variable
var app=express();
app.use(cors());
app.use(bodyParser.json());//para acceder a los paramettros post   
app.use(bodyParser.urlencoded({extended:true})); //para poder adjuntar archivos
app.use(fileUpload());

//CORS Middleware: para que no lance errores de seguridad
app.use(function(req,res,next){
    //enabling cors
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
    

//conf conexion
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'canito',
});
//crear tabla
mc.connect(function(err){
    if (err) {
        return console.error('error: ' + err.message);
      }
        let dropProducto = "DROP TABLE IF EXISTS producto";
        let createProducto = `create table if not exists producto(
                              id int(11) primary key auto_increment,
                              nombre varchar(70) NOT NULL,
                              precio int not null,
                              descripcion text  NOT NULL,
                              categoria text NOT NULL,
                              imagen text  NOT NULL,
                              cantidad_personas int(11) not null,
                              tiempo_produccion int(11) NOT NULL                            
                          )`;    


        let dropPedido = "DROP TABLE IF EXISTS pedido";
        let createPedido = `create table if not exists pedido(
                              id int(11) primary key auto_increment,
                              modo_entrega text NOT NULL,
                              fecha_inicio date not null,
                              fecha_entrega date  NOT NULL,
                              fecha_pago date NOT NULL,
                              valor_total int(11)  NOT NULL,
                              metodo_pago text not null,
                              direccion varchar(200) NOT NULL,
                              estado varchar(150) NOT NULL                            
                          )`;  
                          
        mc.query(dropProducto, function(err, results, fields) {
            if (err) {                
              console.log(err.message);
            }
            console.log('Drop producto realizado');
          });
        mc.query(createProducto, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        console.log('create producto realizado');
        });  

        mc.query(dropPedido, function(err, results, fields) {
            if (err) {                
              console.log(err.message);
            }
            console.log('Drop pedido realizado');
          });
        mc.query(createPedido, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        console.log('create pedido realizado');
        });         
});


//Escuchar peticiones
app.listen(3005,()=>{
    console.log('Express server - puerto 3005 online');
    
});


/**productos */
var producto= require('./producto');


app.post('/producto', producto.crear);
app.put('/producto/:id', producto.actualizar);
app.delete('/producto/:id', producto.borrar);
app.get('/productos', producto.listar);
app.get('/producto/',producto.buscarPorNombre);
app.get('/producto/categoria/:cat',producto.listarCategoria);
app.get('/producto/:id',producto.ver);




