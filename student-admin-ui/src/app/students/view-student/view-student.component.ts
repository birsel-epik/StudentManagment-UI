import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GenderService} from "../../services/gender.service";
import {GenderModel} from "../../models/ui-models/gender.models";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentModel} from "../../models/ui-models/student.models";

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})

export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: StudentModel | any = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  genderList: GenderModel[] = [];
  isNewStudent = false;
  header = "";
  displayProfileImageUrl = "";

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private genderServices: GenderService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');
        /* student servisten studentId ye göre 1 veri çekebilmek için paramMap metodunu kullanıyoruz, studentId bilgisini alıyoruz */

        //studentId add ise Insert göre
        if (this.studentId === "add") {
          this.isNewStudent = true;
          this.header = "Add Student"

          //default image gelmesi için metodu çağırıyoruz
          this.setImages();
        }

        // değilse Update e göre
        else {
          this.isNewStudent = false;
          this.header = "Edit Student"

          this.studentService.getOneStudent(this.studentId).subscribe(
            (success) => {
              //debugger;
              //const firstValue = success[0].firstName;
              //data gelip gelmediğini test ediyoruz

              this.student = success;
              //default image gelmesi için metodu çağırıyoruz
              this.setImages();
            },
            (error) => {
              console.log(error)
              this.setImages();
            }
          )
        }

        this.genderServices.getGenderList().subscribe(
          (success) => {
            this.genderList = success;
          },
          (error) => {
            console.log(error)
          }
        )
      }
    )
  }

  onUpdate() {
    //debugger;
    this.studentService.updateStudent(this.student.id, this.student)
      .subscribe(
        (success) => {
          //debugger;
          this.snackBar.open('Data updated', undefined, {
            duration: 2000,
          })
          this.router.navigateByUrl('students')
          /* güncelleme işlemi başarılı oldu ise, lsiteleme sayfasına geri dönsün */
        },
        (error) => {
          console.log(error)
          this.snackBar.open('Data could not be updated', undefined, {
            duration: 2000,
            /* BackEnd den gelen error title ı  da buraya bastırabiliriz. */
          })
        }
      )
    /* servise istek atıyoruz */

  }


  onAdd() {
    this.studentService.insertStudent(this.student)
      .subscribe(
        (success) => {
          this.snackBar.open('Add updated', undefined, {
            duration: 2000,
          })
          setTimeout(() => {
            this.router.navigateByUrl(`students/${success.id}`);
            /* öğrenci eklendikten sonra, eklenen öğrencinin id sine gitmiş olacağız (sayfa değişmeyecek) */
          }, 2000)
          /* ekleme işlemi başarılı oldu ise, lsiteleme sayfasına geri dönsün */
        },
        (error) => {
          //debugger;
          console.log(error)
          this.snackBar.open('Data could not be updated', undefined, {
            duration: 2000,
            /* BackEnd den gelen error title ı da buraya bastırabiliriz. */
          })
        }
      )
  }


  oneDelete() {
    this.studentService.deleteStudent(this.student.id).subscribe(
      (success) => {
        this.snackBar.open('Data deleted', undefined, {
          duration: 2000,
        })
        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000)
      },
      (error) => {
        this.snackBar.open('Data could not be deleted', undefined, {
          duration: 2000,
        })
      }
    )
  }


  //yükselen resimleri çekmek için
  setImages() {
    // Eğer öğrencinin Profile Image ı var ise, servisten çekiyoruz
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);
      // servisten photoImage ı çekiyoruz
    } else {
      this.displayProfileImageUrl = '/assets/images/avatar.jpg';
    }
    // Eğer öğrencinin Profile Image ı yok ise, default image gösteriyoruz
  }


  //yeni resim eklemek için
  uploadImage(event: any) {
    //debugger;
    // öğrenci varsa  daha önce eklenmiş olan resmi göster
    if (this.studentId) {
      const file: File = event.target.files[0];
      // event.target.files[0] ile içerisindeki dosyalardan lardan ilkini getir

      this.studentService.uploadImage(this.studentId, file).subscribe(
        (success) => {
          this.student.profileImageUrl = success;
          // Cevap olarak BackEnd de ki dosyanın yolu gelecek

          // BackEnd den gelen cevabı döndürüyoruz
          this.setImages();

          this.snackBar.open('Photo updated', undefined, {
            duration: 2000,
          })
        },
        (error) => {
          this.snackBar.open('Photo could not be updated', undefined, {
            duration: 2000,
            /* BackEnd den gelen error title ı  da buraya bastırabiliriz. */
          })
        },
      )
    }
  }

}
