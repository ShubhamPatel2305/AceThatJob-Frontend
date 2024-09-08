import { Component, OnInit} from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { ThemeService } from '../../services/theme.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ArticleComponent } from '../dialog/article/article.component';
import { Router } from '@angular/router';
import { ViewArticleComponent } from '../dialog/view-article/view-article.component';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrl: './manage-article.component.scss'
})
export class ManageArticleComponent implements OnInit {
  displayedColumns:string[]=['title','categoryName','status','edit'];
  dataSource:any;
  responseMessage:any;
  constructor(private articleService:ArticleService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,
    public themeService:ThemeService){

  }

  ngOnInit(): void {
      this.ngxService.start();
      this.tableData();
  }
  tableData(){
    this.articleService.getAllArticle().subscribe((response:any)=>{
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
      const dialogRef=this.dialog.open(ArticleComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
      const res=dialogRef.componentInstance.onAddArticle.subscribe((response)=>{
        this.tableData();
      })
  }

  handleViewAction(values:any){
    const dialogConfig=new MatDialogConfig();
      dialogConfig.data={
        action:'View',
        data:values
      };

      dialogConfig.width="850px";
      const dialogRef=this.dialog.open(ViewArticleComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
  }

  handleEditAction(values:any){
    const dialogConfig=new MatDialogConfig();
      dialogConfig.data={
        action:'Edit',
        data:values
      };

      dialogConfig.width="850px";
      const dialogRef=this.dialog.open(ArticleComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
      const res=dialogRef.componentInstance.onEditArticle.subscribe((response)=>{
        this.tableData();
      })
  }

  onDelete(values:any){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      message:' delete '+values.title+' article?'
    };
    const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
    const res=dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }

  deleteProduct(id:any){
    this.articleService.deleteArticle(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage=response.message;
      this.snackbarService.openSnackbar(this.responseMessage);
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

}
