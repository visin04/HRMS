const express = require('express');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const DB = require('../../models/db');
const db = require('../../models/schemaconnection');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/policies/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File name
    }
});
const upload = multer({ storage: storage });

const project = {
    createdAt: 0,
    updatedAt: 0,
};

// Route to add a new policy document
Router.post('/addPolicy', upload.single('PolicyDocument'), async function (req, res) {
    const formData = {
        PolicyName: req.body.PolicyName,
        PolicyDescription: req.body.PolicyDescription,
        PolicyCategory: req.body.PolicyCategory,
        EffectiveDate: req.body.EffectiveDate,
        ExpirationDate: req.body.ExpirationDate,
        PolicyDocument: req.file ? `/uploads/policies/${req.file.filename}` : null,
        PolicyOwner: req.body.PolicyOwner,
        PolicyApprover: req.body.PolicyApprover,
        VersionNumber: req.body.VersionNumber,
        Status: req.body.Status,
        Comments: req.body.Comments,
        isDeleted: req.body.isDeleted || false
    };

    try {
        const existingPolicy = await db.policy.findOne({ PolicyName: formData.PolicyName });
        if (existingPolicy) {
            return res.status(409).json({ message: "Policy name already exists" });
        }

        DB.InsertDocument('policy', formData, function (err, result) {
            if (err) {
                console.error('Error while creating policy:', err);
                return res.status(400).json({ error: 'Error while creating policy' });
            } else {
                return res.status(201).json({ message: "Policy created successfully", result });
            }
        });
    } catch (error) {
        console.error('Error while creating policy:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve static files for policy documents
Router.use('/uploads/policies', express.static(path.join(__dirname, '../../uploads/policies')));

// Route to list all policies
Router.get('/listPolicy', function (req, res) {
    const query = { isDeleted: false };
    DB.GetDocument('policy', query, project, { sort: { createdAt: -1 } }, function (err, result) {
        if (err) {
            console.error('Error while fetching policies:', err);
            return res.status(400).json({ error: 'Error while fetching policies' });
        } else {
            return res.status(200).json(result);
        }
    });
});

// Route to view a specific policy by ID
Router.get('/viewPolicy/:id', async function (req, res) {
    try {
        const result = await DB.GetOneDocument('policy', { _id: req.params.id }, project, {});
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "Policy not found" });
        }
    } catch (error) {
        console.error('Error while fetching policy:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update a specific policy by ID
Router.post('/updatePolicy/:id', upload.single('PolicyDocument'), async function (req, res) {
    const updateData = {
        PolicyName: req.body.PolicyName,
        PolicyDescription: req.body.PolicyDescription,
        PolicyCategory: req.body.PolicyCategory,
        EffectiveDate: req.body.EffectiveDate,
        ExpirationDate: req.body.ExpirationDate,
        PolicyOwner: req.body.PolicyOwner,
        PolicyApprover: req.body.PolicyApprover,
        VersionNumber: req.body.VersionNumber,
        Status: req.body.Status,
        Comments: req.body.Comments,
        isDeleted: req.body.isDeleted
    };

    if (req.file) {
        updateData.PolicyDocument = `/uploads/policies/${req.file.filename}`;
    }

    try {
        const result = await DB.FindUpdateDocument('policy', { _id: req.params.id }, updateData);
        if (result) {
            return res.status(200).json({ message: "Policy updated successfully", result });
        } else {
            return res.status(404).json({ message: "Policy not found" });
        }
    } catch (error) {
        console.error('Error while updating policy:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to soft delete (toggle isDeleted) a specific policy by ID
Router.post('/softDeletePolicy/:id', async function (req, res) {
    try {
        const policy = await DB.GetOneDocument('policy', { _id: req.params.id }, {}, {});
        if (policy) {
            const updatedResult = await DB.FindUpdateDocument('policy', { _id: req.params.id }, { isDeleted: !policy.isDeleted });
            if (updatedResult) {
                const message = policy.isDeleted ? "Policy restored successfully" : "Policy deleted successfully";
                return res.status(200).json({ message, updatedResult });
            } else {
                return res.status(400).json({ error: "Issue while updating policy deletion status" });
            }
        } else {
            return res.status(404).json({ message: "Policy not found" });
        }
    } catch (error) {
        console.error('Error while updating policy deletion status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = Router;
