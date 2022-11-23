import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp: any;
  EmployeeID: number = 0;
  EmployeeName: string = '';
  Department: string = '';
  DateofJoining: string = '';
  PhotoFileName:string ='';
  PhotoFilePath:string ='';


  DepartmentList: any = [];

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  addEmployee() {
    var val = {
      EmployeeID: this.EmployeeID,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateofJoining: this.DateofJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.service.addEmployee(val).subscribe(
      res => {
        alert(res.toString());
      });
  }

  updateEmployee() {
    
    var val = {
      EmployeeID: this.EmployeeID,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateofJoining: this.DateofJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.service.editEmployee(val).subscribe(
      res => {
        alert(res.toString());
      });
  }

  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;

    this.EmployeeID = this.emp.EmployeeID;
    this.EmployeeName = this.emp.EmployeeName;
    this.Department = this.emp.Department;
    this.DateofJoining = this.emp.DateofJoining;
    this.PhotoFileName = this.emp.PhotoFileName;
    this.PhotoFilePath = this.service.PhotoUrl +'/' + this.PhotoFileName;
    });
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    const formData : FormData= new FormData();
    formData.append('uploadFile',file,file.name);

    this.service.uploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFilePath;
    })
  }
}
