//ingreso al CRUD
// y contiene la configuracion general del sistema
const express = require("express")
const path = require("path")  // unir rutas de carpetas que usaremos ne las referencias
const app = express()
const mysql = require("mysql")
const miconexion = require("express-myconnection")
const morgan = require("morgan")

// Importacion del archivo de rutas, que serviran para atender las peticiones llegadas desde la URL
const customerRoutes = require("./routes/customer") // archivo que contiene la gestion de rutas

/* app.listen( 3000, ()=> 
{
    console.log("Servidor activo en el puerto 3000");
}) */

app.set("port", process.env.PORT || 3000) // asigna el puerto disponible

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"))
app.use(miconexion(mysql, {
    localhost: "localhost",
    user: "root",
    password: "",
    database: "smartor4_staff"
}, "single"));

app.use(express.urlencoded({ extended: false }))
// urlencoded permite hacer el match entre los atributos name
// del formulario y los nombres de campo de la tabla a consultar
// false: permite solo procesar los campos del formulario 

app.use("/", customerRoutes)

app.use(express.static(path.join(__dirname, "public")))


// Iniciamos el servidor

app.listen(app.get("port"), () => {
    console.log("Servidor activo y funcionando, puerto", app.get("port"));
});







