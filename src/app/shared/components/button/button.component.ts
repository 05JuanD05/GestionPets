import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type colorButton = "success" | "danger";
type buttonType = "button" | "submit";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {

  @Input({required: true}) value = "";
  @Input() type: buttonType = "button";
  @Input() color: colorButton = "danger";
  @Input() disabled = false;

  @Output() doClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  click() {
    this.doClick.emit(true);
  }

}