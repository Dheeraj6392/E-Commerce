import { Component } from '@angular/core';
import { DataSeederService } from './services/data-seeder.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-commerce';
  constructor(private seeder: DataSeederService) { }

  ngOnInit(): void {
    this.seeder.initLocalData();
  }
}
