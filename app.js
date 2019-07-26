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
var empleado = require('./empleado');

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

app.post('/empleado', empleado.crearEmpleado);


app.get('/login',function(req,res){
    console.log('entro a login');
    mc.query('SELECT * FROM login', function(error, results, fields){
        if(error) throw error;
        return res.send({
            error: false, data: results, message:'usuarios'
        });
    });
});


app.post('/loginEmpleado', (req, res)=>{
    var body = req.body;
    mc.query("SELECT * FROM empleado WHERE user = ?", body.user, function(error, results, fields){
        if(error){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if(!results){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }
            console.log(results); 
            if(!bcrypt.compareSync(body.password, results[0].password)){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas',
                    errors: error
                });
            }
            //crear un token 
            let SEED= 'esta-es-una-semilla';
            let token= jwt.sign({usuario: results[0].password},SEED,{expiresIn:14400});
            res.status(200).json({
                ok: true,
                user: results,
                id:results[0].userId,
                token: token
            });        
    });
});

app.post('/loginCliente', (req, res)=>{
    var body = req.body;
    mc.query("SELECT * FROM cliente WHERE email = ?", body.email, function(error, results, fields){
        if(error){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if(!results){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }
            console.log(results); 
            if(!bcrypt.compareSync(body.contraseña, results[0].contraseña)){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas',
                    errors: error
                });
            }
            //crear un token 
            let SEED= 'esta-es-una-semilla';
            let token= jwt.sign({usuario: results[0].contraseña},SEED,{expiresIn:14400});
            res.status(200).json({
                ok: true,
                email: results,
                id:results[0].id,
                token: token
            });        
    });
});