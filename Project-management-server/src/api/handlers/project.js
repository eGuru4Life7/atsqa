/**
 * Created by ShayanAhmed on 12/7/16.
 */
'use strict';

import {Request, Response} from 'express';
import {parseBody, generateResponse, isAllStatusResolved, getType} from '../../utilities';
import {saveFile} from '../../utilities/filemanager';
import {FILE_TYPE} from '../../utilities/constants';
import {ProjectModel, ProjectReleaseModel, ProjectBuildModel, ResourcesModel} from '../../models/index';

export function addProject(req, res) {
    let body = parseBody(req);
    ProjectModel.create(body).then(p => {
        if(p){
            // uploadFiles(req, FILE_TYPE.PROJECT).then(resources => {
            //     if(resources){
            //         if(resources.length>0){
            //             resources = resources.map(item => {
            //                 item.resourceid = p.id;
            //                 return item;
            //             });
            //             ResourcesModel.bulkCreate(resources).then(resp => {
            //                 if(resp)
                                generateResponse(true, 'Project added successfully', p, res);
            //             });
            //         }
            //     }
            // })
        } else {
            generateResponse(false, 'Unable to add Project', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(false, 'Unable to add Project', null, res);
    });
}

export function addRelease(req, res) {
    let body = parseBody(req);
    body.createdby = req.user.id;
    body.updatedby = req.user.id;
    ProjectReleaseModel.create(body).then(p => {
        if(p){
            generateResponse(true, 'Project Release added successfully', p, res);
        } else {
            generateResponse(false, 'Unable to add Project Release', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(false, 'Unable to add Project Release', null, res);
    });
}

export function fetchProjectRelease(req, res) {
    let projectid = req.query.id;
    ProjectReleaseModel.findAll({where: {projectid}}).then(p => {
        if(p){
            generateResponse(true, 'Project Release Fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Project Release', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Project Release', null, res);
    });
}

export function fetchReleaseDetails(req, res) {
    let releaseid = req.query.id;
    ProjectReleaseModel.find({where: {id: releaseid}}).then(p => {
        if(p){
            generateResponse(true, 'Release Details Fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Release Details', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Release Details', null, res);
    });
}

export function fetchBuildDetails(req, res) {
    let buildid = req.query.id;
    ProjectBuildModel.find({where: {id: buildid}}).then(p => {
        if(p){
            generateResponse(true, 'Build Details Fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Build Details', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Build Details', null, res);
    });
}

export function fetchProjectBuild(req, res) {
    let projectid = req.query.pid;
    let releaseid = req.query.rid;
    ProjectBuildModel.findAll({where: {projectid, releaseid}}).then(p => {
        if(p){
            generateResponse(true, 'Project Build Fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Project Build', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Project Build', null, res);
    });
}

export function addBuild(req, res) {
    let body = parseBody(req);
    body.ceratedby = req.user.id;
    ProjectBuildModel.create(body).then(p => {
        if(p){
            generateResponse(true, 'Project Build added successfully', p, res);
        } else {
            generateResponse(true, 'Unable to add Project Build', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to add Project Build', null, res);
    });
}

export function fetchProjects(req, res) {
    ProjectModel.findAll({order: [['createdAt', 'DESC']]}).then(p => {
        if(p){
            generateResponse(true, 'Project fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Project', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Project', null, res);
    });
}

export function fetchProjectDetails(req, res) {
    let projectid = req.query.id;
    ProjectModel.findOne({where: {id: projectid}}).then(p => {
        if(p){
            generateResponse(true, 'Project Details fetched successfully', p, res);
        } else {
            generateResponse(true, 'Unable to fetch Project Details', null, res);
        }
    }).catch(ex => {
        console.log(ex);
        generateResponse(true, 'Unable to fetch Project Details', null, res);
    });
}

export function fileUpload(req, res){
    let files = req.files;
    if(files.length>0){
        files = files.forEach(item => {
            item.promiseStatus = false;
            return item;
        });
        files.forEach(item => {
            saveFile(item.originalname, FILE_TYPE.PROJECT, req.files[0].buffer).then(r => {
                if(r){
                    res.json({success: true});
                } else {
                    res.json({success: false});
                }
            });
        });
    }
}

export function uploadFiles(req, type){
    return new Promise((resolve, reject) => {
        let files = req.files;
        console.log(files);
        if(files.length>0){
            files = files.map(item => {
                item.promiseStatus = false;
                return item;
            });
            let resourceObjects = [];
            files.forEach(item => {
                saveFile(item.originalname, type, item.buffer).then(filename => {
                    if(filename){
                        item.promiseStatus = true;
                        let resourceType = getType(type);
                        resourceObjects.push({filename, type: resourceType, resourceid: 0, ceratedby: req.user.id});
                        if(isAllStatusResolved(files, 'promiseStatus')){
                            resolve(resourceObjects);
                        }
                    } else {
                        resolve(false);
                    }
                });
            });
        }
    });
}
