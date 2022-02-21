'use strict';

import {Router} from "express";
import {log, loggedIn} from "../api/middlewares/index";
import {fetchMedicines, 
    fetchDiseases, 
    fetchDashboardData, 
    fetchTransactions, 
    importCSVData,
    fetchMedicineType,
    fetchMedicineByType,
    getMessage
} from './handlers/root';
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

export default class RootAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;
        router.post('/message', log, getMessage);
        router.get('/medicines', log, loggedIn, fetchMedicines);
        router.get('/medicine/type', log, fetchMedicineType);
        router.get('/fetch/medicine/type', log, fetchMedicineByType);
        router.get('/diseases', log, loggedIn, fetchDiseases);
        router.get('/dashboard', log, fetchDashboardData);
        router.get('/transactions', log, fetchTransactions);
        router.post('/import', log, upload.single('medicines'), importCSVData);
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return '/';
    }
}