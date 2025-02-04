import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/views/checkout/checkout.service';
import { Film } from '../../.././views/list-films/film.model'

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.css']
})

  export class SelectButtonComponent {
    @Input() film!: Film;
    @Input() disabled: boolean = false;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
  }

  selectFilm(): void {
    this.checkoutService.selectFilm(this.film);
    this.disabled = true;
  }

  unselectFilm(): void {
    this.checkoutService.unselectFilm(this.film);
    this.disabled = false;
  }
    
}
