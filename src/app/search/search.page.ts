import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';
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
  view: 'form' | 'results' = 'form';

  constructor() {}

  ngOnInit() {}

  receiveResults(results: Object) {
    this.transmissionData = results;
    this.view = 'results';
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }
}
