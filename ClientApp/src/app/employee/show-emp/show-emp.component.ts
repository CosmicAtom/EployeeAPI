import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
 
  EmployeeList:any=[];

  ModatTitle:string = '';
  ActivateAddEditDepComp:boolean =false;
  emp:any;

  ngOnInit(): void {
     this.refreshDeptList();
  }

  addClick(){
    this.emp={
      EmployeeID:0,
      EmployeeName:"",
      Department:"",
      DateofJoining:"",
      PhotFileName:"pikachu.png"
    }
    this.ModatTitle = "Add ";
    this.ActivateAddEditDepComp = true;
  }

  editClick(item:any){
    this.emp = item;
    this.ModatTitle = "Edit Employee";
    this.ActivateAddEditDepComp = true;
  }

  closeClick(){
    this.ActivateAddEditDepComp = false;
    this.refreshDeptList();
  }

  deleteDept(item:any){
    if(confirm('Are you sure want to delete this department ?')){
      this.service.deleteEmployee(item.EmployeeID).subscribe(data =>{
        alert(data.toString());
        this.refreshDeptList();
      });
    }
  }

  refreshDeptList(){
    this.service.getEmployeeList().subscribe(data => {
      this.EmployeeList = data;
    });
  }

}
