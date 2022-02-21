'use strict';

import {Router, NextFunction, Request, Response} from "express";
import AuthAPI from "./auth";
import UserAPI from "./user";
import RootAPI from "./root";
import ProjectAPI from "./project";
import RequirementsAPI from "./requirements";

export default class Api {
    constructor(app) {
        this.app = app;
        this.router = Router();
        this.routeGroups = [];
    }

    loadRouteGroups() {
        this.routeGroups.push(new AuthAPI());
        this.routeGroups.push(new UserAPI());
        this.routeGroups.push(new RootAPI());
        this.routeGroups.push(new ProjectAPI());
        this.routeGroups.push(new RequirementsAPI());
    }

    setContentType(req, resp, next) {
        resp.set('Content-Type', 'text/json');
        next();
    }

    registerGroup() {
        this.loadRouteGroups();
        this.routeGroups.forEach(rg => {
            let setContentType = rg.setContentType ? rg.setContentType : this.setContentType;
            this.app.use('/api' + rg.getRouteGroup(), setContentType, rg.getRouter())
        });
    }
}
