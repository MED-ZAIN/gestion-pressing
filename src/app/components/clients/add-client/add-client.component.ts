import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal" tabindex="-1" [class.show]="isVisible" [style.display]="isVisible ? 'block' : 'none'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter un nouveau client</h5>
            <button type="button" class="btn-close" (click)="onClose()"></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="onSubmit()" #clientForm="ngForm">
              <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input 
                  type="tel" 
                  class="form-control" 
                  id="telephone" 
                  name="telephone"
                  [(ngModel)]="newClient.telephone" 
                  required>
              </div>
              <div class="mb-3">
                <label for="quantite" class="form-label">Quantité</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="quantite" 
                  name="quantite"
                  [(ngModel)]="newClient.quantite" 
                  required>
              </div>
              <div class="mb-3">
                <label for="typeVetement" class="form-label">Type de vêtement</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="typeVetement" 
                  name="typeVetement"
                  [(ngModel)]="newClient.typeVetement" 
                  required>
              </div>
              <div class="mb-3">
                <label for="prix" class="form-label">Prix</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="prix" 
                  name="prix"
                  [(ngModel)]="newClient.prix" 
                  required>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="onClose()">Annuler</button>
                <button type="submit" class="btn btn-primary" [disabled]="!clientForm.form.valid">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="isVisible"></div>
  `
})
export class AddClientComponent {
  @Output() clientAdded = new EventEmitter<Client>();
  @Output() close = new EventEmitter<void>();

  isVisible = false;
  newClient: Client = {
    telephone: '',
    quantite: 0,
    typeVetement: '',
    prix: 0,
    date: new Date()
  };

  show() {
    this.isVisible = true;
  }

  onClose() {
    this.isVisible = false;
    this.close.emit();
    this.resetForm();
  }

  onSubmit() {
    this.clientAdded.emit({ ...this.newClient });
    this.onClose();
  }

  private resetForm() {
    this.newClient = {
      telephone: '',
      quantite: 0,
      typeVetement: '',
      prix: 0,
      date: new Date()
    };
  }
}