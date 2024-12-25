import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Inscription</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="onRegister()">
                <div class="mb-3">
                  <label for="nom" class="form-label">Nom</label>
                  <input type="text" class="form-control" id="nom" [(ngModel)]="nom" name="nom" required>
                </div>
                <div class="mb-3">
                  <label for="telephone" class="form-label">Téléphone</label>
                  <input type="tel" class="form-control" id="telephone" [(ngModel)]="telephone" name="telephone" required>
                </div>
                <div class="mb-3">
                  <label for="role" class="form-label">Rôle</label>
                  <select class="form-control" id="role" [(ngModel)]="role" name="role" required>
                    <option value="utilisateur">Utilisateur</option>
                    <option value="administrateur">Administrateur</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Mot de passe</label>
                  <input type="password" class="form-control" id="password" [(ngModel)]="motDePasse" name="motDePasse" required>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
                  <input type="password" class="form-control" id="confirmPassword" [(ngModel)]="confirmMotDePasse" name="confirmMotDePasse" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">S'inscrire</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  nom: string = '';
  telephone: string = '';
  role: 'utilisateur' | 'administrateur' = 'utilisateur';
  motDePasse: string = '';
  confirmMotDePasse: string = '';

  onRegister() {
    if (this.motDePasse !== this.confirmMotDePasse) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    // Implémenter la logique d'inscription ici
    console.log('Register attempt:', {
      nom: this.nom,
      telephone: this.telephone,
      role: this.role,
      motDePasse: this.motDePasse
    });
  }
}