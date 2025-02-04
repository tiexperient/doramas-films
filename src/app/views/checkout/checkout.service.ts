import { Injectable } from '@angular/core';
import { Film } from '../list-films/film.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public totalPrice: number = 0;
  public listSelectedFilms: Film[] = [];

  // Criar um Observable para atualizar o contador do botão dinamicamente
  private selectedFilmsCount = new BehaviorSubject<number>(0);
  selectedFilmsCount$ = this.selectedFilmsCount.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  addFilm(film: Film): void {
    this.listSelectedFilms.push(film);
    this.updateCount();
    this.showMessage("Filme adicionado ao carrinho!", false);
  }

  removeFilm(film: Film): void {
    const index = this.listSelectedFilms.findIndex(f => f.id === film.id);
    if (index > -1) {
      this.totalPrice -= film.price;
      this.listSelectedFilms.splice(index, 1);
      if (this.totalPrice < 0) this.totalPrice = 0;
      this.updateCount();
      this.showMessage("Filme removido do carrinho!", true);
    }
  }

  updateCount(): void {
    this.selectedFilmsCount.next(this.listSelectedFilms.length);
  }

  selectFilm(film: Film): void {
    this.totalPrice += film.price;
    this.addFilm(film);
    console.log("Filmes selecionados:", this.listSelectedFilms);
    console.log("Total do carrinho:", this.totalPrice);
  }

  unselectFilm(film: Film): void {
    this.removeFilm(film);
    console.log("Filmes restantes:", this.listSelectedFilms);
    console.log("Total do carrinho:", this.totalPrice);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "Fechar", {
      duration: 12000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['error'] : ['success']
    });
  }
}
