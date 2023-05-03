import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { FormComponent } from './form/form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.page.html',
  styleUrls: ['./detail-produit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FormComponent],
})
export class DetailProduitPage implements OnInit {
  selectedProduct: any;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => (this.selectedProduct = JSON.parse(params['product']))
    );
  }

  goToSearch() {
    this.navController.navigateForward(['tabs', 'search']);
  }
}
