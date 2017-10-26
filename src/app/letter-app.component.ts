import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LetterService } from './services/letter.service';
import { RepresentativeService } from './services/representative.service';

@Component({
    selector: 'letter-app',
    templateUrl: 'letter-app.html'
})
export class LetterAppComponent implements OnInit {

    representativeForm: FormGroup;
    letterForm: FormGroup;
    states: string[];
    letterURL: string;
    searchErrorMsg: string;
    letterErrorMsg: string;

    constructor(private letterService: LetterService, 
                private representativeService: RepresentativeService,
                private fb: FormBuilder) {
                    this.states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
                    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
                    "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX",
                    "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
                }

    ngOnInit() { 
        this.createRepresentForm();
        this.createLetterForm();
    }

    createRepresentForm() {
        this.representativeForm = this.fb.group({
            search: ['', Validators.required]
        })
    }

    createLetterForm() {
        this.letterForm = this.fb.group({
            to: this.fb.group({
                name: ['', Validators.required],
                address_line1: ['', Validators.required],
                address_line2: '',
                address_city: ['', Validators.required],
                address_state: ['', Validators.required],
                address_zip: ['', Validators.required]
            }),
            from: this.fb.group({
                name: ['', Validators.required],
                address_line1: ['', Validators.required],
                address_line2: '',
                address_city: ['', Validators.required],
                address_state: ['', Validators.required],
                address_zip: ['', Validators.required]
            }),
            message: ['', [Validators.required , Validators.maxLength(200)]]
        })
    }

    searchRepresent(event: Event){
        event.preventDefault();
        this.searchErrorMsg = '';
        this.representativeService.getRepresentatives(this.representativeForm.value).subscribe(
            res => {
                this.letterForm.patchValue({
                    to:res
                    
                })
            },
            err => {
                this.searchErrorMsg = 'Cannot find representative information, please check your input address';
                this.letterForm.get('to').reset();
            }
        );
    }

    sendLetter(event: Event){
        event.preventDefault();
        this.letterURL = '';
        this.letterErrorMsg = '';
        this.letterService.sendLetter(this.letterForm.value).subscribe(
            res => {
                this.letterURL = res.url;
            },
            err => {
                this.letterErrorMsg = 'Send letter failed, please check input';
            }
        );
    }

    viewLetter(event: Event){
        event.preventDefault();
        window.open(this.letterURL, '_blank');
    }

}