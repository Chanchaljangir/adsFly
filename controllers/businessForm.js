const mongoose = require("mongoose");
const BusinessForm = require('../models/businessForm');


async function addBusinessForm(req, res) {
    try {
        const business = new BusinessForm(req.body);
        const result = await business.save();
        result ? res.status(200).send({
            message: "business are saved",
            IsSuccess: true,
            Data: result
        }) :
            res.status(422).send({
                message: "programs are not saved",
                IsSuccess: false
            });
    } catch (error) {
        res.send(error);
    }
}
async function getBusinessForm(req, res) {
    try {
        let respObj = {
            IsSuccess: false,
            message: "OK",
            Data: null
        };
        let business = await BusinessForm.find({}).populate({
            path: 'ownerOfBusiness',
            model: 'signUp',
            select: 'name'
        })
        respObj.IsSuccess = true;
        respObj.Data = business;
        res.status(200).json(respObj);
    } catch (err) {
        respObj.error = err
        respObj.message = err.message || "Error while processing db query",
            res.status(500).json(respObj)
    }
}
async function editBusinessForm(req, res) {
    try {
        const result = await BusinessForm.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body, {
            new: true
        }
        );
        result ? res.status(200).send({
            message: "Edit Successfully",
            Data: result,
            IsSuccess: true
        }) :
            res.status(422).send({
                message: "Edit unsuccessfully",
                IsSuccess: false
            })
    } catch (error) {
        res.send(error)
    }
}
async function deleteBusinessForm(req, res) {
    try {
        const result = await BusinessForm.findByIdAndDelete(
            {
                _id: req.params.id
            }
        ).remove();
        result ? res.status(200).send({
            message: "Deleted Successfully",
            Data: result,
            IsSuccess: true
        }) :
            res.status(422).send({
                message: "Deleted unsuccessfully",
                IsSuccess: false
            })
    } catch (error) {
        res.send(error);
    }

}
async function getSpecificBusinessForm(req, res) {
    try {
        const result = await BusinessForm.findById(
            {
                _id: req.params.id
            }
        ).populate({
            path: 'ownerOfBusiness',
            model: 'signUp',
            select: 'name'
        })

        result ? res.status(200).send({
            message: "particular BusinessForm recieved",
            IsSuccess: true,
            Data: result
        }) :
            res.status(422).send({
                message: "particular BusinessForm is not recieved",
                IsSuccess: "false"
            });

    } catch (error) {
        throw error
    }

}

async function getBusinessFormList(req, res) {
    try {
        let respObj = {
            IsSuccess: false,
            message: "OK",
            Data: null
        };
        var limit = req.body.pageSize || 5;
        var pageNum = req.body.page || 1;

        var skip = limit * (pageNum - 1);

        let businessCount = await BusinessForm.count();
        let business = await BusinessForm.find({
            $and: [
                { school_id: req.body.school_id },
                { department_id: req.body.department_id }
            ]
        }).populate({
            path: 'created_by',
            model: 'signUp',
            select: 'name -_id'
        }).select("name email mobile").limit(parseInt(limit)).skip(parseInt(skip));
        respObj.IsSuccess = true;
        respObj.Data = business;
        respObj.count = businessCount
        res.status(200).json(respObj);
    } catch (err) {
        respObj.error = err
        respObj.message = err.message || "Error while processing db query",
            res.status(500).json(respObj)
    }
}
module.exports = {
    addBusinessForm,
    getBusinessForm,
    editBusinessForm,
    deleteBusinessForm,
    getSpecificBusinessForm,
    getBusinessFormList
}