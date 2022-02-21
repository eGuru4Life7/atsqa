'use strict';
import {sequelize} from '../database/config'
import {ROLES} from '../utilities/constants';



export function getAllProjectRequirements(projectid){
    let query = `SELECT pr.*, u.fname, u.lname FROM pm_project_requirements AS pr
                INNER JOIN pm_users AS u ON u.id=pr.assigneeid
                WHERE pr.projectid=?`;
    return sequelize.query(query, { replacements: [projectid], type: sequelize.QueryTypes.SELECT });
}

export function getAllModuleRequirements(moduleid){
    let query = `SELECT pr.*, u.fname, u.lname FROM pm_project_requirements AS pr
                INNER JOIN pm_users AS u ON u.id=pr.assigneeid
                WHERE pr.moduleid=?`;
    return sequelize.query(query, { replacements: [moduleid], type: sequelize.QueryTypes.SELECT });
}

export function getAllRequirementDeveloper(moduleid){
    let query = `SELECT u.* FROM pm_project_requirements AS pr
                INNER JOIN pm_users AS u ON u.id=pr.assigneeid
                WHERE pr.moduleid=?`;
    return sequelize.query(query, { replacements: [moduleid], type: sequelize.QueryTypes.SELECT });
}


