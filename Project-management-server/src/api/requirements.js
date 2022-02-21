'use strict';

import {Router} from "express";
import {log, loggedIn} from "../api/middlewares/index";
import {addModule, fetchModules, addProjectRequirement, fetchModuleRequirements, fetchProjectRequirements, fetchModuleDevelopers} from './handlers/requirements';


export default class RequirementsAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;
        router.post('/module/add', log, loggedIn, addModule);
        router.get('/module', log, loggedIn, fetchModules);
        router.post('/project/requirement/add', log, loggedIn, addProjectRequirement);
        router.get('/module/requirements', log, loggedIn, fetchModuleRequirements);
        router.get('/project/requirements', log, loggedIn, fetchProjectRequirements);
        router.get('/module/requirements/developers', log, loggedIn, fetchModuleDevelopers);
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return '/requirements';
    }
}