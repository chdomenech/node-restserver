const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuarios");
const app = express();

app.post("/login", (req, resp) => {
  let body = req.body;

  Usuario.findOne(
    { email: body.email },
    "nombre email role estado google img password"
  ).exec((err, usuario) => {
    if (err) {
      return resp.status(500).json({
        ok: false,
        err,
      });
    }

    if (!usuario) {
      return resp.status(400).json({
        ok: false,
        err: {
          message: "(Usuario) o password incorrectos",
        },
      });
    }
    if (!bcrypt.compareSync(body.password, usuario.password)) {
      return resp.status(400).json({
        ok: false,
        err: {
          message: "Usuario o (password) incorrectos",
        },
      });
    }
    let token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        usuario,
      },
      process.env.SEED
    );

    resp.json({
      ok: true,
      usuario,
      token,
    });
  });
});

module.exports = app;
