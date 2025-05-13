const db = require('../config/db');
const contractsValidation = require('../validation/contracts.validate')
const querryGenerate = require('../helpers/querry_genrate');


const getAll = (req, res) => {
    db.query(`SELECT * FROM contracts`, (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: result})
    })
}
const create = (req, res) => {
    const { customer_id, laptop_id, duration, seller_id } = req.body;

    if (!customer_id || !laptop_id || !duration || !seller_id) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    const getPriceQuery = 'SELECT price FROM laptops WHERE id = ?';

    db.query(getPriceQuery, [laptop_id], (err, result) => {
        if (err) {
            console.error('Error fetching price:', err);
            return res.status(500).send({ message: 'Database error' });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'Laptop not found' });
        }

        const price = result[0].price;

        const first_payment = parseFloat((price * 0.25).toFixed(2));
        const remaining_balance = parseFloat((price - first_payment).toFixed(2));
        const monthly_payment = parseFloat((remaining_balance / duration).toFixed(2));
        const payments_remaining = duration;

        const today = new Date();
        today.setMonth(today.getMonth() + 1);
        const next_payment_date = today.toISOString().split('T')[0];

        const insertQuery = `
            INSERT INTO contracts (
                customer_id, 
                laptop_id, 
                duration, 
                seller_id,
                first_payment,
                remaining_balance,
                monthly_payment,
                payments_remaining,
                next_payment_date
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            customer_id,
            laptop_id,
            duration,
            seller_id,
            first_payment,
            remaining_balance,
            monthly_payment,
            payments_remaining,
            next_payment_date
        ];

        db.query(insertQuery, values, (err, result2) => {
            if (err) {
                console.error('Error inserting contract:', err);
                return res.status(500).send({ message: 'Database error' });
            }

            return res.status(200).send({
                message: 'Contract created successfully',
                contract_id: result2.insertId,
                calculated: {
                    first_payment,
                    remaining_balance,
                    monthly_payment,
                    payments_remaining,
                    next_payment_date
                }
            });
        });
    });
};



const getById = (req, res) => {
    db.query(`SELECT * FROM contracts WHERE id =?`, [req.params.id], (err, result) => {
        if(err){
            return res.status(500).send({message: err.message});
        }
        res.status(200).send({data: result});
    })
}

const update = (req, res) => {
    const { error, value } = contractsValidation(req.body) 
        if(error) {
            console.log(`Error crating new seller`, error);
        }
    let {id} = req.params
    let data = value

    updateValues = querryGenerate(data)
    let values = Object.values(data)
   
    db.query(`UPDATE contracts SET customer_id=?, laptop_id=?, first_payment=?, duration=?, seller_id=?, monthly_payment=?, payments_remaining=?, next_payment_date=?, remaining_balance=? WHERE id =?`, [...values, id], (err, result) => {
        if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "contracts updated succesfully"}, result)
    })
}

const remove = (req, res) => {
   let {id} = req.params;

   db.query(`DELETE FROM contracts WHERE id =?`, [id], (err, result) => {
    if(err){
            res.status(500).send({message: `${err.message}`});
        }
        res.status(200).send({message: "contracts deleted succesfully", result})
   })
}


const buildQuery = (baseSql, conditions, params) => {
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    return {
        sql: `${baseSql} ${whereClause}`,
        params: params
    };
};


const getSoldProductsInDateRange = (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).send({ message: "startDate and endDate are required" });
    }

    const baseSql = `
        SELECT 
            c.id AS contract_id,
            CONCAT(cust.first_name, ' ', cust.last_name) AS customer_name,
            l.model AS laptop_model,
            l.price,
            ROUND(c.first_payment, 2) AS first_payment,
            c.duration,
            ROUND(c.monthly_payment, 2) AS monthly_payment,
            c.created_at
        FROM contracts c
        JOIN customers cust ON c.customer_id = cust.id
        JOIN laptops l ON c.laptop_id = l.id
    `;

    const { sql, params: queryParams } = buildQuery(baseSql, [`c.created_at BETWEEN ? AND ?`], [startDate, endDate]);

    db.query(sql, queryParams, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send({ message: "Server error", error: err.message });
        }

        res.status(200).send({
            message: "Sold contracts in the selected date range",
            data: result
        });
    });
};

const getOverdueCustomers = (req, res) => {
    const { startDate, endDate } = req.query;

    const baseSql = `
        SELECT 
            c.id AS contract_id,
            CONCAT(cust.first_name, ' ', cust.last_name) AS customer_name,
            l.model AS laptop_model,
            c.monthly_payment,
            DATEDIFF(CURDATE(), c.next_payment_date) AS days_overdue
        FROM contracts c
        JOIN customers cust ON c.customer_id = cust.id
        JOIN laptops l ON c.laptop_id = l.id
    `;

    const conditions = [
        `c.next_payment_date < CURDATE()`,
        `c.payments_remaining > 0`
    ];
    const params = [];

    if (startDate && endDate) {
        conditions.push(`c.created_at BETWEEN ? AND ?`);
        params.push(startDate, endDate);
    }

    const { sql, params: queryParams } = buildQuery(baseSql, conditions, params);

    db.query(sql, queryParams, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send({ message: "Server error", error: err.message });
        }

        res.status(200).send({
            message: "Overdue customers fetched",
            data: result
        });
    });
};



module.exports = {
    getAll,
    create,
    getById,
    update,
    remove,
    getOverdueCustomers,
    getSoldProductsInDateRange
}