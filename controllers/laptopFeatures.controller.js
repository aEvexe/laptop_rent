const db = require('../config/db');
const laptopFeaturesValidate = require('../validation/laptopFeatures.validate');
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
  const { error, value } = laptopFeaturesValidate(req.body);
  if (error) {
    console.log(`Error crating new laptop feature`, err);
  }

  const { laptopId, featureId, value: featureValue } = value;

  const sql = `
    INSERT INTO laptopFeatures (laptopId, featureId, value)
    VALUES (?, ?, ?)`;
  db.query(sql, [laptopId, featureId, featureValue], (err, result) => {
    if (err) {
      console.error("Error inserting laptop feature:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.status(200).json({ data: result });
  });
};

module.exports = { create };


const getById = (req, res) => {
    db.query(`SELECT * FROM brand WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
    const { error, value } = laptopFeaturesValidate(req.body) 
        if(error) {
            console.log(`Error crating new laptop feature`, error);
        }

    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE brand SET name=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "laptop feature updated succesfully"}, result)
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM brand WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "laptop feature deleted succesfully"})
   })
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove
}