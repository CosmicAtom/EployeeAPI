import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:55514/api";
  readonly PhotoUrl = "http://localhost:55514/Photo";

  constructor(private http:HttpClient) { }

  getDepartmentList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Department');
  }

  addDepartment(data:any){
    return this.http.post(this.APIUrl +  '/Department',data);
  }
  
  editDepartment(data:any){
    return this.http.put(this.APIUrl +  '/Department', data)
  }

  deleteDepartment(id:number|string){
    return this.http.delete(this.APIUrl +  `/Department/${id}`);
  }

  getEmployeeList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl +  '/Employee');
  }

  addEmployee(data:any){
    return this.http.post(this.APIUrl +  '/Employee',data);
  }
  
  editEmployee(data:any){
    return this.http.put(this.APIUrl +  '/Employee', data)
  }

  deleteEmployee(data:any){
    return this.http.delete(this.APIUrl +  '/Employee', data);
  }
 
  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Employee/GetAllDepartmentNames')
  }

  uploadPhoto(val:any){
    return this.http.post(this.APIUrl + '/Employee/SaveFile',val);
  }
}
