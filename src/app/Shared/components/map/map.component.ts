import { Component, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-map',
  imports: [],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  longitude = input<string>();
  latitude = input<string>();
  mapUrl?: SafeResourceUrl; // Changed type to SafeResourceUrl

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.latitude() && this.longitude()) {
      this.mapUrl = this.sanitizeUrl(
        this.generateMapUrl(this.latitude()!, this.longitude()!)
      );
    }
  }

  generateMapUrl(lat: string, lng: string): string {
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d220321.97112806153!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1732468230131`;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
