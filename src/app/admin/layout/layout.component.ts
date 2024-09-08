import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { response } from 'express';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private dialog:MatDialog,
    private router:Router,
    public themeService:ThemeService
  ){}

  logout(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      message:'logout'
    };
    const dialogref=this.dialog.open(ConfirmationComponent,dialogConfig);
    const response=dialogref.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
      dialogref.close();
      localStorage.removeItem('token');
      this.router.navigate(['/'])
    });
  }

  changeTheme(color:any){
    this.themeService.setTheme(color);
  }
}
