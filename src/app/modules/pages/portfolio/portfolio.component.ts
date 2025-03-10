import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  categories = ['Tous', 'Social Media', 'Design', 'Vidéo', 'Marketing'];
  selectedCategory = 'Tous';

  projects = [
    { title: 'Campagne Instagram', category: 'Social Media', image: 'assets/images/1.jpg' },
    { title: 'Logo & Branding', category: 'Design', image: 'assets/images/2.jpg' },
    { title: 'Spot publicitaire', category: 'Vidéo', image: 'assets/images/3.jpg' },
    { title: 'Campagne Facebook Ads', category: 'Marketing', image: 'assets/images/4.jpg' },
    { title: 'Rebranding Startup', category: 'Design', image: 'assets/images/5.jpg' },
    { title: 'Motion Design', category: 'Vidéo', image: 'assets/images/6.jpg' }
  ];

  get filteredProjects() {
    if (this.selectedCategory === 'Tous') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
