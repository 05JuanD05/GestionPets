import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
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
  imageSrc1: any;
  imageSrc2: any;
  filePath: any;

  constructor() { }

  ngOnInit() {
  }
  pickFiles = async () => {
    const result = await FilePicker.pickFiles({
      types: ['image/png'],
      readData: true
    });

    this.filePath = result.files[0].path;
    this.imageSrc1 = 'data:image/jpeg;base64,' + result.files[0].data;
  }

  pickImages = async () => {
    const result = await FilePicker.pickImages({
      readData: true
    });

    this.imageSrc1 = 'data:image/jpeg;base64,' + result.files[0].data;
    this.imageSrc2 = 'data:image/jpeg;base64,' + result.files[1].data;
  };

  pickPDFiles = async () => {
    const result = await FilePicker.pickFiles({
      types: ['aplication/pdf'],
      readData: true
    });

    result ? this.filePath = result.files[0].path : alert("No file path")
  }

  pickVideo = async () => {
    try {
      const result = await FilePicker.pickFiles({
        types: ['video/mp4']
      });

      this.filePath = result.files[0].path;
    } catch (error) {
      alert(JSON.stringify(error))
    }
  };

  openFile = async () => {
    try {
      await FileOpener.openFile({
        path: this.filePath,
      });
    } catch (error) {
      alert(error)
    };
  }

}

