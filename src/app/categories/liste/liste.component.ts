import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { Unsubscribe } from 'firebase/firestore';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'categories-liste',
  styleUrls: ['./liste.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: 'liste.component.html',
})
export class ListeComponent implements OnInit, OnDestroy {
  /** Représente une liste de références d'éléments HTML de type ion-card. */
  @ViewChildren('targetElement') cardElements!: QueryList<
    ElementRef<HTMLElement>
  >;

  /** Collection des catégories. */
  collectionCategories: { [key: string]: Categorie } = {};
  /** Fonction de désabonnement de l'écoute des catégories. */
  unsubCategoriesListen!: Unsubscribe;
  listeFonctionsContextMenu: {
    name: string;
    action: () => void;
    icon?: string;
    bold?: boolean;
    iconColor?: string;
  }[] = [];
  menu!: HTMLElement;

  /** Objet pour utiliser la fonction Object dans le template. */
  Object = Object;

  constructor(
    private categorieService: CategorieService,
    private navController: NavController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.menu = document.getElementById('custom-menu')!;

    this.initCategoriesListening();
  }

  /**
   * Affiche une alerte de confirmation pour la suppression d'une catégorie.
   * @param categorieId L'identifiant de la catégorie à supprimer.
   * @param categorieName Le nom de la catégorie à supprimer.
   */
  async alerteSuppression(categorieId: string, categorieName: string) {
    const alert = await this.alertController.create({
      header: 'Attention',
      subHeader: 'La suppression sera immédiate et irrécupérable.',
      message: `Voulez-vous vraiment supprimer la catégorie ${categorieName}?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          role: 'confirm',
          handler: () => this.deleteCategorie(categorieId),
        },
      ],
    });

    await alert.present();
  }

  /**
   * Fonction pour afficher un message éphémère.
   * @param message Le message à afficher.
   */
  async presentToastUpdate(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  /**
   * Fonction qui gère la fermeture du menu contextuel en réponse à certains événements.
   * Si le menu est affiché, il est masqué lorsque l'utilisateur effectue un clic normal,
   * un clic auxiliaire (clic avec le bouton droit) ou que la fenêtre perd le focus.
   */
  @HostListener('window:click')
  @HostListener('window:auxclick')
  @HostListener('window:blur')
  closeMenu() {
    if (this.menu.classList.contains('show')) {
      this.menu.classList.remove('show');
    }
  }

  /**
   * Ouvre le menu contextuel pour une catégorie spécifique en réponse à un clic droit.
   * @param event L'événement de clic droit.
   * @param categorieId L'ID de la catégorie à laquelle le menu contextuel est associé.
   * @param categorie Les détails de la catégorie.
   */
  openCategorieContextMenu(
    event: MouseEvent,
    categorieId: string,
    categorie: Categorie
  ) {
    event.preventDefault();

    // Actualise le contenu du menu contextuel en fonction de la catégorie
    this.refreshContextMenu(categorieId, categorie);

    // Positionne le menu contextuel à l'endroit où le clic droit a été effectué
    this.menu.style.left = event.pageX - 12 + 'px';
    this.menu.style.top = event.pageY - 56 + 'px';

    // Affiche le menu contextuel
    this.menu.classList.add('show');
  }

  /**
   * Actualise le contenu du menu contextuel en fonction de la catégorie sélectionnée.
   * @param categorieId L'ID de la catégorie.
   * @param categorie Les détails de la catégorie.
   */
  refreshContextMenu(categorieId: string, categorie: Categorie) {
    // Crée une liste de fonctions pour le menu contextuel en fonction de la catégorie
    this.listeFonctionsContextMenu = [
      {
        name: `Voir les produits`,
        action: () => this.openCategorie(categorie),
        bold: true,
      },
      {
        name: `Modifier ${categorie.name}`,
        action: () => this.editCategorie(categorieId, categorie),
        icon: 'create-outline',
        iconColor: 'warning',
      },
      {
        name: `Supprimer ${categorie.name}`,
        action: () => this.alerteSuppression(categorieId, categorie.name),
        icon: 'trash-outline',
        iconColor: 'danger',
      },
    ];
  }

  /**
   * Initialise l'écoute des catégories.
   */
  private initCategoriesListening() {
    this.unsubCategoriesListen = this.categorieService.listenToCollection();
    this.categorieService.collectionSubject.subscribe(
      (categories) => (this.collectionCategories = categories)
    );
  }

  /**
   * Effectue les opérations de nettoyage lors de la destruction du composant.
   */
  ngOnDestroy() {
    this.unsubCategoriesListen();
  }

  /**
   * Ouvre la catégorie spécifiée.
   * @param categorie La catégorie à ouvrir.
   */
  openCategorie(categorie: Categorie) {
    this.navController.navigateForward(
      ['tabs', 'categories', 'liste-produits'],
      { state: { categorie } }
    );
  }

  /**
   * Ouvre la catégorie spécifiée.
   * @param categorieId L'ID de la catégorie.
   * @param categorie La catégorie à ouvrir.
   */
  editCategorie(categorieId: string, categorie: Categorie) {
    this.navController.navigateForward(
      ['tabs', 'categories', 'detail-categorie'],
      { state: { id: categorieId, categorie } }
    );
  }

  /**
   * Supprime une catégorie en utilisant le service de catégorie.
   * Affiche un message toast en cas de succès ou d'erreur.
   * @param categorieId L'ID de la catégorie à supprimer.
   */
  deleteCategorie(categorieId: string) {
    this.categorieService
      .deleteCategorie(categorieId)
      .then(() => this.presentToastUpdate('La catégorie à bien été supprimée!'))
      .catch(() =>
        this.presentToastUpdate(
          'Une erreur est survenue pendant la suppression.'
        )
      );
  }
}
