// este archivo contiene las rutas y como se procesaran dentro del controlador
// cada ruta es una peticion que llega a traves de la url

const { Router } = require("express")
const express = require("express")
const router = express.Router()
express.Router()

// el destino de cada ruta sera una funcion del controlador

const staffController = require("../controllers/staffController")

router.get("/", staffController.list) // cuando se solicite un listar, se ejecutara esta funcion del controlador
router.get("/ver/:id", staffController.showItem)
router.post("/add", staffController.add)
router.get("/delete/:id", staffController.delete)
router.get("/listar", staffController.list2)

router.get("/update/:id", staffController.showItem2)
router.post("/update/:id", staffController.update)


module.exports = router