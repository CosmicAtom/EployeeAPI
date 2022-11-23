import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-add-edit-dept',
  templateUrl: './add-edit-dept.component.html',
  styleUrls: ['./add-edit-dept.component.css']
})
export class AddEditDeptComponent implements OnInit {

  @Input() dep: any;
  Departmentid: number = 0;
  DepartmentName: string = '';

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Departmentid = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
  }

  addDepartment() {
    var val = {
      DepartmentId: this.Departmentid,
      DepartmentName: this.DepartmentName
    };
    this.service.addDepartment(val).subscribe(
      res => {
        alert(res.toString());
      });
  }

  updateDepartment() {
    var val = {
      DepartmentId: this.Departmentid,
      DepartmentName: this.DepartmentName
    };
    this.service.editDepartment(val).subscribe(
      res => {
        alert(res.toString());
      });
  }
}

