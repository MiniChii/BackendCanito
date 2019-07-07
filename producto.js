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

/**listar todos los productos GET */
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

/*actualizar producto UPDATE*/
exports.actualizar= function(req,res){
    let id = req.params.id;
    let producto = {
        //id
        nombre: req.body.nombre,
        precio: parseInt(req.body.precio),
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        imagen: req.body.imagen,
        cantidad_personas: parseInt(req.body.cantidad_personas),
        tiempo_produccion: parseInt(req.body.tiempo_produccion)
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

/**borrar producto DELETE */
exports.borrar= function(req,res){
    let id = req.params.id;
    if(mc){
        mc.query("DELETE FROM producto WHERE id = ?",id,function(error,result){
            if(error){
                console.log(error);
                
                return res.status(500).json({"Mensaje" :"Error"});
            }else{
                return res.status(200).json({"Mensaje":"Registro con id = "+id+" Borrado"});
            }
        });
    }
};

/**Ver Producto GET */
exports.ver = function(req,res){
    let id=req.params.id;
    if(mc){
        mc.query("SELECT * FROM producto where id = ?",id, function(error,result){
            if(error){
                console.log(error);
                return res.status(500).json({
                    Mensaje: "Error"
                });
            }else{
                return res.status(200).json({
                    Mensaje: "Ver producto",
                    data: result

                });
            }
        })
    }
} 

/**listar por categoría */
exports.listarCategoria = function(req,res){
    let cat=req.params.cat;
    if(mc){
        mc.query("SELECT * FROM producto WHERE categoria = ?", cat, function(error,result){
            if(error){
                console.log(error);
                return res.status(500).json({
                    Mensaje: "Error"
                });
            }else{
                return res.status(200).json({
                    Mensaje: "Ver productos por categoría",
                    data: result
                })
            }
        })
    }
}

/**buscar producto por nombre */
exports.buscarPorNombre = function(req,res){
    let nombre=req.query.n;
    if(!nombre){
        nombre="";
    }
    //producto/search?n=mil
    if(mc){
        mc.query("SELECT * FROM producto WHERE nombre LIKE ?",nombre+"%",function (error, result) {
            if(error){
                console.log(error);
                return res.status(500).json({
                    MEnsaje: "Error"
                });    
            }else{
                return res.status(200).json({
                    Mensaje:"Listado de productos que coinciden con '"+ nombre+"'",
                    data:result
                })
            }
        });
    }
    
    
}