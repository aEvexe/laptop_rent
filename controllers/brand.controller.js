const db = require('../config/db');
const brandValidation = require('../validation/brand.validate');
const querryGenerate = require('../helpers/querry_genrate');


const getAll = (req, res) => {
    db.query(`SELECT * FROM brand`, (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: result})
    })
}

const create = (req, res) => {
    const { error, value } = brandValidation(req.body) 
        if(error) {
            console.log(`Error crating new brand`, error);
        }

    const {name} = value
    const sql = `INSERT INTO brand(name) VALUES (?)`;

    db.query(sql, [name], (err, result) => {
        if (err) {
          console.log(`Error crating new brand`, err);
          return res.status(500).send({ message: "An error" });
      }
          console.log(result);
          res.status(200).send({data: result});
    })
}

const getById = (req, res) => {
    db.query(`SELECT * FROM brand WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
    const { error, value } = brandValidation(req.body) 
        if(error) {
            console.log(`Error crating new brand`, error);
        }

    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE brand SET name=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "Brand updated succesfully"}, result)
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM brand WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "Brand deleted succesfully"})
   })
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}