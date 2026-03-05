import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tarea-form',
  standalone: true, // Importante para Angular 17+
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './tarea-form.html',
  styleUrl: './tarea-form.scss',
})
export class TareaForm implements OnInit {
  tituloControl = new FormControl('', [Validators.required]);
  descripcionControl = new FormControl('');
  estadoControl = new FormControl('Pendiente');
  
  isEdit = false;
  cdTarea = 0;

  constructor(
    public dialogRef: MatDialogRef<TareaForm>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // Si recibimos una tarea, llenamos los campos (Modo Edición)
    if (this.data && this.data.tarea) {
      this.isEdit = true;
      this.cdTarea = this.data.tarea.cdTarea;
      this.tituloControl.setValue(this.data.tarea.dsTitulo);
      this.descripcionControl.setValue(this.data.tarea.dsDescripcion);
      this.estadoControl.setValue(this.data.tarea.cdEstado);
    }
  }

  guardar() {
    if (this.tituloControl.invalid) return;
    
    // Armamos el objeto para enviárselo al componente principal
    const tareaAGuardar = {
      cdTarea: this.cdTarea,
      dsTitulo: this.tituloControl.value,
      dsDescripcion: this.descripcionControl.value,
      cdEstado: this.estadoControl.value
    };

    // Cerramos el modal y enviamos la información
    this.dialogRef.close(tareaAGuardar);
  }

  cancelar() {
    this.dialogRef.close(); // Cerramos sin enviar nada
  }
}