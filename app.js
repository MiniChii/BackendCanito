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
//conectar
mc.connect();


//Escuchar peticiones
app.listen(3005,()=>{
    console.log('Express server - puerto 3005 online');
    
});

//productos se ponen los más espécificos primero

/**listar todos los productos */
app.get('/productos', function(req,res){
    mc.query('SELECT * FROM producto', function(error,  results, fields ){
        if(error) throw error;
        return res.send({error: false, data: results, message:'Lista de productos.'})
    })
})

/**Crear Producto */
app.post('/producto', function(req,res){
    let datosProducto = {
        //id
        nombre: req.body.nombre,
        precio: parseInt(req.body.precio),
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        cantidad_personas: parseInt(req.body.cantPersonas)
    };

    if(mc){
        mc.query("INSERT INTO producto SET ?",datosProducto,function (error,result){
            
            if(error){
                res.status(500).json({
                    Mensaje:"Error",
                    error: error
            })
            }
            else{
                res.status(201).json({
                    mensaje:"Producto Insertado",
                    datos: result
                })
            }
        });
    }


});

/*actualizar producto*/
app.put('/producto/:id', function(req,res){
    let id = req.params.id;
    let producto = {
        //id
        nombre: req.body.nombre,
        precio: parseInt(req.body.precio),
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        cantidad_personas: parseInt(req.body.cantPersonas)
    };

    console.log(producto);
    
    if(!id || !producto){
        return res.status(400).send({error: producto, message:'Debe proveer un id y los datos de un producto'});
    }
    mc.query("UPDATE producto SET ? WHERE Id = ?", [producto,id], function(error,results,fields){
        if(error){ 
            console.log(error);
            throw error;
        }
        return res.status(200).json({
            Mensaje:"Registro ha sido actualizado",
            result: results,
        })
    })
})




