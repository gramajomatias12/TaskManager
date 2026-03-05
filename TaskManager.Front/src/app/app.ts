import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from './services/data'; // Asegúrate que esta ruta siga siendo la correcta
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TareaForm } from './tarea-form/tarea-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSnackBarModule, MatToolbarModule, MatDialogModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('TaskManager');
  tareas: any[] = [];
  dataSource = new MatTableDataSource<any>([]); 

  constructor(private dataService: Data, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.dataService.getEntidad('Tareas').subscribe({
      next: (data) => {
        this.tareas = typeof data === 'string' ? JSON.parse(data) : data;
        this.dataSource.data = this.tareas; 
      },
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ABRIR POPUP PARA TAREA NUEVA
  agregarTarea() {
    const dialogRef = this.dialog.open(TareaForm, {
      width: '400px',
      data: { tarea: null } // No pasamos tarea
    });

    dialogRef.afterClosed().subscribe(resultado => {
      // Si el popup devuelve un resultado, lo mandamos a la BD
      if (resultado) {
        this.guardarTareaBD(resultado, 'Tarea creada con éxito');
      }
    });
  }

  // ABRIR POPUP PARA EDITAR TAREA EXISTENTE
  editarTarea(tareaSeleccionada: any) {
    const dialogRef = this.dialog.open(TareaForm, {
      width: '400px',
      data: { tarea: tareaSeleccionada } // Le pasamos la tarea a editar
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.guardarTareaBD(resultado, 'Tarea actualizada con éxito');
      }
    });
  }

  // FUNCIÓN ÚNICA DE GUARDADO
  guardarTareaBD(tarea: any, mensajeExito: string) {
    this.dataService.postEntidad('Tareas', tarea).subscribe({
      next: () => {
        this.mostrarNotificacion(mensajeExito);
        this.cargarTareas();
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }

  eliminarTarea(id: number) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      const tareaAEliminar = { cdTarea: id };
      this.dataService.postEntidad('Tareas_D', tareaAEliminar).subscribe({
        next: () => {
          this.mostrarNotificacion('Tarea eliminada');
          this.cargarTareas(); 
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  mostrarNotificacion(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}