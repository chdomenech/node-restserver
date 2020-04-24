const jwt = require("jsonwebtoken");
//
// Verificar Token
// El arguemento next continua con la ejecution del programa

//Esto es una opcion de exportar la funcion  modulo.exports.verificaToken = (req, res, next) => {
let verificaToken = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no válido",
        },
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

let verificaAdminRole = (req, res, next) => {
  let usuario = req.usuario;
  if (usuario.role != "ADMIN_ROLE") {
    return res.status(401).json({
      ok: false,
      err: {
        message: "Su rol no es admin",
      },
    });
  }
  next();
};

module.exports = {
  verificaToken,
  verificaAdminRole,
};
