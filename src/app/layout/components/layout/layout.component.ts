import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  template: `
    <div class="page-container" [class.sidebar-open]="layoutService.isSidebarOpen()">
      <app-navbar></app-navbar>
      <div class="content-container">
        <app-sidebar></app-sidebar>
        <div class="main-and-footer">
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
          <footer class="footer">
            <div class="about-us">
              <h3>ABOUT US</h3>
              <p>We are dedicated to providing the best service to our customers with modern solutions and innovative approaches.</p>
              <div class="social-links">
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-github"></i></a>
              </div>
            </div>
            <div class="quick-links">
              <h3>QUICK LINKS</h3>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div class="contact-info">
              <h3>CONTACT INFO</h3>
              <p><i class="fas fa-map-marker-alt"></i> 123 Business Ave, Suite 100</p>
              <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
              <p><i class="fas fa-envelope"></i> info&#64;myapp.com</p>
            </div>
            <div class="newsletter">
              <h3>NEWSLETTER</h3>
              <p>Subscribe to our newsletter for updates</p>
              <div class="subscribe-form">
                <input type="email" placeholder="Enter your email">
                <button>Subscribe</button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .content-container {
      display: flex;
      flex: 1;
      margin-top: 64px;
    }

    .main-and-footer {
      flex: 1;
      display: flex;
      flex-direction: column;
      transition: margin-left 0.3s ease;
    }

    .page-container.sidebar-open .main-and-footer {
      @media (max-width: 768px) {
        margin-left: 240px;
      }
      @media (min-width: 769px) {
        margin-left: 280px;
      }
    }

    .main-content {
      flex: 1;
      padding: 2rem;
      min-height: calc(100vh - 64px - 300px);
    }

    .footer {
      background: #2c3e50;
      color: white;
      padding: 3rem 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;

      h3 {
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }

      a {
        color: white;
        text-decoration: none;
        &:hover {
          color: #3498db;
        }
      }

      .social-links {
        margin-top: 1rem;
        display: flex;
        gap: 1rem;
        
        a {
          font-size: 1.5rem;
        }
      }

      ul {
        list-style: none;
        padding: 0;
        li {
          margin-bottom: 0.5rem;
        }
      }

      .subscribe-form {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;

        input {
          padding: 0.5rem;
          border: none;
          border-radius: 4px;
          flex: 1;
        }

        button {
          padding: 0.5rem 1rem;
          background: #3498db;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;

          &:hover {
            background: #2980b9;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .footer {
        grid-template-columns: 1fr;
        text-align: center;

        .social-links {
          justify-content: center;
        }

        .subscribe-form {
          flex-direction: column;
        }
      }
    }
  `]
})
export class LayoutComponent {
  layoutService = inject(LayoutService);
} 