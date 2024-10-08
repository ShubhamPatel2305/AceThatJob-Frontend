import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { matTabsAnimations } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns:string[]=['name','edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private categoryService:CategoryService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    public themeService:ThemeService){}

    ngOnInit(): void {
        
        this.ngxService.start();
        this.tableData();
    }

    tableData(){
      this.categoryService.getAllCategory().subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSource=new MatTableDataSource(response);
      },(error)=>{
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

    applyFilter(event:Event){
      const filterValue=(event.target as HTMLInputElement).value;
      this.dataSource.filter=filterValue.trim().toLowerCase();
    }

    handleAddAction(){
      const dialogConfig=new MatDialogConfig();
      dialogConfig.data={
        action:'Add'
      };

      dialogConfig.width="850px";
      const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
      const res=dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
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
      const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
      const res=dialogRef.componentInstance.onEditCategory.subscribe((response)=>{
        this.tableData();
      })
    }


}
