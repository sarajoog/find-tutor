import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

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
} 