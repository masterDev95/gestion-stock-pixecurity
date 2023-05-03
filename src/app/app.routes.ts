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
        ]
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
