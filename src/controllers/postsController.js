import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js"
import {getTodosPosts, crearPost, actualizarPost} from "../models/postsModel.js";


export async function listarPosts(req, res) {
    // Llamamos a la función para obtener todos los posts
    const posts = await getTodosPosts();
    // Enviamos una respuesta HTTP con código de estado 200 (OK) y los posts en formato JSON
    res.status(200).json(posts);
}

export async function agregarNuevoPost(req, res) {
    // Esta función se encarga de agregar un nuevo post a la base de datos.
    // Recibe los datos del nuevo post en el cuerpo de la solicitud (req.body).
  
    const nuevoPost = req.body;
  
    // Intentar crear el post.
    try {
      const postCreado = await crearPost(nuevoPost); // Llama a la función para crear el post en la base de datos
      res.status(200).json(postCreado); // Si se crea correctamente, devuelve un código de estado 200 y los datos del post creado.
    } catch (error) {
      // Si ocurre un error durante la creación del post, se captura y se muestra un mensaje de error.
      console.error(error.message);
      res.status(500).json({"Error":"Fallo al crear"});
    }
  }
  
  export async function uploadImagen(req, res) {
    // Esta función se encarga de subir una imagen y crear un nuevo post asociado a esa imagen.
  
    // Crear un objeto con los datos del nuevo post.
    const nuevoPost = {
      descripcion: "",
      imgUrl: req.file.originalname, // Obtener el nombre original del archivo subido
      alt: ""
    };
  
    // Intentar crear el post y renombrar la imagen.
    try {
      const postCreado = await crearPost(nuevoPost); // Crear el post en la base de datos
      const imagenActualizada = `uploads/${postCreado.insertedId}.png`; // Construir la nueva ruta de la imagen usando el ID del post creado
      fs.renameSync(req.file.path, imagenActualizada); // Renombrar el archivo subido a la nueva ruta
      res.status(200).json(postCreado); // Devolver un código de estado 200 y los datos del post creado.
    } catch (error) {
      // Si ocurre un error durante la creación del post o el renombrado de la imagen, se captura y se muestra un mensaje de error.
      console.error(error.message);
      res.status(500).json({"Error":"Fallo al crear"});
    }
  }

  export async function actualizarNuevoPost(req, res) {
   
  
    const id = req.params.id;
    const urlImagen = `https://localhost:3000/${id}.png`

    
  
    // Intentar crear el post.
    try {
      
      const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
      const descripcion = await gerarDescricaoComGemini(imgBuffer)

      const post = {
        imgUrl: urlImagen,
        descripcion: descripcion,
        alt: req.body.alt
      }

      const postCreado = await actualizarPost(id, post); // Llama a la función para crear el post en la base de datos
      res.status(200).json(postCreado); // Si se crea correctamente, devuelve un código de estado 200 y los datos del post creado.
    } catch (error) {
      // Si ocurre un error durante la creación del post, se captura y se muestra un mensaje de error.
      console.error(error.message);
      res.status(500).json({"Error":"Fallo al crear"});
    }
  }