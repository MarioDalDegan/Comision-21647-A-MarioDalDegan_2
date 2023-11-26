const userRouter = require('express').Router();

const {
    verUsuarios,
    verUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
} = require('./../controllers/mongoose/UsuariosController.js');

// Ver usuarios
userRouter.get('/usuarios', verUsuarios);

// Ver usuario
userRouter.get('/usuario/:id', verUsuario);

// Crear usuario
userRouter.post('/usuario', crearUsuario);

// Editar usuario
userRouter.put('/usuario', editarUsuario);

// Eliminar usuario
userRouter.delete('/usuario', eliminarUsuario);

module.exports = userRouter;
