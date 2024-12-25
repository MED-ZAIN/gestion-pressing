import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal" tabindex="-1" [class.show]="isVisible" [style.display]="isVisible ? 'block' : 'none'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier le client</h5>
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
                  [(ngModel)]="editedClient.telephone" 
                  required>
              </div>
              <div class="mb-3">
                <label for="quantite" class="form-label">Quantité</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="quantite" 
                  name="quantite"
                  [(ngModel)]="editedClient.quantite" 
                  required>
              </div>
              <div class="mb-3">
                <label for="typeVetement" class="form-label">Type de vêtement</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="typeVetement" 
                  name="typeVetement"
                  [(ngModel)]="editedClient.typeVetement" 
                  required>
              </div>
              <div class="mb-3">
                <label for="prix" class="form-label">Prix</label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="prix" 
                  name="prix"
                  [(ngModel)]="editedClient.prix" 
                  required>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="onClose()">Annuler</button>
                <button type="submit" class="btn btn-primary" [disabled]="!clientForm.form.valid">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="isVisible"></div>
  `
})
export class EditClientComponent {
  @Output() clientEdited = new EventEmitter<Client>();
  @Output() close = new EventEmitter<void>();

  isVisible = false;
  editedClient: Client = {
    telephone: '',
    quantite: 0,
    typeVetement: '',
    prix: 0,
    date: new Date()
  };

  show(client: Client) {
    this.editedClient = { ...client };
    this.isVisible = true;
  }

  onClose() {
    this.isVisible = false;
    this.close.emit();
  }

  onSubmit() {
    this.clientEdited.emit(this.editedClient);
    this.onClose();
  }
}