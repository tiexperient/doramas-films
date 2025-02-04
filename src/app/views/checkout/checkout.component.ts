import { Component, OnInit } from '@angular/core';
import { Film } from '../../views/list-films/film.model';
import { CheckoutService } from './checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', './credit-card.component.css']
})
export class CheckoutComponent implements OnInit {
  listSelectedFilms: Film[] = [];
  totalPrice!: number;
  disabled = false;
  hide = true;
  form: any;
  client: any = {};

  // Propriedades do cartão de crédito
  cardNumber: string = '';
  cardName: string = '';
  cardMonth: string = '';
  cardYear: string = '';
  minCardYear: number = new Date().getFullYear();
  cardCvv: string = '';
  isCardFlipped: boolean = false;
  focusElementStyle: any = null;
  isInputFocused: boolean = false;

  constructor(private checkoutService: CheckoutService, private router: Router) {}

  ngOnInit(): void {
    this.totalPrice = this.checkoutService.totalPrice;
    this.listSelectedFilms = this.checkoutService.listSelectedFilms;
    this.toggleButton();
  }

  payment(): void {
    if (!this.client.name || !this.client.address || !this.client.password || 
        !this.cardNumber || !this.cardName || !this.cardMonth || !this.cardYear || !this.cardCvv) {
      this.checkoutService.showMessage('Por favor, preencha todos os campos obrigatórios na seção de Forma de Pagamento e Endereço de Entrega', true);
    } else {
      this.checkoutService.showMessage(
        `Pagamento realizado com sucesso! 🎉
        Pedido confirmado para ${this.client.name}. Será enviado para: ${this.client.address}`, 
        false
      );
      this.router.navigate(['../list-films']);
    }
  }

  cancel(): void {
    this.router.navigate(['../list-films']);
  }

  toggleButton(): void {
    this.disabled = this.listSelectedFilms.length === 0;
  }

  exclude(film: Film): void {
    this.checkoutService.unselectFilm(film);
    this.totalPrice = this.checkoutService.totalPrice;
    this.toggleButton();
    if (this.totalPrice <= 0) {
      this.excludeAll();
    }
  }

  excludeAll(): void {
    this.checkoutService.totalPrice = 0;
    this.totalPrice = 0;
    this.checkoutService.listSelectedFilms = [];
    this.listSelectedFilms = [];
    this.toggleButton();
  }

  // Métodos do cartão de crédito
  flipCard(status: boolean): void {
    this.isCardFlipped = status;
  }

  focusInput(event: any): void {
    this.isInputFocused = true;
    let targetRef = event.target.dataset.ref;
    let target = document.querySelector(`[data-ref="${targetRef}"]`);
    if (target) {
      this.focusElementStyle = {
        width: `${target.clientWidth}px`,
        height: `${target.clientHeight}px`,
        transform: `translateX(${target.getBoundingClientRect().left}px) translateY(${target.getBoundingClientRect().top}px)`
      };
    }
  }

  blurInput(): void {
    setTimeout(() => {
      if (!this.isInputFocused) {
        this.focusElementStyle = null;
      }
    }, 300);
    this.isInputFocused = false;
  }

  minCardMonth(): number {
    return parseInt(this.cardYear) === this.minCardYear ? new Date().getMonth() + 1 : 1;
  }

  formatCardNumber(event: any): void {
    let input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    this.cardNumber = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  restrictToCvv(event: any): void {
    let input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    this.cardCvv = value;
  }

  formatCardName(event: any): void {
    let input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^A-Za-z\s]/g, '');

    if (value.length > 26) {
      value = value.slice(0, 26);
    }

    this.cardName = value.toUpperCase();
  }
 
}