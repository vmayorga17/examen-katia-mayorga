// Desarrollo web 3 - Examen de medio semestre - 202520
const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Examen No. 1',
        materia: 'Desarrollo web 3',
        examen: 'Examen de medio semestre.'
    });
});

/*vistas*/
router.get('/addUser', UsersCtrl.renderAddUser);
router.get('/changeUser', UsersCtrl.renderChangeUser);

/* acciones create y etc*/
router.post('/users/create', UsersCtrl.createUser);
router.get('/users/search', UsersCtrl.searchUser);
router.post('/users/update/:userId', UsersCtrl.updateUser);


module.exports = router;