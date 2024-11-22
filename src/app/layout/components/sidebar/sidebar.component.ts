import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  
  readonly isSidebarOpen = this.layoutService.isSidebarOpen;
  readonly menuItems = this.layoutService.getMenuItems;
  readonly isLoggedIn = this.authService.isLoggedIn;

  constructor() {
    // Handle auth state changes
    effect(() => {
      if (this.isLoggedIn()) {
        // When user logs in, open sidebar
        this.layoutService.openSidebar();
      } else {
        // When user logs out, close sidebar
        this.layoutService.closeSidebar();
      }
    });
  }
} 