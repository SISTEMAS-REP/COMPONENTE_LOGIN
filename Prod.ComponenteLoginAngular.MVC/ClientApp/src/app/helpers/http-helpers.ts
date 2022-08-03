import * as CryptoJS from 'crypto-js';
import axios from 'axios';
import { DomSanitizer } from '@angular/platform-browser';

export const DEFAULT_INTERNAL_ERROR = { msg: 'Ocurrió un error interno', statuscode: 500 };
export const Key = {Token: null, IsSecure: null};

const isJSON = item => {
    item = typeof item !== 'string' ? JSON.stringify(item) : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === 'object' && item !== null) {
        return true;
    }

    return false;
};
const Reverse = dataModel => {
    const separetors = [
        'xZxS%jqm',
        'nr%Ft1Jr',
        '60Vc%UNh',
        '6e9hv9%M',
        'K%NZThUV',
        'JT%WG5aU',
        'hn8q%xb4',
        'QO1%qim9',
        'EjuRBck%',
        'eX1%P2Gd'
    ];
    const characters = { a: 0, B: 1, X: 2, D: 3, e: 4, '%': 5, g: 6, H: 7, i: 8, Z: 9 };
    const exacto = { separetor: '', pos: -1 };

    for (var j = 0, x = separetors.length; j < x; j++) {
        var sepa = separetors[j];
        exacto.pos = dataModel.lastIndexOf(sepa);
        if (exacto.pos > 1) {
            exacto.separetor = sepa;
            break;
        }
    }

    var reCadena = dataModel.substr(exacto.pos + exacto.separetor.length, 16);

    let stringArray = [...reCadena];
    let values = [];
    for (var i = 0, l = stringArray.length; i < l; i++) {
        values.push(characters[stringArray[i]]);
    }
    const arrString = values.join('');
    return {
        Separetor: exacto.separetor,
        Key1: reCadena,
        Key2: arrString
    };
};
export const EncodeData = (text, pkey) => {
    if (text === null) {
        return null;
    }
    if (text === undefined) {
        return undefined;
    }
    if (text.replace(/^\s+|\s+$/gm, '') === '') {
        return text;
    }
    const key = CryptoJS.enc.Utf8.parse(pkey);

    text = CryptoJS.enc.Utf8.parse(text);

    const result = CryptoJS.AES.encrypt(text, key, {
        keySize: 128 / 8,
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const encrypted = result.toString();
    return encodeURIComponent(encrypted);
}
export const DecodeData = (encryptedText, pkey) => {
    if (encryptedText === null) {
        return null;
    }
    if (encryptedText === undefined) {
        return undefined;
    }

    if (encryptedText.replace(/^\s+|\s+$/gm, '') === '') {
        return encryptedText;
    }

    const key = CryptoJS.enc.Utf8.parse(pkey);

    encryptedText = decodeURIComponent(encryptedText);

    const result = CryptoJS.AES.decrypt(encryptedText, key, {
        keySize: 128 / 8,
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const decrypted = result.toString(CryptoJS.enc.Utf8);
    
    return decrypted;
};
export const encryptedData = true;
export const ParseResponse = r => {

    let objData = null;
    const dataModelText = r.DataModel;
    if (dataModelText != undefined) {
        const keys = Reverse(dataModelText);
        const ndata = dataModelText.replace(keys.Separetor + keys.Key1, '');
        const jsonStringData = DecodeData(ndata, keys.Key2);

        if (isJSON(jsonStringData)) {
            objData = JSON.parse(jsonStringData);
        } else {
            objData = jsonStringData;
        }
    } else {
        throw DEFAULT_INTERNAL_ERROR;
    }
    return objData;
};
const initHelper = async () => {
    axios.get('/Account/Boot').then(resp => {
        let data = ParseResponse(resp.data);
        Key.IsSecure = data!.IsSecure;
        Key.Token = data!.Token;
    });
}
export const Bootstrapper = () =>{
    return Key;
}
export const ObjToQS = (obj, noToken = false) => {

    obj = (obj === null || obj === undefined) ? {} : obj;
    noToken = (noToken === null || noToken === undefined) ? false : noToken;

    if (Key !== null && Key.IsSecure && noToken == false) {
        var pp = JSON.stringify(obj);
        var ndata = EncodeData(pp, Key.Token);
        var route = 'var=' + ndata;
        return route;
    } else {
        var k = Object.keys(obj);
        var s = '';
        for (var i = 0; i < k.length; i++) {
            s += k[i] + '=' + encodeURIComponent(obj[k[i]]);
            if (i !== k.length - 1) s += '&';
        }        return s;
    }
}

if (encryptedData) initHelper();
