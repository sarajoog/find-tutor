import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private layoutService = inject(LayoutService);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  readonly user = this.authService.user;
  readonly isLoggedIn = this.authService.isLoggedIn;

  constructor() {
    // Debug auth state changes
    effect(() => {
      console.log('Auth state in navbar:', this.isLoggedIn());
      console.log('User in navbar:', this.user());
    });
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  navigateToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  navigateToContact() {
    this.router.navigate(['/pages/contact']);
  }

  navigateToAbout(): void {
    this.router.navigate(['/pages/about']);
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
} 