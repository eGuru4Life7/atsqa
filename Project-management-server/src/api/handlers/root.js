/**
 * Created by ShayanAhmed on 12/7/16.
 */
'use strict';

import {Request, Response} from 'express';
import {parseBody, generateResponse} from '../../utilities';
import {TRANSACTION_FILTER} from '../../utilities/constants';
import {hash, genSalt, compare} from "bcrypt";
import {UserModel, MedicineTypeModel, PricingModel, UserRoleModel, MedicineModel, DiseaseModel, PatientModel, DoctorModel, PatientVisitModel} from '../../models';
import {getAllTransactions, getVisitedPatientsData, getTodayVisitedPatientsData} from '../../models/user'
import {sign, verify} from "jsonwebtoken";
import config from "../../conf";
import * as _ from 'lodash';
import fs from 'fs';
var csv = require('csv');

export function getMessage(req, res){
    let body = parseBody(req);
    console.log(body);
}

export function fetchMedicines(req, res){
    MedicineModel.findAll().then(med => {
        if(med){
            generateResponse(true, 'Medicines fetched Successfully', med, res);
        } else {
            generateResponse(false, 'No medicines data available', null, res);
        }
    }).catch(ex => {
        generateResponse(false, 'No medicines data available', null, res);
    });
}

export function fetchMedicineType(req, res){
    MedicineTypeModel.findAll().then(med => {
        if(med){
            med = med.map(data => {
                return {id: data.id, title: data.title};
            });
            generateResponse(true, 'Medicine Types fetched Successfully', med, res);
        } else {
            generateResponse(false, 'No medicines data available', null, res);
        }
    }).catch(ex => {
        generateResponse(false, 'No medicines data available', null, res);
    });
}

export function fetchMedicineByType(req, res){
    let typeid = req.query.id;
    MedicineModel.findAll({where: {typeid}}).then(med => {
        if(med){
            generateResponse(true, 'Medicines fetched Successfully', med, res);
        } else {
            generateResponse(false, 'No medicines data available', null, res);
        }
    }).catch(ex => {
        generateResponse(false, 'No medicines data available', null, res);
    });
}


export function fetchDiseases(req, res){
    DiseaseModel.findAll().then(med => {
        if(med){
            generateResponse(true, 'Diseases fetched Successfully', med, res);
        } else {
            generateResponse(false, 'No Diseases data available', null, res);
        }
    }).catch(ex => {
        generateResponse(false, 'No Diseases data available', null, res);
    });
}

export function fetchTransactions(req, res){
    let filter = req.query.filter;
    filter = parseInt(filter);
    let dayStart = new Date();
    let dayEnd = new Date();
    console.log(filter);
    switch (filter) {
        case TRANSACTION_FILTER.DAILY:
            break;
        case TRANSACTION_FILTER.WEEKLY:
            dayStart.setDate(dayStart.getDate()-7);
            break;
        case TRANSACTION_FILTER.MONTHLY:
            dayStart.setDate(1);
            dayEnd.setDate(31);
            break;
        case TRANSACTION_FILTER.YEARLY:
            dayStart.setDate(1);
            dayStart.setMonth(0);
            dayEnd.setDate(31);
            dayEnd.setMonth(11);
            break;
        default:
            break;
    }
    dayStart.setHours(0);
    dayStart.setMinutes(0);
    dayStart.setSeconds(0);
    dayStart.setMilliseconds(0);
    dayEnd.setHours(23);
    dayEnd.setMinutes(59);
    dayEnd.setSeconds(59);
    dayEnd.setMilliseconds(59);
    console.log(dayStart.toDateString());
    console.log(dayEnd.toDateString());
    getAllTransactions().then(med => {
        if(med){
            med = med.filter(item => {
                let itemDate = new Date(item.createdAt);
                return itemDate.getTime()>=dayStart.getTime() && itemDate.getTime()<=dayEnd.getTime();
            });
            generateResponse(true, 'Transactions fetched Successfully', med, res);
        } else {
            generateResponse(false, 'No Transactions available', null, res);
        }
    }).catch(ex => {
        generateResponse(false, 'No Transactions available', null, res);
    });
}

export function fetchDashboardData(req, res){
    let data = {patientcount: 0, doctorcount: 0, lastfivevisited: [], todaysvisited: []};
    PatientModel.count().then(p => {
        data.patientcount = p;
        DoctorModel.count().then(d => {
            data.doctorcount = d;
            // PatientVisitModel.findAll({order: 'createdAt DESC', limit: 5}).then(ps => {
            getVisitedPatientsData(5).then(ps => {
                data.lastfivevisited = ps;
                // PatientVisitModel.findAll({where: {createdAt: { $lt: new Date(), $gt: new Date(new Date() - 24 * 60 * 60 * 1000) }}}).then(ps => {
                getTodayVisitedPatientsData().then(ps => {
                    data.todaysvisited = ps;
                    PricingModel.findAll().then(resp => {
                        let total = 0.0;
                        resp.forEach(function(element) {
                            total += parseFloat(element.debit);
                        });
                        data.totalDebit = total;
                        generateResponse(true, 'Dashboard fetched Successfully', data, res);
                    });
                }).catch(ex => {
                    console.log(ex);
                    generateResponse(false, 'No Patient Visits Found', null, res);
                });
            }).catch(ex => {
                generateResponse(false, 'No Patient Visits Found', null, res);
            });
        }).catch(ex => {
            generateResponse(false, 'No Doctor', null, res);
        });
    }).catch(ex => {
        generateResponse(false, 'No Patients', null, res);
    });
}

export function importCSVData(req, res){
    let medicines = [];
    // fs.readFile(req.file.path, function(err, data){
    //     csv.parse(data, function(err, result){
    //         let rows = result;
    //         for(var index=0; index<rows.length; index++){
    //             if(index != 0){
    //                 let row = rows[index];
    //                 let formula = row[0];
    //                 let title = row[1];
    //                 let category = row[2];
    //                 let type = row[3];
    //                 let typeid = 0;
    //                 let data = {title, formula, category, typeid: type};
    //                 MedicineModel.create(data).then(med => {
    //                     console.log('Medicine Added: ' + index);
    //                 })
    //             }
    //         }
    //         // medicineType = _.uniqBy(medicineType, 'title');
    //         // MedicineTypeModel.bulkCreate(medicineType).then(resp => {
    //         //     res.json({success: true});
    //         // })
    //         // console.log(medicineType);
    //     });
        
    //     // res.json({success: true});
    // });
    MedicineModel.findAll().then(med => {
        med.forEach(item => {
            MedicineTypeModel.findOne({where: {title: item.typeid}}).then(medType => {
                if(medType){
                    MedicineModel.update({typeid: medType.id}, {where: {typeid: medType.title}}).then(d => {
                        console.log('Medicine Type Updated');
                    })
                }
            });
        });
    });
}