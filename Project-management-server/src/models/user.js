'use strict';
import {sequelize} from '../database/config'
import {ROLES} from '../utilities/constants';

import {UserModel} from './index';

export class User {

    constructor(user){
        if(user != null){
            this.id = user.id;
            this.username = user.username;
            this.fname = user.fname;
            this.lname = user.lname;
            this.gender = user.gender;
            this.email = user.email;
            this.password = user.password;
            this.cnic = user.cnic;
            this.dob = user.dob;
            this.mobile = user.mobile;
            this.home = user.home;
            this.token = user.token;
            this.isactive = user.isactive;
            this.address = user.address;
            this.cityid = user.cityid;
            this.countryid = user.countryid;
        }
    }

    set id (id){
        this._id = id;
    }
    get id(){
        return this._id;
    }
    set username (username){
        this._username = username;
    }
    get username(){
        return this._username;
    }
    set fname (fname){
        this._fname = fname;
    }
    get fname(){
        return this._fname;
    }
    set lname (lname){
        this._lname = lname;
    }
    get lname(){
        return this._lname;
    }
    set gender (gender){
        this._gender = gender;
    }
    get gender(){
        return this._gender;
    }
    set email (email){
        this._email = email;
    }
    get email(){
        return this._email;
    }
    set cnic (cnic){
        this._cnic = cnic;
    }
    get cnic(){
        return this._cnic;
    }
    set dob (dob){
        this._dob = dob;
    }
    get dob(){
        return this._dob;
    }
    set mobile (mobile){
        this._mobile = mobile;
    }
    get mobile(){
        return this._mobile;
    }
    set home (home){
        this._home = home;
    }
    get home(){
        return this._home;
    }
    set isactive (isactive){
        this._isactive = isactive;
    }
    get isactive(){
        return this._isactive;
    }
    set address (address){
        this._address = address;
    }
    get address(){
        return this._address;
    }
    set cityid (cityid){
        this._cityid = cityid;
    }
    get cityid(){
        return this._cityid;
    }
    set countryid (countryid){
        this._countryid = countryid;
    }
    get countryid(){
        return this._countryid;
    }

    toObject(){
        return {
            username: this.username,
            fname: this.fname,
            lname: this.lname,
            gender: this.gender,
            email: this.email,
            cnic: this.cnic,
            dob: this.dob,
            mobile: this.mobile,
            home: this.home,
            token: this.token,
            isactive: this.isactive,
            address: this.address,
            cityid: this.cityid,
            countryid: this.countryid
        };
    }

    add() {
        return UserModel.create(this.toObject());
    }
}


export function getPatientDiseases(patientid){
    let query = `select u.fname as name, d.title as diseases, d.id as diseaseid  from med_patient_diseases as pd
        inner join med_patient_infos as p on p.id=pd.patientid
        inner join med_users as u on u.id=p.userid
        inner join med_diseases as d on d.id=pd.diseaseid
        where p.id=? AND pd.status=true`;
    return sequelize.query(query, { replacements: [patientid], type: sequelize.QueryTypes.SELECT });
}

export function getPatientVisitHistory(patientid){
    let query = `select pv.id as visitid, up.username as patient, ud.username as doctor, pv.diagnosis, pv.treatmentplan, pv.description, pv.createdAt
            from med_patient_visits as pv
            inner join med_patient_infos as p on p.id=pv.patientid
            inner join med_users as up on p.userid = up.id
            inner join med_doctor_infos as d on d.id=pv.doctorid
            inner join med_users as ud on d.userid = ud.id
            where p.id=?`;
    return sequelize.query(query, { replacements: [patientid], type: sequelize.QueryTypes.SELECT });
}

export function getPatientBillingHistory(patientid){
    let query = `select b.*, up.fname as name from med_billings as b
            inner join med_patient_infos as p on p.id=b.patientid
            inner join med_users as up on p.userid = up.id
            where p.id=?`;
    return sequelize.query(query, { replacements: [patientid], type: sequelize.QueryTypes.SELECT });
}

export function searchUser(param, role){
    let query = '';
    let replacements = [];
    if(role == null){
        query = `SELECT u.* FROM med_users as u
                    INNER JOIN med_user_roles as ur on u.id = ur.userid
                    WHERE 
                    u.id=? 
                    OR u.fname LIKE ? 
                    OR u.fname LIKE ? 
                    OR u.lname LIKE ? 
                    OR u.lname LIKE ? 
                    OR u.username=? 
                    OR u.cnic=? 
                    OR u.address=? 
                    OR u.mobile=? 
                    OR u.home=? 
                    OR u.gender=?`;
        replacements = [param, param, param+'_%', param, param+'_%', param, param, param, param, param, param];
    } else {
        query = `SELECT u.* FROM med_users as u
                INNER JOIN med_user_roles as ur on u.id = ur.userid
                WHERE (u.id=? OR u.fname LIKE ? OR u.lname LIKE ? OR u.username=? OR u.cnic=? OR u.address=? OR u.mobile=? OR u.home=? OR u.gender=?) AND ur.roleid=?`;
        replacements = [param, param, param, param, param, param, param, param, param, role];
}
    return sequelize.query(query, { replacements, type: sequelize.QueryTypes.SELECT });
}

export function getPatientDrugHistory(patientid, visitid=''){
    let query = `SELECT ud.username as doctor, up.username as patient, m.title as medicine, pv.createdAt, pd.times, pd.days, pd.remarks
            FROM med_erp.med_patient_drugs as pd
            inner join med_medicines as m on pd.medicineid = m.id
            inner join med_patient_visits as pv on pv.id=pd.visitid
            inner join med_patient_infos as p on p.id = pv.patientid
            inner join med_users as up on up.id=p.userid
            inner join med_doctor_infos as d on d.id = pv.doctorid
            inner join med_users as ud on ud.id=d.userid
            where p.id=? AND pv.id=?`;
    return sequelize.query(query, { replacements: [patientid, visitid], type: sequelize.QueryTypes.SELECT });
}

export function getAllTransactions(){
    let query = `Select b.*, u.fname, u.lname, u.id as userid from med_billings as b
                inner join med_patient_infos p on p.id = b.patientid
                inner join med_users u on u.id = p.userid`;
    return sequelize.query(query, { replacements: [], type: sequelize.QueryTypes.SELECT });
}

export function getVisitedPatientsData(limit){
    let query = `Select pv.*, u.fname as firstname, u.lname as lastname, u.mobile, u.home from med_patient_visits as pv
                inner join med_patient_infos p on p.id = pv.patientid
                inner join med_users u on u.id = p.userid ORDER BY pv.createdAt DESC LIMIT ?`;
    return sequelize.query(query, { replacements: [limit], type: sequelize.QueryTypes.SELECT });
}

export function getUsersOfRole(role){
    let query = `SELECT u.* from pm_users as u
                inner join pm_user_roles as ur on (ur.userid = u.id AND ur.roleid=?)`;
    return sequelize.query(query, { replacements: [role], type: sequelize.QueryTypes.SELECT });
}

export function getTodayVisitedPatientsData(){
    let query = `Select pv.*, u.fname as firstname, u.lname as lastname, u.mobile, u.home from med_patient_visits as pv
                inner join med_patient_infos p on p.id = pv.patientid
                inner join med_users u on u.id = p.userid WHERE pv.createdAt>=? AND pv.createdAt<=? `;
    let lessThan = new Date();
    lessThan.setHours(23);
    lessThan.setMinutes(59);
    lessThan.setSeconds(59);
    lessThan.setMilliseconds(59);
    let greaterThan = new Date(new Date() - 24 * 60 * 60 * 1000);
    greaterThan.setHours(0);
    greaterThan.setMinutes(0);
    greaterThan.setSeconds(0);
    greaterThan.setMilliseconds(0);
    return sequelize.query(query, { replacements: [greaterThan, lessThan], type: sequelize.QueryTypes.SELECT });
}
