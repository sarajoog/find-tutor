import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private mobileBreakpoint = 768;
  
  readonly isSidebarOpen = this.layoutService.isSidebarOpen;
  readonly menuItems = this.layoutService.getMenuItems;
  readonly isLoggedIn = this.authService.isLoggedIn;

  isMobileView(): boolean {
    return window.innerWidth <= this.mobileBreakpoint;
  }

  constructor() {
    effect(() => {
      if (this.isLoggedIn()) {
        this.layoutService.openSidebar();
      } else {
        this.layoutService.closeSidebar();
      }
    });
  }

  // Navigation methods
  navigateToSignIn() {
    this.router.navigate(['/auth/sign-in']);
    this.layoutService.closeSidebar();
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
    this.layoutService.closeSidebar();
  }

  navigateToContact() {
    this.router.navigate(['/pages/contact']);
    this.layoutService.closeSidebar();
  }

  navigateToAbout() {
    this.router.navigate(['/pages/about']);
    this.layoutService.closeSidebar();
  }

  async logout() {
    try {
      await this.authService.logout();
      this.layoutService.closeSidebar();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
} 