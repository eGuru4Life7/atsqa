/**
 * Created by ShayanAhmed on 12/7/16.
 */
'use strict';

import {Request, Response} from 'express';
import {parseBody, generateResponse} from '../../utilities';
import {hash, genSalt, compare} from "bcrypt";
import {UserModel, UserRoleModel} from '../../models';
import {sign, verify} from "jsonwebtoken";
import config from "../../conf";

export function login(req, res) {
    let body = parseBody(req);
    UserModel.findOne({ where: {email: body.email} }).then(user => {
        compare(body.password, user.password).then(valid => {
            if (valid) {
                UserRoleModel.findOne({ where: {userid: user.id} }).then(userRole => {
                    if(userRole){
                        let token = sign({user, role_id: userRole.roleid}, `${config.app['jwtsecret']}`, {expiresIn: "1y"});
                        user.token = token;
                        generateResponse(true, 'Successfully Loggedin', {user, role_id: userRole.roleid}, res);
                    }
                });
            } else {
                generateResponse(false, 'Invalid Credentials', null, res);
            }
        }).catch(ex => {
            console.log(ex);
            generateResponse(false, 'Invalid Credentials', null, res);
        });
    }).catch(ex => {
        console.log(ex);
        generateResponse(false, 'User not found', null, res);
    });
}
export function register(req, res){
    let userObject = parseBody(req);
    if(userObject){
        genSalt(parseInt(config.app['password_saltRounds'], 10)).then(salt => {
            hash(userObject.password, salt).then((hash) => {
                userObject.password = hash;
                UserModel.create(userObject).then(user => {
                    if(user){
                        UserRoleModel.create({userid: user.id, roleid: userObject.roleid}).then(ur => {
                            if(ur){
                                generateResponse(true, 'Successfully Registered', user, res);
                            }
                        });
                    } else {
                        generateResponse(false, 'Unable to create User', null, res);
                    }
                }).catch((ex) => {
                    let errors = [];
                    ex.errors.forEach(item => {
                        errors.push(item.message);
                    });
                    generateResponse(false, errors.join(','), null, res);
                });
            })
        })
    }
}
