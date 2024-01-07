const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Biblioteca').then(() => console.log('Connected!'));

mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado de MongoDB');
});


const LibroSchema =  new mongoose.Schema({
    titulo: String,
    autor: String
},{collection:'libros'});

const Libro = mongoose.model('Libro',LibroSchema,'Libro');

module.exports = Libro;