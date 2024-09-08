import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { AppUserService } from '../../services/app-user.service';
import { ThemeService } from '../../services/theme.service';
import { response } from 'express';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { GlobalConstants } from '../../shared/global-constants';
import { filter } from 'rxjs';
import { stat } from 'fs';
import { UsersComponent } from '../dialog/users/users.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {

  displayColumns:string[]=['name','email','status','edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    private appuserService:AppUserService,
    public themeService:ThemeService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.appuserService.getAllAppUsers().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource=new MatTableDataSource(response);
      console.log("issue");
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage);
    })
  }

  applyFilter(event:any){
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    };

    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(UsersComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res=dialogRef.componentInstance.onAddUser.subscribe((response)=>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values
    };

    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(UsersComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res=dialogRef.componentInstance.onEditUser.subscribe((response)=>{
      this.tableData();
    })
  }

  onChange(status: boolean, id: any) {
    this.ngxService.start();
    
    // Convert the boolean value of status to "True" or "False"
    const capitalizedStatus = status ? "True" : "False";
    
    var data = {
      id: id,
      status: capitalizedStatus  // Send "True" or "False" as needed
    };
  
    this.appuserService.updateUserStatus(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackbar(this.responseMessage);
        this.tableData();  // Reload the table to reflect the changes
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackbar(this.responseMessage);
      }
    );
  }
  
}
