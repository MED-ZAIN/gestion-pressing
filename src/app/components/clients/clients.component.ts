import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client.model';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, AddClientComponent, EditClientComponent],
  template: `
    <div class="container mt-4">
      <div class="row mb-4">
        <div class="col">
          <button class="btn btn-primary" (click)="showAddClientModal()">
            <i class="bi bi-plus-circle"></i> Ajouter un client
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>Liste des Clients</h3>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Téléphone</th>
                  <th>Quantité</th>
                  <th>Type de vêtement</th>
                  <th>Prix</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let client of clients">
                  <td>{{ client.id }}</td>
                  <td>{{ client.telephone }}</td>
                  <td>{{ client.quantite }}</td>
                  <td>{{ client.typeVetement }}</td>
                  <td>{{ client.prix }} MAD</td>
                  <td>{{ client.date | date:'dd/MM/yyyy' }}</td>
                  <td>
                    <div class="btn-group">
                      <button class="btn btn-sm btn-warning" (click)="showEditModal(client)" title="Modifier">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-sm btn-danger" (click)="confirmDelete(client)" title="Supprimer">
                        <i class="bi bi-trash"></i>
                      </button>
                      <button class="btn btn-sm btn-info" (click)="printTicket(client)" title="Imprimer ticket">
                        <i class="bi bi-printer"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <app-add-client
      (clientAdded)="onAddClient($event)"
      (close)="hideAddClientModal()"
    ></app-add-client>

    <app-edit-client
      (clientEdited)="onEditClient($event)"
      (close)="hideEditModal()"
    ></app-edit-client>
  `
})
export class ClientsComponent {
  @ViewChild(AddClientComponent) addClientModal!: AddClientComponent;
  @ViewChild(EditClientComponent) editClientModal!: EditClientComponent;

  clients: Client[] = [
   
  ];

  showAddClientModal() {
    this.addClientModal.show();
  }

  hideAddClientModal() {
    this.addClientModal.onClose();
  }

  showEditModal(client: Client) {
    this.editClientModal.show(client);
  }

  hideEditModal() {
    this.editClientModal.onClose();
  }

  onAddClient(client: Client) {
    const newClient = {
      ...client,
      id: this.clients.length + 1
    };
    this.clients.push(newClient);
  }

  onEditClient(updatedClient: Client) {
    const index = this.clients.findIndex(c => c.id === updatedClient.id);
    if (index !== -1) {
      this.clients[index] = updatedClient;
    }
  }

  confirmDelete(client: Client) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.telephone} ?`)) {
      this.clients = this.clients.filter(c => c.id !== client.id);
    }
  }

  printTicket(client: Client) {
    const ticket = `
      ===== TICKET DE PRESSING =====
      ID: ${client.id}
      Téléphone: ${client.telephone}
      Type: ${client.typeVetement}
      Quantité: ${client.quantite}
      Prix: ${client.prix} MAD
      Date: ${new Date(client.date).toLocaleDateString()}
      ==========================
    `;
    
    const printWindow = window.open('', '', 'height=400,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Ticket de Pressing</title>');
      printWindow.document.write('</head><body >');
      printWindow.document.write('<pre>' + ticket + '</pre>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
}