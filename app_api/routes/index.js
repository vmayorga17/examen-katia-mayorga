const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/users');

// definir las rutas para las acciones sobre la colección de users
router
    .route('/users')
    .post(ctrlMain.usersCreate) // crear un nuevo usuario
    .get(ctrlMain.usersList);   // obtener todos los usuarios

// definir las rutas para las acciones sobre un usuario

router
    .route('/users/:userId')
    .get(ctrlMain.usersRead)        // leer un usuario específico
    .put(ctrlMain.usersUpdate)      // actualizar un usuario específico
    .delete(ctrlMain.usersDelete);  // eliminar un usuario específico

router
    .route('/search/:name')
    .get(ctrlMain.usersFindName);

module.exports = router;