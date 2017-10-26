import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class RepresentativeService {
    
    constructor(private http: Http) { }

    getRepresentatives(formVal: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('address', formVal.search);
        return this.http.get('api/google/civic',{
            params: params
        }).map((res: Response) => {
            return res.json();
        }).catch((error: Response) => {
            console.log('representative service error',error);
            return Observable.throw(error);
        });
    } 
}