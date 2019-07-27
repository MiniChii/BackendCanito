var bcrypt = require('bcrypt');
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

/*Crear cliente */
exports.crearCliente = function (req, res) {
    console.log("al inicio------");
    console.log(req.body);
    let datosCliente = {

        rut_cliente: req.body.rut_cliente,
        nombres: req.body.nombres,
        ap_paterno: req.body.ap_paterno,
        ap_materno: req.body.ap_materno,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),

    };

    if (mc) {
        console.log("en la conexion----");
        console.log(datosCliente);
        mc.query("INSERT INTO cliente SET ?", datosCliente, function (error, result) {

            if (error) {
                res.status(500).json({
                    Mensaje: "Error",
                    error: error
                })
            }
            else {
                res.status(201).json({
                    mensaje: "Cliente Insertado",
                    datos: result
                })

                /*para crear al usuario c: */
                let datosUsuario = {
                    user:datosCliente.email,
                    password:datosCliente.password,
                    rol:'Cliente'
                }
                mc.query("INSERT INTO login SET ?", datosUsuario, function (err,res) {
                    if(err){
                        res.status(500).json({
                            mensaje: "Error usuario",
                            error:err
                        })
                    }else{
                        res.status(201).json({
                            mensaje: "Usuario agregado",
                            datos: result
                        })
                    }

                    
                }) 

            }
        });
    }
};

/*actualizar cliente */
exports.actualizarCliente = function (req, res) {
    let id = req.params.id;
    let cliente = {
        //id
        nombre: req.body.nombre,
        rut: req.body.rut,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        email: req.body.email,
        contraseña: req.body.contraseña
    };

    console.log(cliente);

    if (!id || !cliente) {
        return res.status(400).send({ error: producto, message: 'Debe proveer un id y los datos de un cliente' });
    }
    mc.query("UPDATE cliente SET ? WHERE Id = ?", [cliente, id], function (error, results, fields) {
        if (error) {
            console.log(error);
            throw error;
        }
        return res.status(200).json({
            Mensaje: "Registro ha sido actualizado",
            result: results,
        })
    })
};

/*borrar cliente  */
exports.borrarCliente = function (req, res) {
    let id = req.params.id;
    if (mc) {
        mc.query("DELETE FROM cliente WHERE id = ?", id, function (error, result) {
            if (error) {
                console.log(error);

                return res.status(500).json({ "Mensaje": "Error" });
            } else {
                return res.status(200).json({ "Mensaje": "Registro con id = " + id + " Borrado" });
            }
        });
    }
};

exports.listarClientes = function (req, res) {
    mc.query('SELECT * FROM cliente', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Lista de clientes.' })
    });
}