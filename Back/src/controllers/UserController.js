const User = require('./../models/User.js');

const UserController = {}

// Ver Users
UserController.verUsers = async (req, res) => {
    try {
        const listaUsers = await User.findAll();

        return res.json(listaUsers);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}

// Ver User
UserController.verUser = async (req, res) => {
    try {
        const { id } = req.params;

        const UserEncontrado = await User.findByPk(id);

        if (UserEncontrado) {
            return res.json(UserEncontrado);
        } else {
            return res.status(500).json({
                error: 'Usuario no existe.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error en la búsqueda del usuario.',
            error: error
        });
    }
}

// Crear User
UserController.crearUser = async (req, res) => {
    try {
        const { nombres, apellidos } = req.body;

        const nuevoUser = await User.create({
            nombres: nombres,
            apellidos: apellidos,
        });

        if (nuevoUser) {
            return res.json({ mensaje: 'Usuario agregado.' });
        } else {
            return res.status(500).json({
                error: 'Imposible agregar usuario.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}

// Editar User
UserController.editarUser = async (req, res) => {
    try {
        const { id, nombres, apellidos } = req.body;

        if (!id || !nombres || !apellidos) {
            return res.status(500).json({
                error: 'Faltan campos.'
            });
        }

        const UserEditado = await User.update(
            {
                nombres: nombres,
                apellidos: apellidos,
            }, {
                where: {
                    id: id,
                }
            }
        );

        if (UserEditado) {
            return res.json({ mensaje: 'Usuario modificado.' });
        } else {
            return res.status(500).json({
                error: 'Imposible editar.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}

// Eliminar User
UserController.eliminarUser = async (req, res) => {
    try {
        console.log(req.body)
        const { id } = req.body;

        const eliminado = await User.destroy({ where: { id: id } });

        if (eliminado) {
            return res.json({ mensaje: 'Usuario eliminado.' });
        } else {
            return res.status(500).json({
                mensaje: 'No se pudo eliminar el User.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}

module.exports = UserController;
