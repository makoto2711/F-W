const controller = {}

controller.list = (req, res) => 
{
    req.getConnection(  (err, conn) => 
    {
        conn.query("SELECT * FROM tbl_persona", (err, staffs) => 
        {
            if (err)  res.json(err);
            
            res.render("staff" , {  // customers.ejs
                data: staffs
            });

        });
    });
}

controller.list2 = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM tbl_persona", (err, staffs) => {
            if (err) res.json(err);

            res.render("listar", {  // customers.ejs
                data: staffs
            });

        });
    });
}


controller.showItem = (req, res) => 
{
    const {id} = req.params

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM tbl_persona WHERE id=?", [id], (err, staff) => {
            if (err) res.json(err);
            res.render("ver", {  // customers.ejs
                data: staff[0] // permite gestionar la vista customer_edit
                // envia el objeto data a la vista para que sea manipulado en la vista
                // customer[0] contiene el primer valor y unico valor, que retonar el query
            });

        });
    });
}


controller.add = (req, res) => 
{
    const data = req.body  // informacion que viene del formulario
    req.getConnection((err, conn) => {
        conn.query("INSERT INTO tbl_persona set ?", [data], (err, customer) => // customer es el nombre de la tabla
        {
            res.redirect("/") // si no hay error en la insercion , llamamos nuevamente al list
            // si no funciona a la primera, reiniciar el servidor de NODE
        });
    });
}

controller.delete = (req, res) => {
    const { id } = req.params  // extraemos el id que viene desde la URL 
    req.getConnection((err, conn) => {
        conn.query("DELETE FROM tbl_persona WHERE id = ?", [id], (err, customer) => {
            res.redirect("/listar") // si no hay error en la consulta , llama nuevamente a listar  /
        });
    });
}




controller.update = (req, res) => {
    const { id } = req.params
    const data = req.body

    req.getConnection((err, conn) => {
        conn.query("UPDATE tbl_persona set ? WHERE id = ?", [data, id], (err, customer) => {
            res.redirect("/listar")
        });
    });
}


controller.showItem2 = (req, res) => {
    const { id } = req.params

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM tbl_persona WHERE id=?", [id], (err, staff) => {
            if (err) res.json(err);
            res.render("update", {  // customers.ejs
                data: staff[0] // permite gestionar la vista customer_edit
                // envia el objeto data a la vista para que sea manipulado en la vista
                // customer[0] contiene el primer valor y unico valor, que retonar el query
            });

        });
    });
}
 

module.exports = controller