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
/*
id int(11) primary key auto_increment,
                              modo_entrega text NOT NULL,
                              fecha_inicio date not null,
                              fecha_entrega date  NOT NULL,
                              fecha_pago date NOT NULL,
                              valor_total int(11)  NOT NULL,
                              metodo_pago text not null,
                              direccion varchar(200) NOT NULL,
                              estado varchar(150) NOT NULL */ 
/*Crear pedido */
exports.crearPedido=function(req,res){
    let datosPedido = {  
        modo_entrega: req.body.modo_entrega,
        fecha_inicio: req.body.fecha_inicio,
        fecha_entrega: req.body.fecha_entrega,
        fecha_pago: req.body.fecha_pago,
        valor_total: req.body.valor_total,
        metodo_pago: req.body.metodo_pago,
        direccion: req.body.direccion,
        estado: req.body.estado
    };

    if(mc){
        mc.query("INSERT INTO pedido SET ?",datosPedido,function (error,result){
            
            if(error){
                res.status(500).json({
                    Mensaje:"Error",
                    error: error
            })
            }
            else{
                res.status(201).json({
                    mensaje:"Pedido Insertado",
                    datos: result
                })
            }
        });
    }
};

/**listar todos los pedidos */
exports.listarPedido= function(req,res){
    mc.query('SELECT * FROM pedido', function(error,  results, fields ){
        if(error) throw error;
        return res.send({error: false, data: results, message:'Lista de pedido.'})
    })
}

/**listar todos los pedidos */
/**listar por estado */
exports.listarPedidoPorEstado = function(req,res){
    let estado=req.params.estado;
    if(mc){
        mc.query("SELECT * FROM pedido WHERE estado = ?", estado, function(error,result){
            if(error){
                console.log(error);
                return res.status(500).json({
                    Mensaje: "Error"
                });
            }else{
                return res.status(200).json({
                    Mensaje: "Lista de pedidos por estado "+ estado+".",
                    data: result
                })
            }
        })
    }
}

