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
mc.connect();


//Escuchar peticiones
app.listen(3005,()=>{
    console.log('Express server - puerto 3005 online');
    
});

//hola
/**productos */
var producto= require('./producto');
var cliente= require('./cliente');
var op= require('./opinion');


app.post('/producto', producto.crear);
app.put('/producto/:id', producto.actualizar);
app.delete('/producto/:id', producto.borrar);
app.get('/productos', producto.listar);
app.get('/producto/',producto.buscarPorNombre);
app.get('/producto/categoria/:cat',producto.listarCategoria);
app.get('/producto/:id',producto.ver);

app.get('/clientes', cliente.listarClientes);
app.post('/cliente',cliente.crearCliente);
app.put('/cliente/:id', cliente.actualizarCliente);
app.delete('/cliente/:id', cliente.borrarCliente);

app.get('/opinion', op.listarOpinion);
app.post('/opinion', op.crear);
