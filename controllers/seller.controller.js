const db = require('../config/db');
const sellerValidation = require('../validation/seller.validate')
const querryGenerate = require('../helpers/querry_genrate');


const getAll = (req, res) => {
    db.query(`SELECT * FROM seller`, (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: result})
    })
}

const create = (req, res) => {
    const { error, value } = sellerValidation(req.body) 
        if(error) {
            console.log(`Error crating new seller`, error);
        }
    const {name, email, password, created_at} = value
    const sql = `INSERT INTO seller(name, email, password,created_at) VALUES (?,?,?,?)`;

    db.query(sql, [name, email, password, created_at], (err, result) => {
        if (err) {
          console.log(`Error crating new seller`, err);
          return res.status(500).send({ message: "An error" });
      }
          console.log(result);
          res.status(200).send({data: result});
    })
}

const getById = (req, res) => {
    db.query(`SELECT * FROM seller WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
    const { error, value } = sellerValidation(req.body) 
        if(error) {
            console.log(`Error crating new seller`, error);
        }
    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE seller SET name=?, email=?, password=?, created_at=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "seller updated succesfully"}, result)
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM seller WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "seller deleted succesfully"})
   })
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}