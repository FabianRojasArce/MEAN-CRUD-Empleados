import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [
  ]
})
export class NavBarComponent {

  toggle = 'light'

  toggleTheme() {
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
          this.toggle = 'dark'
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
      } else {
          this.toggle = 'light'
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
      }

      // if NOT set via local storage previously
  } else {
      if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
          this.toggle = 'light'
      } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
          this.toggle = 'dark'
      }
  }
  }
}
