import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.page.html',
  styleUrls: ['./ajout-produit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FormComponent],
})
export class AjoutProduitPage implements OnInit {
  @ViewChild(FormComponent) form!: FormComponent;

  constructor() { }

  ngOnInit() {
  }

  onValid() {
    this.form.onValid();
  }
}
