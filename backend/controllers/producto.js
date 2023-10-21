const {response} = require('express')
const Producto = require('../models/producto')

const getProductos = async (req, resp = response) =>{
    try{

        const [producto] =  await Promise.all([
            Producto.find()
        ])
        
        resp.json({
            ok: true,
            producto
        })

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const postProductos = async (req, resp = response) => {
        try {
            const producto = new Producto(req.body)
            await producto.save()
              resp.json({
                ok: true,
                producto
            })
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
}

const putProductos = async( req, resp) => {
    const uid = req.params.id
    try {
    const ProductoDB = await Producto.findById(uid)

     // verificacion de que ya exista el producto
    if(!ProductoDB){
        return resp.status(400).json({
            ok:false,
            msg:'Este producto no existe'
        })
        }
    //Actualizaciones
    const producto = await Producto.findByIdAndUpdate(uid, req.body, {new: true})

        resp.json({
        ok:true,
        producto
        })  
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

const deleteProductos = async( req, resp) => {
    const uid = req.params.id
    try {
    const ProductoDB = await Producto.findById(uid)

     //Verificacion de que ya exista el producto
    if(!ProductoDB){
        return resp.status(400).json({
            ok:false,
            msg:'Este producto no existe'
        })
        }

    //Eliminación
    const producto = await Producto.findByIdAndDelete(uid)

        resp.json({
        ok:true,
        msg: 'Producto eliminado'
        })  
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:'false',
            msg:'Error inesperado... reivsar logs'
        })
    }
}

module.exports = {getProductos, postProductos, putProductos, deleteProductos}