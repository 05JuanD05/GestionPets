import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  petsForm: FormGroup;
  userId!: string;

  constructor(
  private formBuilder: FormBuilder, 
  ){

  this.petsForm = this.formBuilder.group({
    name: ['', Validators.required],
    breed: ['', Validators.required],
    age: ['', Validators.required],
    birthdate: ['', Validators.required],
  });
  }

  ngOnInit(): void {
  }

}