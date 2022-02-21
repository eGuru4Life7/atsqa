'use strict';

import {Router} from "express";
import {log, loggedIn} from "../api/middlewares/index";
import {
    // fetchRoles, 
    // createPatient, 
    // fetchUser, 
    // searchUser, 
    // fetchCities, 
    // fetchCountries, 
    // fetchBloodGroups, 
    // getPatientInfo,
    // getAllPatients,
    // getDoctorInfo,
    // createReceptionist,
    // getReceptionistInfo,
    // getAllDoctors,
    // getAllReceptionist,
    // fetchStates,
    // fetchPatientDiseases,
    // addPatientDrugDetails,
    // addPatientVisitDetails,
    // fetchPatientVisitHistory,
    // fetchPatientDrugHistory,
    // addPatientDiseases,
    // fetchPatientBillingHistory,
    // addPatientFee,
    // fetchPatientTotalCredit,
    // isUsernameExists
    createDeveloper,
    updateUser,
    getUsers,
    getUserDetails
} from './handlers/user';


export default class UserAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;
        // router.get('/', log, loggedIn, fetchUser);
        // router.post('/patient', log, loggedIn, createPatient);
        // router.get('/patient', log, loggedIn, getPatientInfo);
        // router.post('/doctor', log, loggedIn, createDoctor);
        // router.get('/doctor', log, loggedIn, getDoctorInfo);
        // router.get('/receptionist', log, loggedIn, getReceptionistInfo);
        // router.post('/receptionist', log, loggedIn, createReceptionist);
        // router.get('/fetch/patients', log, loggedIn, getAllPatients);
        // router.get('/fetch/doctors', log, loggedIn, getAllDoctors);
        // router.get('/fetch/receptionist', log, loggedIn, getAllReceptionist);
        // router.get('/roles', log, loggedIn, fetchRoles);
        // router.get('/search', log, loggedIn, searchUser);
        // router.get('/country', log, loggedIn, fetchCountries);
        // router.get('/state', log, loggedIn, fetchStates);
        // router.get('/city', log, loggedIn, fetchCities);
        // router.get('/fetch/blood/groups', log, loggedIn, fetchBloodGroups);
        // router.get('/fetch/patient/diseases', log, loggedIn, fetchPatientDiseases);
        // router.post('/add/patient/diseases', log, loggedIn, addPatientDiseases);
        // router.get('/fetch/patient/visits', log, loggedIn, fetchPatientVisitHistory);
        // router.get('/fetch/billing/history', log, loggedIn, fetchPatientBillingHistory);
        // router.get('/fetch/patient/drug', log, loggedIn, fetchPatientDrugHistory);
        // router.post('/add/patient/drug', log, loggedIn, addPatientDrugDetails);
        // router.post('/add/patient/visit', log, loggedIn, addPatientVisitDetails);
        // router.post('/add/patient/fee', log, loggedIn, addPatientFee);
        // router.get('/fetch/patient/credit', log, loggedIn, fetchPatientTotalCredit);
        // router.get('/username', log, loggedIn, isUsernameExists);

        router.post('/developer', log, loggedIn, createDeveloper);
        router.put('/', log, loggedIn, updateUser);
        router.get('/', log, loggedIn, getUsers);
        router.get('/details', log, loggedIn, getUserDetails);
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return '/user';
    }
}