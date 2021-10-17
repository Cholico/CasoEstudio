import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

const appRoute: Routes = [
  {path: '', component: InicioComponent},
  {path: '/components/sidebar/sidebar.component', component: SidebarComponent}
]


export const appRoutingPorviders : any[]=[];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoute);

