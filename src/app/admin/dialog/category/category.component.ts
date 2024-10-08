import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar.service';
import { AppUserService } from '../../../services/app-user.service';
import { ThemeService } from '../../../services/theme.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../../shared/global-constants';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  onAddCategory=new EventEmitter();
  onEditCategory=new EventEmitter();
  categoryForm:any=FormGroup;
  dialogAction:any="Add";
  action:any="Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private dialogRef:MatDialogRef<CategoryComponent>,
  private snackbarService:SnackbarService,
  private appuserService:AppUserService,
  public themeService:ThemeService,
  private ngxService:NgxUiLoaderService,
private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.categoryForm=this.formBuilder.group({
      name:[null,[Validators.required]]
    });

    if(this.dialogData.action==='Edit'){
      this.dialogAction="Edit";
      this.action="Update";
      this.categoryForm.patchValue(this.dialogData.data);
    }
      
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
    var formData=this.categoryForm.value;
    var data={
      name:formData.name
    } 
    this.categoryService.addNewCategory(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onAddCategory.emit();
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
    var formData=this.categoryForm.value;
    var data={
      id:this.dialogData.data.id,
      name:formData.name
    } 
    this.categoryService.updateCategory(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditCategory.emit();
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
