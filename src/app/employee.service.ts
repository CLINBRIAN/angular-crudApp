import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  // api="http://localhost:8080";

  public saveEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>('http://localhost:8080/save/employee',employee);

  }
  public getEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>('http://localhost:8080/get/employees');

  }

  public deleteEmployee(employeeId: number){
    return this.httpClient.delete('http://localhost:8080/delete/employee/'+employeeId);

  }
    public getEmployeeById(employeeId: number){
      return this.httpClient.get<Employee>('http://localhost:8080/get/employee/'+employeeId);
    }

    public editEmployee(employee:Employee){
      return this.httpClient.put<Employee>('http://localhost:8080/update/employee',employee);

    }

}
