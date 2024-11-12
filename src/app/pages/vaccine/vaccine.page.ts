import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
export class VaccinePage implements OnInit {

  public name!: FormControl;
  public date!: FormControl;
  public certificado!: FormControl;
  public id: string = "";
  public agregarForm!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}

