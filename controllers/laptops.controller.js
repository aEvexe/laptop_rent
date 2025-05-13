const db = require('../config/db');
const laptopValidation = require('../validation/laptops.validate')
const querryGenerate = require('../helpers/querry_genrate');


const getAll = (req, res) => {
    db.query(`SELECT * FROM laptops`, (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: result})
    })
}

const create = (req, res) => {
    const { error, value } = laptopValidation(req.body) 
        if(error) {
            console.log(`Error crating new laptops`, error);
        }
    const {model, brand_id, category_id, price} = value
    const sql = `INSERT INTO laptops(model, brand_id, category_id, price) VALUES (?,?,?,?)`;

    db.query(sql, [model, brand_id, category_id, price], (err, result) => {
        if (err) {
          console.log(`Error crating new laptops`, err);
          return res.status(500).send({ message: "An error" });
      }
          console.log(result);
          res.status(200).send({data: result});
    })
}

const getById = (req, res) => {
    db.query(`SELECT * FROM laptops WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
    const { error, value } = laptopValidation(req.body) 
        if(error) {
           console.log(`Error crating new laptops`, error);
        }
    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE laptops SET model=?, brand_id=?, category_id=?, price=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "laptops updated succesfully"}, result)
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM laptops WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "laptops deleted succesfully"})
   })
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}