import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule, ScrollDetail } from '@ionic/angular';
import { FormComponent } from './form/form.component';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FormComponent,
    ResultsComponent,
  ],
})
export class SearchPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  transmissionData!: Object;
  showResults = false;
  showSearchBar = true;

  constructor() {}

  ngOnInit() {}

  receiveResults(results: Object) {
    this.transmissionData = results;
    this.showResults = true;
    this.showSearchBar = false
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

  openSearchBar() {
    this.showSearchBar = true;
  }
}
