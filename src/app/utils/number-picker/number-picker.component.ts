import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class NumberPickerComponent implements OnInit {
  /** Le nombre à afficher et modifier */
  @Input() number!: number;
  /** Le nombre maximum de chiffres autorisé pour le nombre */
  @Input() maxNbOfDigits!: number;

  /** La taille de chaque colonne */
  colSize = 2.25;
  /** Le tableau contenant chaque chiffre du nombre */
  digits!: number[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Décomposition du nombre en chiffres
    this.digits = this.number.toString().split('').map(Number);

    // Si le nombre de chiffres est supérieur au nombre maximum autorisé, on affiche une erreur
    if (this.digits.length > this.maxNbOfDigits) {
      console.error(
        'La taille du nombre est plus grand que la taille max définie'
      );
      return;
    }

    // Ajout de zéros en début de tableau si nécessaire pour obtenir le nombre de chiffres maximum
    while (this.digits.length < this.maxNbOfDigits) {
      this.digits.unshift(0);
    }
  }

  /**
   * Augmente le chiffre à l'index donné si le chiffre est 9, il sera remis à 0
   * @param index L'index du chiffre à augmenter
   */
  increaseDigit(index: number) {
    if (this.digits[index] > 8) {
      this.digits[index] = 0;
      return;
    }

    this.digits[index]++;
  }

  /**
   * Diminue le chiffre à l'index donné si le chiffre est 0, il sera remis à 9
   * @param index L'index du chiffre à diminuer
   */
  decreaseDigit(index: number) {
    if (this.digits[index] < 1) {
      this.digits[index] = 9;
      return;
    }

    this.digits[index]--;
  }

  /**
   * Ferme la modal sans sauvegarder
   */
  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  /**
   * Sauvegarde le nombre modifié et ferme la modal
   */
  save() {
    // Initialisation de la variable qui contiendra la nouvelle valeur numérique
    let newNumber = 0;

    // Boucle sur les chiffres sélectionnés par l'utilisateur, de droite à gauche
    for (let i = this.digits.length - 1; i >= 0; i--) {
      // Ajout de la valeur du chiffre multipliée par la puissance de 10 correspondant à sa position
      newNumber += this.digits[i] * Math.pow(10, this.digits.length - 1 - i);
    }

    // Fermeture du modal et renvoi de la nouvelle valeur numérique via la fonction `dismiss()` de `ModalController`
    return this.modalController.dismiss(newNumber, 'save');
  }
}
