/**
 * Created by ShayanAhmed on 12/7/16.
 */
'use strict';

import {Request, Response} from 'express';

export function DefaultHandler(req, res) {

    res.send('Home Handler');
}
