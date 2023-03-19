import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentService} from "../services/student.service";
import {StudentModel} from "../models/ui-models/student.models";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: any;

  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender', 'edit'];
  dataSource: MatTableDataSource<StudentModel> = new MatTableDataSource<StudentModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //paginator! bu şekilde kullanınca compiler görmez ve kod çalışmaya devam eder (riski & bang)

  filterString = '';

  constructor(
    private studentServices: StudentService
  ) {
  }

  ngOnInit(): void {
    //debugger;
    this.studentServices.getStudents().subscribe(
      (success) => {
        //debugger;
        //const firstValue = success[0].firstName;
        //data gelip gelmediğini test ediyoruz

        this.students = success;
        this.dataSource = new MatTableDataSource<StudentModel>(this.students);

        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'gender.description' :
              return item.gender.description;
            default:
              return property;
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log()
      }
    )
  }


  // girilen değeri filtrelemek için
  filterStudents(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      return data.gender.description?.toLocaleLowerCase().includes(filter)
      || data.firstName?.toLocaleLowerCase().includes(filter)
      || data.lastName?.toLocaleLowerCase().includes(filter)
      || data.dateOfBirth?.substring(0,10).includes(filter)
      || data.email?.toLocaleLowerCase().includes(filter)
      || data.mobile?.toString().includes(filter)
    };
  }
  // trim ile kelimenin sağdan soldan boşluklarını siliyoruz (arama yaparken)
  // toLowerCase kelimeleri küçük harfe çevirip arattırıyoruz

}
