const mysql = require('mysql');
//conf conexion
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'matias.chavez1501',
    password:'shH29FeMc4hf',
    database: 'matias.chavez1501',
});

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
/**listar todos los productos GET */
exports.detallePedido= function(req,res){
    mc.query('select p.id,p.nombre,p.precio,p.descripcion,p.categoria,p.imagen,p.cantidad_personas, p.tiempo_produccion from producto as p,pedido,detalle_pedido where p.id=detalle_pedido.id_producto and detalle_pedido.id_pedido=pedido.id and pedido.id= ?', function(error,  results, fields ){
        if(error) throw error;
        return res.send({error: false, data: results, message:'Lista de pedidos.'})
    })
}

exports.listarPedido= function(req,res){
    mc.query('SELECT * FROM pedido', function(error,  results, fields ){
        if(error) throw error;
        return res.send({error: false, data: results, message:'Lista de pedidos.'})
    })
}

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
                throw error;
            }
            return res.status(200).json({
                Mensaje: "Lista de pedidos por estado "+ estado+".",
                result: results,
            })
        })
    }
}
