const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

const renderAddUser = (req, res) => {
    res.render('addUser', {
        title: 'Añadir Usuarios'
    });
};

const renderChangeUser = (req, res) => {
    res.render('changeUser', {
        title: 'Modificar Usuarios',
        usuario: null
    });
};

const createUser = (req, res) => {
    const path = '/api/users';
    const postData = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        edad: req.body.edad,
        tipo: req.body.tipo,
        nombres: req.body.nombres
    };

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postData
    };

    request(requestOptions, (err, response, body) => {
        if (err) {
            return res.render('error', {
                message: 'Error al crear usuario',
                error: err
            });
        }

        if (response.statusCode === 201) {
            return res.redirect('/addUser');
        }

        res.render('error', {
            message: 'No se pudo crear el usuario',
            error: body
        });
    });
};

const searchUser = (req, res) => {
    const identificacionBuscada = req.query.identificacion;
    const path = '/api/search/' + identificacionBuscada;

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (err, response, body) => {
        if (err) {
            return res.render('error', {
                message: 'Error al buscar usuario',
                error: err
            });
        }

        if (response.statusCode === 200 && body.length > 0) {
            return res.render('changeUser', {
                title: 'Modificar Usuarios',
                usuario: body[0]
            });
        }

        res.render('changeUser', {
            title: 'Modificar Usuarios',
            usuario: null
        });
    });
};

const updateUser = (req, res) => {
    const userId = req.params.userId;
    const path = '/api/users/' + userId;

    const putData = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        identificacion: req.body.identificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        edad: req.body.edad,
        tipo: req.body.tipo,
        nombres: req.body.nombres
    };

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'PUT',
        json: putData
    };

    request(requestOptions, (err, response, body) => {
        if (err) {
            return res.render('error', {
                message: 'Error al actualizar usuario',
                error: err
            });
        }

        if (response.statusCode === 200) {
            return res.redirect('/changeUser');
        }

        res.render('error', {
            message: 'No se pudo actualizar el usuario',
            error: body
        });
    });
};

module.exports = {
    renderAddUser,
    renderChangeUser,
    createUser,
    searchUser,
    updateUser
};