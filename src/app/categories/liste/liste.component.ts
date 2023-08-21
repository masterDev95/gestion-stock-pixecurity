import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
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
  ) {}

  ngOnInit() {
    this.menu = document.getElementById('custom-menu')!;

    this.initCategoriesListening();
  }

  @HostListener('window:click')
  @HostListener('window:auxclick')
  @HostListener('window:blur')
  closeMenu() {
    if (this.menu.classList.contains('show')) {
      this.menu.classList.remove('show');
    }
  }

  openCategorieContextMenu(
    event: MouseEvent,
    categorieId: string,
    categorie: Categorie
  ) {
    event.preventDefault();

    this.refreshContextMenu(categorieId, categorie);

    this.menu.style.left = event.pageX - 12 + 'px';
    this.menu.style.top = event.pageY - 56 + 'px';
    this.menu.classList.add('show');
  }

  refreshContextMenu(categorieId: string, categorie: Categorie) {
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
}
