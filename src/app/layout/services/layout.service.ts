import { Injectable, signal, inject, effect } from '@angular/core';
import { MenuItem } from '../models/menu.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
  private authService = inject(AuthService);
  private sidebarOpen = signal<boolean>(false);
  private menuItems = signal<MenuItem[]>([
    { title: 'Dashboard', link: '/dashboard', icon: 'fas fa-home' },
    { title: 'Analytics', link: '/analytics', icon: 'fas fa-chart-line' },
    { title: 'Products', link: '/products', icon: 'fas fa-box' },
    { title: 'Customers', link: '/customers', icon: 'fas fa-users' },
    { title: 'Orders', link: '/orders', icon: 'fas fa-shopping-cart' },
    { title: 'Settings', link: '/settings', icon: 'fas fa-cog' }
  ]);

  readonly isSidebarOpen = this.sidebarOpen.asReadonly();
  readonly getMenuItems = this.menuItems.asReadonly();

  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn() && window.innerWidth > 768) {
        this.sidebarOpen.set(true);
      } else {
        this.sidebarOpen.set(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        this.sidebarOpen.set(false);
      } else if (this.authService.isLoggedIn()) {
        this.sidebarOpen.set(true);
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen.update(state => !state);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  openSidebar() {
    this.sidebarOpen.set(true);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => {});
  }
} 