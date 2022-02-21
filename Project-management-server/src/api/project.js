'use strict';

import {Router} from "express";
import {log, loggedIn} from "../api/middlewares/index";
import {
    addProject, 
    fetchProjects, 
    fetchProjectDetails,
    addBuild,
    addRelease,
    fetchProjectBuild,
    fetchProjectRelease,
    fetchBuildDetails,
    fetchReleaseDetails,
    fileUpload
} from './handlers/project';
let multer  = require('multer');
let upload = multer();


export default class ProjectAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;
        router.post('/add', log, loggedIn, upload.array('file'), addProject);
        router.post('/release', log, loggedIn, addRelease);
        router.get('/release', log, loggedIn, fetchProjectRelease);
        router.get('/release/details', log, loggedIn, fetchReleaseDetails);
        router.post('/build', log, loggedIn, addBuild);
        router.get('/build', log, loggedIn, fetchProjectBuild);
        router.get('/build/details', log, loggedIn, fetchBuildDetails);
        router.get('/fetch', log, fetchProjects);
        router.get('/details', log, loggedIn, fetchProjectDetails);
        router.post('/file', log, upload.array('file'), fileUpload);
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return '/project';
    }
}