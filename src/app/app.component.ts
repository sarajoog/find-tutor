import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from './layout/components/navbar/navbar.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { LayoutService } from './layout/services/layout.service';
import { TopBarComponent } from './layout/components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private layoutService = inject(LayoutService);
  private router = inject(Router);
  
  isSidebarOpen = this.layoutService.isSidebarOpen;

  shouldShowAppContent(): boolean {
    return this.router.url === '/';
  }
}
