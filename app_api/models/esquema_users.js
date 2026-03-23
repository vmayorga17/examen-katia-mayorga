const mongoose = require('mongoose'); // incorporar mongoose al proyecto

const usersSchema = new mongoose.Schema({ // definir el esquema de usuarios
    nombre: {
        type: String, 
        required: true
    },
    apellido: { 
        type: String, 
        required: true
    },
    identificacion: {
        type: Number, 
        required: true
    },
    direccion: {
        type: String, 
        required: false
    },
    telefono: {
        type: Number, 
        'default': 9999999999
    },
    edad: {
        type: Number, 
        default: 1,
        min: 1,
        max: 120   
    },
    materias: {
        tipo: {
            type: String, 
            enum: ['Presencial','Virtual']
        },
        nombres: [String]
    },
    creado: { 
        type: Date, 
        default: Date.now 
    }
});

const Users = mongoose.model('user', usersSchema); // compilo el esquema en un el modelo de usuarios

const user = new Users({ // creo un usuario de ejemplo
    nombre: 'Naty',
    apellido: 'Barriga',
    identificacion: 1111,
    direccion: 'Quito',            
    telefono: 987654321,           
    edad: 26,       
    materias: {
        tipo: 'Presencial', 
        nombres: ['Desarrollo web 3', 'Estrategias de posicionamiento web', 'Taller de investigación'] 
    }
});

//user.save() // guardo el usuario en la base de datos

