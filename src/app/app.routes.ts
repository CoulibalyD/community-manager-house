import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('../app/modules/pages/home/home.routes').then(m => m.default) },
  { path: 'home', loadChildren: () => import('../app/modules/pages/home/home.routes').then(m => m.default) },
  { path: 'about', loadChildren: () => import('../app/modules/pages/about/about.routes').then(m => m.default) },
  { path: 'contact', loadChildren: () => import('../app/modules/pages/contact/contact.routes').then(m => m.default) },
  { path: 'portfolio', loadComponent: () => import('../app/modules/pages/portfolio/portfolio.component').then(m => m.PortfolioComponent) },
  { path: 'services', loadChildren: () => import('../app/modules/pages/nos-services/nos-services.routes').then(m => m.default) },
  { path: '**',redirectTo: '', pathMatch: 'full', loadChildren: () => import('../app/modules/pages/home/home.routes').then(m => m.default) },
];
