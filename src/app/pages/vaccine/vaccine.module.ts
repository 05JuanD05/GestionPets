import { NgModule } from '@angular/core';
import { VaccinePageRoutingModule } from './vaccine-routing.module';
import { VaccinePage } from './vaccine.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    VaccinePageRoutingModule
  ],
  declarations: [VaccinePage]
})
export class VaccinePageModule {}
