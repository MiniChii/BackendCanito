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

/**listar todos los productos */
exports.listar= function(req,res){
    mc.query('SELECT * FROM producto', function(error,  results, fields ){
        if(error) throw error;
        return res.send({error: false, data: results, message:'Lista de productos.'})
    })
}

/**Crear Producto */
exports.crear=function(req,res){
    let datosProducto = {
        //id
        nombre: req.body.nombre,
        precio: parseInt(req.body.precio),
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        cantidad_personas: parseInt(req.body.cantidad_personas),
        tiempo_produccion: parseInt(req.body.tiempo_produccion)
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


};

/*actualizar producto*/
exports.actualizar= function(req,res){
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
};
