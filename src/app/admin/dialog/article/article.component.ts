import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar.service';
import { ArticleService } from '../../../services/article.service';
import { ThemeService } from '../../../services/theme.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from '../../../services/category.service';
import { GlobalConstants } from '../../../shared/global-constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
onAddArticle=new EventEmitter();
onEditArticle=new EventEmitter();
articleForm:any=FormGroup;
dialogAction:any="Add";
action:any="Add";
categorys:any;
responseMessage:any;

  constructor(@Inject (MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private dialogRef:MatDialogRef<ArticleComponent>,
  private snackbarService:SnackbarService,
  private articleService:ArticleService,
  public themeService:ThemeService,
  private ngxService:NgxUiLoaderService,
private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.articleForm=this.formBuilder.group({
      title:[null,[Validators.required]],
      content:[null,[Validators.required]],
      categoryId:[null,[Validators.required]],
      status:[null,[Validators.required]]
    });
    if(this.dialogData.action==='Edit'){
      this.dialogAction="Edit";
      this.action="Update";
      this.articleForm.patchValue(this.dialogData.data);
    }
    
    this.ngxService.start();
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAllCategory().subscribe((response:any)=>{
      this.categorys=response;
      this.ngxService.stop();
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

  handleSubmit(){
    if(this.dialogAction=="Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    this.ngxService.start();
    var formData=this.articleForm.value;
    var data={
      title:formData.title,
      content:formData.content,
      categoryId:formData.categoryId,
      status:formData.status
    } 
    this.articleService.addNewArticle(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onAddArticle.emit();
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

  edit(){
    this.ngxService.start();
    var formData=this.articleForm.value;
    var data={
      id:this.dialogData.data.id,
      title:formData.title,
      content:formData.content,
      categoryId:formData.categoryId,
      status:formData.status,
    } 
    this.articleService.updateArticle(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditArticle.emit();
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

