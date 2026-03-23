const mongoose = require('mongoose'); // incorporar mongoose al proyecto
require('./esquema_users'); // incorporar el esquema de usuarios

// escuchar el evento SIGINT de Windows
const readLine = require('readline');
if (process.platform === "win32") {
    console.log('Platform: ', process.platform);
    const rl = readLine.Interface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// conectar a la base de datos MongoDB
let dbURI = 'mongodb://localhost/dw3-202520'; // cadena de conexión 
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI; // cadena de conexión de Heroku
}
mongoose.connect(dbURI, { 
    family: 4, // usar IPv4, evitar problemas con IPv6
    serverSelectionTimeoutMS: 5000  // tiempo de espera para la conexión
}) // conectar a la base de datos
  .catch(err => console.error('Error de conexión a la base de datos MongoDB:', err.reason));   

// función para cerrar la conexión a la base de datos
const procShutdown = (msg) => {
    console.log('Mongoose desconectado por: ' + msg);
    mongoose.connection.close(() => {
        process.exit(0);
    });
};

// mensaje de eventos de conexión
mongoose.connection.on('connected', () => {
    console.log('Mongoose conectado a ' + dbURI);
}); 

mongoose.connection.on('error', err => {
    console.log('Mongoose error de conexión: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose desconectado');
});

//Señales de cierre de la aplicación
// Windows: SIGINT
// nodemon: SIGUSR2
// Heroku:  SIGTERM

// cerrar la conexión en Windows
process.on('SIGINT', () => {
    procShutdown('aplicación terminada (Windows: Ctrl+C)');
    process.exit(0);
});

// cerrar la conexión con nodemon
process.once('SIGUSR2', () => {
    procShutdown('aplicación reiniciada (nodemon)');
    process.kill(process.pid, 'SIGUSR2');
});

// cerrar la conexión en Heroku
process.on('SIGTERM', () => {
    procShutdown('aplicación reiniciada (Heroku)');
    process.exit(0);
});

// Conexiones a múltiples bases de datos - conexión nombrada
// const dbURIlog = 'mongodb://localhost/dw3-202520-logs'; // cadena de conexión 
// const dbLog = mongoose.createConnection(dbURIlog, { 
//     family: 4, // usar IPv4, evitar problemas con IPv6
//     serverSelectionTimeoutMS: 5000  // tiempo de espera para la conexión
// }); // conectar a la base de datos - conexión nombrada

// // mensajes de eventos de conexión/desconexión - conexión nombrada
// dbLog.on('connected', () => {
//     console.log('Mongoose conectado a ' + dbURIlog);
// }); 

// dbLog.on('error', err => {
//     console.log('Mongoose error de conexión: ' + err);
// });

// dbLog.on('disconnected', () => {
//     console.log('Mongoose desconectado de ' + dbURIlog);
// });
