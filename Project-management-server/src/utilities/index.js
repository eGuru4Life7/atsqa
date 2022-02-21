import {FILE_TYPE} from '../utilities/constants';

export const STATUS_CODE= {
    NOT_FOUND: 404,
    OK: 200,
    BAD_GATEWAY: 502
}

export function parseBody(req) {
    let obj;
    if (typeof req.body === 'object') {
        obj = req.body;
    } else {
        obj = JSON.parse(req.body);
    }

    return obj;
}

export function getType(type){
    let fileType = '';
    switch(type){
        case FILE_TYPE.PROJECT:
            fileType = 'project';
        break;
        case FILE_TYPE.MODULES:
            fileType = 'modules';
        break;
        case FILE_TYPE.SPECIFICATION:
            fileType = 'specification';
        break;
    }
    return fileType;
}

export function isAllStatusResolved(itemArray, element){
    let flag = false;
    for(var i = 0; i< itemArray.length; i++){
        if(itemArray[i][element] == false){
            flag = false;
            break;
        } else {
            flag = true;
        }
    }
    return flag;
}

export function getModifiedObjectToUpdateUser(userObject){
    delete userObject.id;
    delete userObject.password;
    delete userObject.username;
    delete userObject.email;
    delete userObject.isactive;
    return userObject;
}

export function generateResponse(success, message, data, res){
    res.json({success, message, data});
}

export function getCurrentTimestamp(){
    let date = new Date();
    return date.getTime();
}