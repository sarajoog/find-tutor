import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menu.model';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private sidebarOpen = signal<boolean>(false);
  private menuItems = signal<MenuItem[]>([
    { title: 'Dashboard', link: '/dashboard', icon: 'fas fa-home' },
    { title: 'Analytics', link: '/analytics', icon: 'fas fa-chart-line' },
    { title: 'Products', link: '/products', icon: 'fas fa-box' },
    { title: 'Customers', link: '/customers', icon: 'fas fa-users' },
    { title: 'Orders', link: '/orders', icon: 'fas fa-shopping-cart' },
    { title: 'Settings', link: '/settings', icon: 'fas fa-cog' }
  ]);

  #userSignal = signal<User | null>(null);
  user = this.#userSignal.asReadonly();

  readonly isSidebarOpen = this.sidebarOpen.asReadonly();
  readonly getMenuItems = this.menuItems.asReadonly();

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen.update(state => !state);
  }

  logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(null);
    this.router.navigateByUrl('/');
  }
  
} 