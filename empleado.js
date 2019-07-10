const mysql = require('mysql');
//conf conexion
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'canito',
});
//conectar
mc.connect();

exports.crearEmpleado = function (req, res) {
    let datosEmpleado = {
       user: req.body.user,
       password: req.body.password,
       rol: req.body.rol

    };

    if (mc) {
        console.log(datosEmpleado);
        mc.query("INSERT INTO empleado SET ?", datosEmpleado, function (error, result) {

            if (error) {
                res.status(500).json({
                    Mensaje: "Error",
                    error: error
                })
            }
            else {
                res.status(201).json({
                    mensaje: "Empleado Insertado",
                    datos: result
                })
            }
        });
    }
};
app.post('/login', (req, res)=>{
    var body = req.body;
    mc.query("SELECT * FROM empleado WHERE email = ?", body.email, function(error, results, fields){
        if(error){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: error
            });
        }
        if(!results.length){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: error
            });
        }
            console.log(results); 
            if(!bcrypt.compareSync(body.password, results[0].userPassword)){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - password',
                    errors: error
                });
            }
            // Crear un token!
            let SEED ='esta-es-una-semilla';
            let token = jwt.sign({ usuario: results[0].userPassword}, SEED, { expiresIn:14400});

            res.status(200).json({
                ok: true,
                usuario: results,
                id:results[0].userId,
                token: token
            });        
    });
});
