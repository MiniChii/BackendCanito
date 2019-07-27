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

exports.crear = function(req,res){
    
    let detalle = {
        id_pedido:parseInt(req.body.id_pedido),
        id_producto:parseInt(req.body.id_producto),
        cantidad_producto:parseInt(req.body.cantidad_producto)
    }
    console.log( detalle);
    if(mc){
        mc.query("INSERT INTO detalle_pedido SET ?",detalle,function (error,result){
            
            if(error){
                console.log(error);
                res.status(500).json({
                    Mensaje:"Error",
                    error: error
                })
            }
            else{
                res.status(201).json({
                    mensaje:"Detalle agregado",
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