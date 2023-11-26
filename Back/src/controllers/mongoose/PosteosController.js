const postModel = require('./../../models/mongoose/PostModel.js');

const { verificarToken } = require('./../../utils/token.js');

const postController = {}

// Ver publicaciones
postController.verPosteos = async (req, res) => {
    try {
        const listaPosteos = await postModel.find() //.populate('usuario');
        
        return res.json(listaPosteos);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno',
            error: error
        });
    }
}

// Ver publicación
postController.verPosteo = async (req, res) => {
    try {
        const { id } = req.params;

        const posteoEncontrado = await postModel.findById(id);
        
        return res.json(posteoEncontrado);
    } catch (error) {
        let mensaje = 'Ocurrió un error interno al intentar obtener la publicación';

        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener la publicación';
        }

        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}

// Crear publicación
postController.crearPosteo = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        const { token } = req.headers;

        const tokenValido = verificarToken(token);

        if (!tokenValido) {
            return res.status(500).json({
                mensaje: 'El token no es válido',
                error: error
            });
        }

        const autor = tokenValido.id;

        const nuevoPosteo = new postModel({
            titulo: titulo,
            descripcion: descripcion,
            autor: autor,
        });

        await nuevoPosteo.save();

        return res.json({ mensaje: 'Publicación creada con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar crear la publicación',
            error: error
        });
    }
}

// Editar publicación
postController.editarPosteo = async (req, res) => {
    try {
        const { id, titulo, descripcion, autor } = req.body;

        // Validar el autor...

        await postModel.findByIdAndUpdate(
            id,
            { titulo: titulo, descripcion: descripcion }
        );

        return res.json({ mensaje: 'Publicación actualizada con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar la publicación',
            error: error
        });
    }
}

// Eliminar publicación
postController.eliminarPosteo = async (req, res) => {
    try {
        const { id } = req.body;

        await postModel.findByIdAndDelete(id);

        return res.json({ mensaje: 'Publicación eliminada con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar la publicación',
            error: error
        });
    }
}

module.exports = postController;
