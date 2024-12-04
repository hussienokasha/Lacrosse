import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { LoaderComponent } from "./Core/utils/loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  
  ngOnInit(): void {

    AOS.init({
      duration: 1000, // Default duration for animations
      easing: 'ease-in-out', // Easing function
    });
  }
}
