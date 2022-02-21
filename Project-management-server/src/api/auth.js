'use strict';

import {Router} from "express";
import {log, loggedIn} from "../api/middlewares/index";
import {login, register} from './handlers/auth';


export default class AuthAPI {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        let router = this.router;
        router.post('/login', log, login);
        router.post('/register/member', log, loggedIn, register);
        router.post('/register', log, register);
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return '/auth';
    }
}