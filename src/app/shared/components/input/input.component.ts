import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

type ButtonType = "text" | "number" | "tel" | "email" | "password" | "date";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent  implements OnInit {

  @Input() label: string = "";
  @Input() control = new FormControl();
  @Input() type: ButtonType = "text";

  constructor() { }

  ngOnInit() {}

  public setValue(event: any){
    this.control.setValue(event.detail.value);
  }
}