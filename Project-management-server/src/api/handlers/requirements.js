/**
 * Created by ShayanAhmed on 12/7/16.
 */
'use strict';

import {Request, Response} from 'express';
import {parseBody, generateResponse} from '../../utilities';
import {ModuleModel, ProjectRequirementsModel} from '../../models/index';
import {getAllProjectRequirements, getAllModuleRequirements, getAllRequirementDeveloper} from '../../models/requirements';

export function addModule(req, res) {
    let body = parseBody(req);
    body.createdby = req.user.id;
    ModuleModel.find({where: {projectid: body.projectid, title: body.title}}).then(isRecordExists => {
        if(!isRecordExists){
             ModuleModel.create(body).then(p => {
                if(p){
                    generateResponse(true, 'Module added successfully', p, res);
                } else {
                    generateResponse(false, 'Unable to add Module', null, res);
                }
            }).catch(ex => {
                console.log(ex);
                generateResponse(false, 'Unable to add Module', null, res);
            });
        } else {
            generateResponse(false, 'Duplicate Entry for Title', null, res);
        }
    });
   
}

export function addProjectRequirement(req, res) {
    let body = parseBody(req);
    body.createdby = req.user.id;
    ProjectRequirementsModel.create(body).then(p => {
        if(p){
            generateResponse(true, 'Project Requirement added successfully', p, res);
        } else {
            generateResponse(true, 'Unable to add Project Requirement', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to add Project Requirement', null, res);
    });
}

export function fetchModules(req, res) {
    let projectid = req.query.id;
    if(projectid){
        ModuleModel.findAll({where: {projectid}}).then(p => {
            if(p){
                generateResponse(true, 'Modules fetched successfully', p, res);
            } else {
                generateResponse(true, 'Unable to fetch Modules', null, res);
            }
        }).catch(ex => {
            console.log(ex);
            generateResponse(true, 'Unable to fetch Modules', null, res);
        });
    } else {
        ModuleModel.findAll().then(p => {
            if(p){
                generateResponse(true, 'Modules fetched successfully', p, res);
            } else {
                generateResponse(true, 'Unable to fetch Modules', null, res);
            }
        }).catch(ex => {
            console.log(ex);
            generateResponse(true, 'Unable to fetch Modules', null, res);
        });
    }
    
}

export function fetchProjectRequirements(req, res) {
    let projectid = req.query.id;
    getAllProjectRequirements(projectid).then(p => {
        if(p){
            generateResponse(true, 'Modules fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Modules', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Modules', null, res);
    });
}

export function fetchModuleRequirements(req, res) {
    let moduleid = req.query.id;
    getAllModuleRequirements(moduleid).then(p => {
        if(p){
            generateResponse(true, 'Modules fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Modules', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Modules', null, res);
    });
}

export function fetchModuleDevelopers(req, res) {
    let moduleid = req.query.id;
    getAllRequirementDeveloper(moduleid).then(p => {
        if(p){
            generateResponse(true, 'Developers fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Developers', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Developers', null, res);
    });
}
