const db = require('../config/db');
const customerValidation = require('../validation/customers.validate')
const querryGenerate = require('../helpers/querry_genrate');


const getAll = (req, res) => {
    db.query(`SELECT * FROM customers`, (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: result})
    })
}

const create = (req, res) => {
    const { error, value } = customerValidation(req.body) 
        if(error) {
            console.log(`Error crating new xustomer`, error);
        }
    const {first_name, last_name, email, phone, address, passport} = value
    const sql = `INSERT INTO customers(first_name, last_name, email, phone, address, passport) VALUES (?,?,?,?,?,?)`;

    db.query(sql, [first_name, last_name, email, phone, address, passport], (err, result) => {
        if (err) {
          console.log(`Error crating new cutomer`, err);
          return res.status(500).send({ message: "An error" });
      }
          console.log(result);
          res.status(200).send({data: result});
    })
}

const getById = (req, res) => {
    db.query(`SELECT * FROM customers WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
    const { error, value } = customerValidation(req.body) 
        if(error) {
            console.log(`Error crating new customer`, error);
        }
    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE customers SET first_name=?, last_name=?, email=?, phone=?, address=?, passport=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "customer updated succesfully"}, result)
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM customers WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "customer deleted succesfully"})
   })
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}