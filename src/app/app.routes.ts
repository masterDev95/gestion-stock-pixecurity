import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./categories/categories.page').then(
                (m) => m.CategoriesPage
              ),
          },
          {
            path: 'ajout-categorie',
            loadComponent: () =>
              import('./ajout-categorie/ajout-categorie.page').then(
                (m) => m.AjoutCategoriePage
              ),
          },
          {
            path: 'detail-categorie',
            loadComponent: () => import('./detail-categorie/detail-categorie.page').then( m => m.DetailCategoriePage)
          },
          {
            path: 'detail-produit',
            loadComponent: () =>
              import('./detail-produit/detail-produit.page').then(
                (m) => m.DetailProduitPage
              ),
          },
        ],
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./search/search.page').then((m) => m.SearchPage),
          },
          {
            path: 'detail-produit',
            loadComponent: () =>
              import('./detail-produit/detail-produit.page').then(
                (m) => m.DetailProduitPage
              ),
          },
        ],
      },
      {
        path: 'new',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./ajout-produit/ajout-produit.page').then(
                (m) => m.AjoutProduitPage
              ),
          },
          {
            path: 'detail-produit',
            loadComponent: () =>
              import('./detail-produit/detail-produit.page').then(
                (m) => m.DetailProduitPage
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'axonaut',
    loadComponent: () =>
      import('./test/axonaut/axonaut.page').then((m) => m.AxonautPage),
  },
];
