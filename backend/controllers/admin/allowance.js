const express = require('express');
const Router = express.Router();
const DB = require('../../models/db');
const db = require('../../models/schemaconnection')


const project = {
    createdAt: 0,
    updatedAt: 0,
};

Router.post('/addAllowance', async function (req, res) {
    const formData = {
        housingAllowance: req.body.housingAllowance,
        transportAllowance: req.body.transportAllowance,
        medicalAllowance: req.body.medicalAllowance,
        status: req.body.status ? req.body.status : 1,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : 0
    }

    // const result = await db.allowances.findOne({  });
    // if (result) {
    //     res.statusMessage = "Allowance already exists";
    //     return res.status(409).end();
    // }

    if (formData) {
        DB.InsertDocument('allowances', formData, function (err, result) {
            if (err) {
                res.status(400).end();
            } else {
                res.statusMessage = "Allowances added successfully";
                return res.status(201).json(result);
            }
        })
    } else {
        console.error('Error while adding allowance:', error);
        res.status(500).end();
    }

});


Router.get('/listAllowance', function (req, res) {
    let query = {};
    query = { isDeleted: false };
    DB.GetDocument('allowances', query, project, { sort: { createdAt: -1 } }, function (err, result) {
        if (err) {
            res.status(400).end();
        } else {
            return res.status(201).json(result);
        }
    });
});

Router.post('/viewAllowance/:id', async function (req, res) {
    try {
        const result = await DB.GetOneDocument('allowances', { _id: req.params.id }, project, {});
        res.status(201).json(result);
    } catch (error) {
        res.status(400).end();
    }
});

Router.post('/updateAllowance/:id', async function (req, res) {
    const formData = {
        housingAllowance: req.body.housingAllowance,
        transportAllowance: req.body.transportAllowance,
        medicalAllowance: req.body.medicalAllowance,
        status: req.body.status,
        isDeleted: req.body.isDeleted
    }


    const result = await DB.FindUpdateDocument('allowances', { _id: req.params.id }, formData);

    if (result) {
        res.statusMessage = "Allowance updated successfully";
        return res.status(200).json(result);
    } else {
        res.status(400).end();
    }
});

Router.get('/softDeleteAllowance/:id', async function (req, res) {
    try {
        const result = await DB.GetOneDocument('allowances', { _id: req.params.id }, {}, {});
        if (result) {
            const result1 = await DB.FindUpdateDocument('allowances', { _id: req.params.id }, { isDeleted: result.isDeleted ? !result.isDeleted : 1 });
            if (result1) {
                res.statusMessage = "Allowance deleted successfully";
                return res.status(200).json(result);
            } else {
                res.status(400).end();
            }
        } else {
            res.status(400).end();
        }
    } catch (error) {
        throw error;
    }
});

module.exports = Router;