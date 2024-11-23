import { Component, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '@core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private layoutService = inject(LayoutService);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  readonly user = this.authService.user;
  readonly isLoggedIn = this.authService.isLoggedIn;
  private mobileBreakpoint = 768;

  constructor() {
    window.addEventListener('resize', this.checkMobileView.bind(this));
  }

  isMobileView(): boolean {
    return window.innerWidth <= this.mobileBreakpoint;
  }

  private checkMobileView() {
    if (!this.isMobileView() && !this.isLoggedIn()) {
      this.layoutService.closeSidebar();
    }
  }

  toggleSidebar() {
    if (this.isMobileView() || this.isLoggedIn()) {
      this.layoutService.toggleSidebar();
    }
  }

  navigateToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  navigateToTutors() {
    this.router.navigate(['/pages/tutors']);
  }

  navigateToCourses() {
    this.router.navigate(['/pages/courses']);
  }

  navigateToApply() {
    this.router.navigate(['/pages/apply']);
  }

  navigateToFindTutor() {
    this.router.navigate(['/pages/find-tutor']);
  }

  navigateToPrices() {
    this.router.navigate(['/pages/prices']);
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkMobileView.bind(this));
  }
} 