// Controladores para la REST API - colección users

// uso de mongoose y modelo compilado para acceder a la db
const mongoose = require('mongoose');
const users = mongoose.model('user'); // el modelo me permite interactuar con la colección users

// Controladores
// crear un nuevo usuario
const usersCreate = (req, res) => {
    users
        .create({ // req.body.xxx hace referencia al contenido que viene desde un formulario
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            identificacion: req.body.identificacion,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            edad: req.body.edad,
            materias: {
                tipo: req.body.tipo,
                nombres: req.body.nombres // ya viene en formato de arreglo desde la vista (formulario)
            },
            // carrera: req.body.carrera
    })
        .then((objetoUsuario) => { // create encontró el usuario y lo creó
            res
                .status(201)
                .json(objetoUsuario);
        })
        .catch((err) => { // create encontró un error
            res
                .status(500)
                .json(err);
            console.log('Error al crear el usuario');
        });
};

// obtener todos los usuarios
const usersList = (req, res) => {
    users
        .find()
        // método con filtros
        //.find({'nombre': 'Mateo'}) // find sin parámetros devuelve todos los documentos de la colección
        // select devuelve solo los campos indicados
        // .select('nombre apellido direccion') 
        .exec()
        .then((objetoUsuarios) => {
            if (!objetoUsuarios) { // find no encontró ningún usuario
                console.log('No se encontraron usuarios');
                res // no existen documentos en la colección users
                    .status(404)
                    .json({
                        "status": "error",
                        "message": "No se encontraron usuarios"
                    });
                return;
            } else  // find encontró usuarios
                res
                    .status(200)
                    .json(objetoUsuarios);
        })
        .catch((err) => { // find encontró un error
            res
                .status(500)
                .json(err);
            console.log('Error al listar los usuarios');
        });
};

// búsqueda de usuarios por ocurrencia/coincidencia especifica 
const usersFindName = (req, res) => {
    // creación de la expresión regular para la búsqueda de usuarios por ocurrencia
    const buscar = new RegExp(req.params.name, 'i'); // la i es para que no distinga entre mayúsculas y minúsculas
    users
        // búsqueda de usuarios por ocurrencia
        // .find({ 'nombre': buscar })

        // búsqueda de usuarios por coincidencia especifica
        .find({
            'identificacion': req.params.name
        })
        .exec()
        .then((objetoUsuarios) => {
            if (!objetoUsuarios) { // find no encontró ningún usuario
                console.log('No se encontraron usuarios');
                res // no existen documentos en la colección users
                    .status(404)
                    .json({
                        "status": "error",
                        "message": "No se encontraron usuarios"
                    });
                return;
            } else  // find encontró usuarios
                res
                    .status(200)
                    .json(objetoUsuarios);
        })
        .catch((err) => { // find encontró un error
            res
                .status(500)
                .json(err);
            console.log('Error al listar los usuarios');
        });
};

// leer un usuario específico
const usersRead = (req, res) => {
    users
        .findById(req.params.userId) // el userId se obtiene de la url, es un parámetro de la ruta
        .exec()
        .then((objetoUsuario) => {
            res
                .status(200)
                .json(objetoUsuario);
        })
        .catch((err) => { // findbyId encontró un error
            res
                .status(500)
                .json(err);
            console.log('Error al buscar el usuario con Id: ' + req.params.userId);
        });
    };

// actualizar un usuario específico
const usersUpdate = (req, res) => {
    users
        .findById(req.params.userId) // el userId se obtiene de la url, es un parámetro de la ruta
        .exec()
        .then((objetoUsuario) => {
            if (!objetoUsuario) { // findById no encontró ningún usuario
                console.log('No se encontró el usuario con Id: ' + req.params.userId);
                res // no existe un documento con ese Id en la colección users
                    .status(404)
                    .json({
                        "status": "error",
                        "message": "No se encontró el usuario con Id: " + req.params.userId
                    });
                return;
            } else { // findById encontró el usuario        
                // actualización de los campos del usuario
                objetoUsuario.nombre = req.body.nombre;
                objetoUsuario.apellido = req.body.apellido;
                objetoUsuario.identificacion = req.body.identificacion;
                objetoUsuario.direccion = req.body.direccion;
                objetoUsuario.telefono = req.body.telefono;
                objetoUsuario.edad = req.body.edad;
                objetoUsuario.materias.tipo = req.body.tipo;
                objetoUsuario.materias.nombres = req.body.nombres; // ya viene en formato de arreglo desde la vista (formulario)
                // objetoUsuario.carrera = req.body.carrera;    
                // guardado del usuario actualizado
                objetoUsuario
                    .save()
                    .then((users) => { // save encontró el usuario y lo actualizó
                        res
                            .status(200)
                            .json(users);
                    })
                    .catch((err) => { // save encontró un error
                        res
                            .status(500)
                            .json(err);
                        console.log('Error al actualizar el usuario con Id: ' + req.params.userId);
                    });
            }
        })
        .catch((err) => { // findById o save encontró un error
            res
                .status(500)
                .json(err);
            console.log('Error al actualizar el usuario con Id: ' + req.params.userId);
        });
};

// eliminar un usuario específico
const usersDelete = (req, res) => {
    users
        .findByIdAndDelete(req.params.userId) // el userId se obtiene de la url, es un parámetro de la ruta
        .exec()
        .then((objetoUsuario) => {
                if (!objetoUsuario) { // findByIdAndDelete no encontró ningún usuario con userId
                    console.log('No se encontró el usuario con Id: ' + req.params.userId);
                    res // no existe un documento con ese Id en la colección users
                        .status(404)
                        .json({
                            "status": "error",
                            "message": "No se encontró el usuario con Id: " + req.params.userId
                        });
                    return;
                } else // findByIdAndDelete encontró el usuario y lo eliminó
                    res
                        .status(204)
                        .json(null);
        })
        .catch((err) => { // findByIdAndDelete encontró un error
            res
                .status(500)
                .json(err);
            console.log('Error al eliminar el usuario con Id: ' + req.params.userId);
        });     
};

module.exports = {
    usersCreate,    // crear un nuevo usuario
    usersList,      // obtener todos los usuarios
    usersFindName,  // buscar un usuario por ocurrencia/coincidencia específica
    usersRead,      // leer un usuario específico
    usersUpdate,    // actualizar un usuario específico
    usersDelete     // eliminar un usuario específico 
};  