import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ConfirmDialogComponent} from '../../sequeleton/confirm-dialog/confirm-dialog.component';


@Component({
  standalone: true,
  selector: 'app-admin-panel',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  promoteTo(role: string, user: User): void {
    this.userService.updateRole(user.id, role).subscribe(() => this.loadUsers());
  }

  /*deleteUser(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }*/

  openDeleteDialog(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
        confirmText: 'Supprimer',
        cancelText: 'Annuler'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(() => this.loadUsers());
    }    console.log('Suppression de l\'utilisateur', userId);
    // this.userService.deleteUser(userId).subscribe(...);
  }
}
