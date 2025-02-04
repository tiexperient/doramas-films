import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout/checkout.service';
import { Film } from './film.model';
import { Router } from '@angular/router';
import { dataFake } from 'src/app/dados/datafake';

@Component({
  selector: 'app-list-films',
  templateUrl: './list-films.component.html',
  styleUrls: ['./list-films.component.css']
})
export class ListFilmsComponent implements OnInit {
  listFilms: Film[] = [];
  listSelectedFilmsCount: number = 0;
  hidden = false;

  constructor(private checkoutService: CheckoutService, private router: Router) {}

  ngOnInit(): void {
    this.listFilms = dataFake;

    // Assina o Observable para atualizar o contador sempre que houver alteração
    this.checkoutService.selectedFilmsCount$.subscribe(count => {
      this.listSelectedFilmsCount = count;
    });
  }

  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  toCheckout(): void {
    this.router.navigate(['../checkout']);
  }
}
