const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro');

const {requiredScopes} = require('express-oauth2-jwt-bearer');

router.get('/',requiredScopes("read:libros"),async (req,res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (err) {
        res.status(500).json({error:'Error al obtener los libros'})
    }
});

router.post('/',requiredScopes("write:libros"),async (req,res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (err) {
        res.status(500).json({error:'Error al crear el Libro'})
    }
});

router.put('/:id',requiredScopes("write:libros"),async (req, res) => {
        try {
              const Libro =  await Libro.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true}
                );
            res.json(Libro);

        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar el Libro' });
        }
    });

router.delete('/:id',requiredScopes("write:libros"),async (req, res) =>{
    try {
        await Libro.findByIdUpdate(req.params.id);
        res.json({menssage:'Libro eliminado correctamente'})
    } catch (err) {
      res.status(500).json({error:'Error al eliminar el Libro'})  
    }
});


module.exports = router;

