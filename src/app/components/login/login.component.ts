import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Connexion</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="onLogin()">
                <div class="mb-3">
                  <label for="telephone" class="form-label">Téléphone</label>
                  <input type="tel" class="form-control" id="telephone" [(ngModel)]="telephone" name="telephone" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input type="password" class="form-control" id="password" [(ngModel)]="motDePasse" name="motDePasse" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Se connecter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  telephone: string = '';
  motDePasse: string = '';

  onLogin() {
    // Implémenter la logique de connexion ici
    console.log('Login attempt:', { telephone: this.telephone, motDePasse: this.motDePasse });
  }
}