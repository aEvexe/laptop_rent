const db = require('../config/db');
const paymentValidation = require('../validation/payment.validate')
const querryGenerate = require('../helpers/querry_genrate');

const getAll = (req, res) => {
    db.query(`SELECT * FROM payments`, (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: result})
    })
}

const create = (req, res) => {
     const { error, value } = paymentValidation(req.body) 
        if(error) {
            console.log(`Error crating new payment`, error);
        }
    const {contract_id, amount, payment_date} = value
    const sql = `INSERT INTO payments(contract_id, amount, payment_date) VALUES (?,?,?)`;

    db.query(sql, [contract_id, amount, payment_date], (err, result) => {
        if (err) {
          console.log(`Error crating new payments`, err);
          return res.status(500).send({ message: "An error" });
      }
          console.log(result);
          res.status(200).send({data: result});
    })
}

const getById = (req, res) => {
    db.query(`SELECT * FROM payments WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
     const { error, value } = paymentValidation(req.body) 
        if(error) {
            console.log(`Error crating new payment`, error);
        }
    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE payments SET contract_id=?, amount=?, payment_date=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "payments updated succesfully"}, result)
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM payments WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "payments deleted succesfully"})
   })
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}