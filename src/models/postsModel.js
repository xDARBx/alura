import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAlBanco from "../config/dbconfig.js";

// Establecemos la conexión a la base de datos MongoDB utilizando la cadena de conexión proporcionada en la variable de entorno STRING_CONEXION
const conexion = await conectarAlBanco(process.env.STRING_CONEXION);

// Función asíncrona para obtener todos los posts de la colección "posts" en la base de datos "instadan"
export async function getTodosPosts() {
    // Obtenemos una referencia a la base de datos "instadan"
    const db = conexion.db("instadan");
    // Obtenemos una referencia a la colección "posts"
    const coleccion = db.collection("posts");
    // Ejecutamos la operación de búsqueda en la colección y retornamos los resultados como un array
    return coleccion.find().toArray();
}
export async function crearPost(nuevoPost) {
    const db = conexion.db("instadan");
    const coleccion = db.collection("posts");
    return coleccion.insertOne(nuevoPost);
    
}

export async function actualizarPost(id, nuevoPost) {
    const db = conexion.db("instadan");
    const coleccion = db.collection("posts");
    const objId = ObjectId.createFromHexString(id)
    return coleccion.updateOne({_id: new ObjectId(objId)}, {$set:nuevoPost});
    
}