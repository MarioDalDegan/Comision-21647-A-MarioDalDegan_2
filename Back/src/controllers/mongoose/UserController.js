const UserModel = require('./../../models/mongoose/User.js');

const UserController = {}

// Ver usuarios
UserController.verUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await UserModel.find();
        
        return res.json(listaUsuarios);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}

// Ver usuario
UserController.verUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const userEncontrado = await UserModel.findById(id);
        
        return res.json(userEncontrado);
    } catch (error) {
        let mensaje = 'Error al obtener el usuario';

        if (error.kind === 'ObjectId') {
            mensaje = 'Usuario no existe.';
        }

        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}

// Crear usuario
UserController.crearUsuario = async (req, res) => {
    try {
        const { usuario, contrasenia, nombres, apellidos } = req.body;

        const nuevoUsuario = new UserModel({
            usuario: usuario,
            contrasenia: contrasenia,
            nombres: nombres,
            apellidos: apellidos,
        });

        await nuevoUsuario.save();

        return res.json({ mensaje: 'Usuario creado.' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al crear el usuario.',
            error: error
        });
    }
}

// Editar usuario
UserController.editarUsuario = async (req, res) => {
    try {
        const { id, nombres, apellidos } = req.body;

        await UserModel.findByIdAndUpdate(
            id,
            { nombres: nombres, apellidos: apellidos }
        );

        return res.json({ mensaje: 'Usuario modificado.' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al editar el usuario',
            error: error
        });
    }
}

// Eliminar usuario
UserController.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.body;

        await UserModel.findByIdAndDelete(id);

        return res.json({ mensaje: 'Usuario eliminado.' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al eliminar el usuario.',
            error: error
        });
    }
}

module.exports = UserController;
