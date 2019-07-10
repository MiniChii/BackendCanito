const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
       password: bcrypt.hashSync(req.body.password, 10),
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
