const db = require('../config/db');
const featureValidation = require('../validation/feature.validate')
const querryGenerate = require('../helpers/querry_genrate');


const getAll = (req, res) => {
    db.query(`SELECT * FROM feature`, (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: result})
    })
}

const create = (req, res) => {
    const { error, value } = featureValidation(req.body) 
        if(error) {
            console.log(`Error crating new feature`, error);
        }
    const {name, isMain, value_type} = value
    const sql = `INSERT INTO feature(name, isMain, value_type) VALUES (?,?,?)`;

    db.query(sql, [name, isMain, value_type], (err, result) => {
        if (err) {
          console.log(`Error crating new feature`, err);
          return res.status(500).send({ message: "An error" });
      }
          console.log(result);
          res.status(200).send({data: result});
    })
}

const getById = (req, res) => {
    db.query(`SELECT * FROM feature WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
    const { error, value } = featureValidation(req.body) 
        if(error) {
            console.log(`Error crating new feature`, error);
        }

    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE feature SET name=?, isMain=?, value_type=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "feature updated succesfully"}, result)
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM feature WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "feature deleted succesfully"})
   })
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}