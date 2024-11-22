import { MongoClient } from 'mongodb';

export default async function conectarAlBanco(stringConexion) {
  let mongoClient;

  try {
      mongoClient = new MongoClient(stringConexion);
      console.log('Conectando al cluster del banco de datos...');
      await mongoClient.connect();
      console.log('Conectado a MongoDB Atlas!');

      return mongoClient;
  } catch (erro) {
      console.error('Falla la conexión con el banco de datos!', erro);
      process.exit();
  }
}