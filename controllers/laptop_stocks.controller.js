const db = require('../config/db');
const laptopStockValidation = require('../validation/laptop_stocks.validate')
const querryGenerate = require('../helpers/querry_genrate');


const getAll = (req, res) => {
    db.query(`SELECT * FROM laptop_stocks`, (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: result})
    })
}

const create = (req, res) => {
    const { error, value } = laptopStockValidation(req.body);
    if (error) {
       console.log(`Error crating new laptop stock`, error);
    }

    const { laptop_id, quatity, added_by, added_at } = value;
    const sql = `INSERT INTO laptop_stocks(laptop_id, quatity, added_by, added_at) VALUES (?, ?, ?, ?)`;

    db.query(sql, [laptop_id, quatity, added_by, added_at], (err, result) => {
        if (err) {
            console.log(`Error creating new laptop stock:`, err);
            return res.status(500).send({ message: "Database error" });
        }
        return res.status(200).send({ data: result });
    });
};


const getById = (req, res) => {
    db.query(`SELECT * FROM laptop_stocks WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
    const { error, value } = laptopStockValidation(req.body) 
        if(error) {
            console.log(`Error crating new laptop stock`, error);
        }
    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE laptop_stocks SET laptop_id=?, quatity=?, added_by=?, added_at=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({ message: "Laptop stocks updated successfully", result });
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM laptop_stocks WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "laptop stocks deleted succesfully"})
   })
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}