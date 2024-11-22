import express from "express";
import routes from "./src/routes/postsRouters.js";




// const posts = [
//     {
//         id: 1, descripción: "foto",
//         imagen: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 2, descripción: "video",
//         imagen: "https://placecats.com/millie/300/150"
//     },
//     {
//         id: 3, descripción: "video",
//         imagen: "https://placecats.com/millie/300/150"
//     },
// ];


const app = express();
app.use(express.static("uploads"))
routes(app)


// Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola cuando esté listo
app.listen(3000, () => {
    console.log("Servidor escuchando...");
});





// function buscarPostPorID(id){
//     return posts.findIndex((post) =>{
//         return post.id === Number(id)
//     })
// };

// app.get("/posts/:id", (req, res) => {
//     const index = buscarPostPorID(req.params.id)
//     res.status(200).json(posts[index]);
// });
