import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { AboutPageComponent } from './pages/aboutPage/aboutPage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';



@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    SidebarComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    SidebarComponent,
    SearchBoxComponent
  ]
})
export class SharedModule { }
