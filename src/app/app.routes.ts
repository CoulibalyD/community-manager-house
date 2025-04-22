import { Routes } from '@angular/router';
import { AuthGuard } from './modules/admin/guards/auth-guard.guard';
import { RoleGuard } from './modules/admin/guards/role-guard.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./modules/pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'home', loadComponent: () => import('./modules/pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./modules/pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./modules/pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'portfolio', loadComponent: () => import('./modules/pages/portfolio/portfolio.component').then(m => m.PortfolioComponent) },
  { path: 'services', loadComponent: () => import('./modules/pages/nos-services/nos-services.component').then(m => m.NosServicesComponent) },

  {
    path: 'events',
    loadComponent: () => import('./modules/pages/events/events.component').then(m => m.EventsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' } // ou DIRECTEUR si tu veux
  },
  {
    path: 'events-publics',
    loadComponent: () => import('./modules/pages/public-events/public-events.component').then(m => m.PublicEventsComponent)
  },

  {
    path: 'admin-panel',
    loadComponent: () => import('./modules/admin/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },

  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./modules/pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },

  // ❗ Important : la dernière route doit être un fallback SANS loadComponent/loadChildren
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
