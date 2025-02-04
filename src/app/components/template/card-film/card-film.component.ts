import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../../../views/checkout/checkout.service';
import { Film } from '../../.././views/list-films/film.model'

@Component({
  selector: 'app-card-film',
  templateUrl: './card-film.component.html',
  styleUrls: ['./card-film.component.css']
})

  export class CardFilmComponent {
  @Input() film!: Film;

  constructor(private checkoutService: CheckoutService) {}

  selectFilm(): void {
    this.checkoutService.selectFilm(this.film);
  }

  unselectFilm(): void {
    this.checkoutService.unselectFilm(this.film);
  }
}
