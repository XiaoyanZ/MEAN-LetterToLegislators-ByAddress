import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class LetterService {

    constructor(private http: Http) {   }

    sendLetter(formVal: any): Observable<any>{
        return this.http.post('api/lob/letter',{
            to: formVal.to,
            from: formVal.from,
            message: formVal.message
        }).map((res: Response) => {
            return res.json();
        }).catch((error: Response) => {
            console.log('letter service error',error);
            return Observable.throw(error);
        });
    }

}