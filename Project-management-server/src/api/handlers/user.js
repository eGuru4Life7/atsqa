/**
 * Created by ShayanAhmed on 12/7/16.
 */
'use strict';

import {Request, Response} from 'express';
import {parseBody, generateResponse, getCurrentTimestamp, getModifiedObjectToUpdateUser} from '../../utilities';
import {ROLES} from '../../utilities/constants';
import {hash, genSalt, compare} from "bcrypt";
import {
    UserModel, 
    UserRoleModel, 
    Roles, 
    CountryModel, 
    CityModel
    } from '../../models';
import {sign, verify} from "jsonwebtoken";
import config from "../../conf";
import {getUsersOfRole} from '../../models/user';


export function createDeveloper(req, res){
    let userObject = parseBody(req);
    if(userObject){
        userObject.isactive = true;
        userObject.createdby = req.user.id;
        userObject.modifiedby = req.user.id;
        genSalt(parseInt(config.app['password_saltRounds'], 10)).then(salt => {
            hash(userObject.password, salt).then((hash) => {
                userObject.password = hash;
                UserModel.create(userObject).then(user => {
                    if(user){
                        UserRoleModel.create({userid: user.id, roleid: ROLES.DEVELOPER}).then(ur => {
                            if(ur){
                                userObject.userid = user.id;
                                generateResponse(true, 'Developer added successfully', user, res);
                             } else {
                                generateResponse(false, 'Unable to create Developer', null, res);
                            }
                        });
                    } else {
                        generateResponse(false, 'Unable to create Developer', null, res);
                    }
                }).catch(ex => {
                    console.log(ex);
                    generateResponse(false, 'Unable to create Developer', null, res);
                });
            })
        })
    }
}

export function getUsers(req, res){
    let role = req.query.role;
    getUsersOfRole(role).then(users => {
        if(users){
            generateResponse(true, 'Users Fetched Successfully', users, res);
        } else {
            generateResponse(true, 'Unable to fetch Users', users, res);
        }
    }).catch(ex => {
        generateResponse(true, 'Unable to fetch Users', users, res);
    });
}


export function getUserDetails(req, res){
    let userId = req.query.id;
    UserModel.find({where: {id: userId}}).then(user => {
        if(user){
            generateResponse(true, 'User Fetched Successfully', user, res);
        } else {
            generateResponse(true, 'Unable to fetch User', null, res);
        }
    }).catch(ex => {
        generateResponse(true, 'Unable to fetch User', null, res);
    });
}

export function updateUser(req, res){
    let userObject = parseBody(req);
    if(userObject){
        let userid = userObject.id;
        userObject = getModifiedObjectToUpdateUser(userObject);
        UserModel.update(userObject, {where: {id: userid}}).then(user => {
            if(user){
                generateResponse(true, 'User updated successfully', null, res);
            } else {
                generateResponse(false, 'Unable to update User', null, res);
            }
        }).catch(ex => {
            console.log(ex);
            generateResponse(false, 'Unable to update User', null, res);
        });
    }
}
