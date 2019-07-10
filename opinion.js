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

/**listar por id */
exports.listarOpinion = function (req, res) {
    if (mc) {
        mc.query("SELECT * FROM opinion", function (error, result) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    Mensaje: "Error"
                });
            } else {
                return res.status(200).json({
                    Mensaje: "Mostrando opinión",
                    data: result
                })
            }
        })
    }
}

/**Crear Opinion */
exports.crear = function (req, res) {
    let datosOpinion = {
        //id
        nombreUsuario: req.body.nombreUsuario,
        comentario: req.body.comentario
    };

    if (mc) {
        mc.query("INSERT INTO opinion SET ?", datosOpinion, function (error, result) {

            if (error) {
                res.status(500).json({
                    Mensaje: "Error",
                    error: error
                })
            }
            else {
                res.status(201).json({
                    mensaje: "Opinion Insertada",
                    datos: result
                })
            }
        });
    }
};