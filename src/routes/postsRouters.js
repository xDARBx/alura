import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, agregarNuevoPost, uploadImagen, actualizarNuevoPost } from "../controllers/postsController.js";

// **Importar módulos necesarios:**
// - `express`: Framework para crear aplicaciones web.
// - `multer`: Middleware para manejar la carga de archivos.
// - `listarPosts`, `agregarNuevoPost`, `uploadImagen`: Funciones del controlador de posts para listar, crear y subir imágenes a los posts.

// **Configurar multer para almacenar archivos:**
// - `multer.diskStorage`: Especifica las opciones de almacenamiento para los archivos subidos.
//   - `destination`: Define el directorio donde se guardarán los archivos (`uploads/`).
//   - `filename`: Determina el nombre de archivo para cada archivo subido (utilizando el nombre original).
const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Indicar la ruta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usar el nombre original del archivo
    }
});

// **Crear una instancia de middleware multer:**
// - `multer({ dest: "./uploads" , storage })`: Inicializa multer con la configuración de almacenamiento especificada.
const upload = multer({ dest: "./uploads" , storage });

//Para Linux o Ios solo necesitamos la línea
//const upload = multer({ dest: "./uploads"})

const routes = (app) => { 
    // Permite a Express analizar el cuerpo de las solicitudes entrantes en formato JSON
    app.use(express.json());
    app.use(cors(corsOption))
    // Ruta para obtener todos los posts
    app.get("/posts", listarPosts);
    // Ruta para crar un post
    app.post("/posts",agregarNuevoPost);
    //multer - middleware
    app.post("/upload", upload.single("imagen"), uploadImagen);
    app.put("/upload/:id", actualizarNuevoPost )

};

export default routes;