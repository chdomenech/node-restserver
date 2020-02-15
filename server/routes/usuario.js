const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuarios');
const app = express();

/**
 * Metodo que pagina la busqueda de usuarios
 */
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuanto: conteo
                });

            });

        });
});

/**
 * Guarda un usuario
 */
app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

})

/**
 * Actualiza un usuario
 */
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    //La funcion pick de la libreria undescore permite solo tomar del body los parametros que
    //quiero actualizar del body. Underscore es una libreria que extiende la funcionalidad de JS
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})

/**
 * Borra un usuario fisicamente
 */
/*app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});*/

/**
 * Borra un usuario logicamente
 */
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['estado']);

    /**
     * El parametro { new: true } permite retornar el nuevo objeto
     * modificado
     */
    Usuario.findByIdAndUpdate(id, body, { new: true, useFindAndModify: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        }

        //if (usuarioDB.estado === 'false') {
        res.json({
                ok: true,
                message: 'Usuario eliminado logicamente',
                usuario: usuarioDB
            })
            //}
    });
});

module.exports = app;