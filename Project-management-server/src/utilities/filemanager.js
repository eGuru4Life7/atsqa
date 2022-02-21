var fs = require('fs');
import config from "../conf";
import {getCurrentTimestamp} from '../utilities/index';


export function saveFile(name, type, data){
    return new Promise((resolve, reject) => {
        name = getCurrentTimestamp()+'_'+name;
        let filename = type + name;
        fs.writeFile(filename, data, function(err) {
            if(err) {
                return console.log(err);
                resolve(false);
            } else {
                resolve(filename);
            }
        });
    });
}