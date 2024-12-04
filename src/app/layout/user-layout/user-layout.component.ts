import { Component } from '@angular/core';
import { HeaderComponent } from "../../Shared/components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../Shared/components/footer/footer.component";

@Component({
  selector: 'app-user-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  standalone:true,
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
