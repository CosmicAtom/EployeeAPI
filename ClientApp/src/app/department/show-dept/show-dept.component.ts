import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-show-dept',
  templateUrl: './show-dept.component.html',
  styleUrls: ['./show-dept.component.css']
})
export class ShowDeptComponent implements OnInit {

  constructor(private service:SharedService) { }
 
  DepartmentList:any=[];

  ModatTitle:string = '';
  ActivateAddEditDepComp:boolean =false;
  dep:any;

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWitoutFilter :any=[];

  ngOnInit(): void {
     this.refreshDeptList();
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModatTitle = "Add Deparment";
    this.ActivateAddEditDepComp = true;
  }

  editClick(item:any){
    this.dep = item;
    this.ModatTitle = "Edit Deparment";
    this.ActivateAddEditDepComp = true;
  }

  closeClick(){
    this.ActivateAddEditDepComp = false;
    this.refreshDeptList();
  }

  deleteDept(item:any){
    if(confirm('Are you sure want to delete this department ?')){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data =>{
        alert(data.toString());
        this.refreshDeptList();
      });
    }
  }

  refreshDeptList(){
    this.service.getDepartmentList().subscribe(data =>{
      this.DepartmentList = data;
      this.DepartmentListWitoutFilter = data;
    });
  }

  filterList(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWitoutFilter.filter(function(el:any){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any,asc:any){
    this.DepartmentList =this.DepartmentListWitoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop] > b[prop]) ? 1: ( (a[prop] < b[prop]) ? -1 : 0 );
      }else{
        return (b[prop] > a[prop]) ? 1: ( (b[prop] < a[prop]) ? -1 : 0 );
      }
    })
  }
}
