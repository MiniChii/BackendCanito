const mysql = require('mysql');
//conf conexion
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'canito',
});
//conectar
mc.connect();
/* ---- Ipedido
    nombre:string,
    rut:string,
    telefono:string,
    direccion: string,
    mail:string,
    modo_entrega: string,
    fecha_inicio: Date,
    fecha_entrega: Date,
    fecha_pago: Date,
    valor_total: number,
    metodo_pago: string,
    estado: string

}

/** Crear pedido */
exports.crear = function(req,res){
    let datosPedido = {
        //id
        nombre: req.body.nombre,
        rut: req.body.rut,
        telefono:parseInt(req.body.telefono),
        direccion: req.body.direccion,
        mail:req.body.mail,
        modo_entrega: req.body.modo_entrega,
        fecha_inicio: req.body.fecha_inicio,
        fecha_entrega: req.body.fecha_entrega,
        fecha_pago: req.body.fecha_pago,
        valor_total: parseInt(req.body.valor_total),
        metodo_pago: req.body.metodo_pago,
        estado: req.body.estado
    };

    if(mc){
        mc.query("INSERT INTO pedido SET ?",datosPedido,function (error,result){
            
            if(error){
                console.log(error);
                res.status(500).json({
                    Mensaje:"Error",
                    error: error
                })
            }
            else{
                res.status(201).json({
                    mensaje:"Pedido Agregado",
                    datos: result
                })
            }
        });
    }
};
/**Ver pedido según el id */
exports.ver = function(req,res){
    let id=req.params.id;
    if(mc){
        mc.query("SELECT * FROM pedido WHERE id = ?", id, function (error,results) {
            if(error){
                console.log(error);
                return res.status(500).json({
                    Mensaje: "Error"
                });
            }else{
                return res.status(200).json({
                    Mensaje: "Ver Pedido",
                    data: results
                });
            }  
        })
    }
}
/**actualizar pedido */
exports.actualizar= function(req,res){
    let id = req.params.id;
    let datosPedido = {
        //id
        nombre: req.body.nombre,
        rut: req.body.rut,
        telefono:parseInt(req.body.telefono),
        direccion: req.body.direccion,
        mail:req.body.mail,
        modo_entrega: req.body.modo_entrega,
        fecha_inicio: req.body.fecha_inicio,
        fecha_entrega: req.body.fecha_entrega,
        fecha_pago: req.body.fecha_pago,
        valor_total: parseInt(req.body.valor_total),
        metodo_pago: req.body.metodo_pago,
        estado: req.body.estado
    
    };

    console.log(datosPedido);
    
    if(!id || !datosPedido){
        return res.status(400).send({error: datosPedido, message:'Debe proveer un id y los datos del pedido'});
    }
    mc.query("UPDATE pedido SET ? WHERE Id = ?", [datosPedido,id], function(error,results,fields){
        if(error){ 
            console.log(error);
            throw error;
        }
        return res.status(200).json({
            Mensaje:"Registro ha sido actualizado",
            result: results,
        })
    })
};