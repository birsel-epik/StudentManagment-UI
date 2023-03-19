import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentModel} from "../models/api-models/student.model";
import {UpdateStudentRequestModel} from "../models/api-models/updateStudentRequest.model";
import {InsertStudentRequestModel} from "../models/api-models/insertStudentRequest.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44381'

  /* Controller ın ismi ne ise, BackEnd tarafında hangi route tanımlandı ise UI tarafından oraya istek atılacaktır */

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getStudents(): Observable<StudentModel[]> {
    return this.httpClient.get<StudentModel[]>(this.baseApiUrl + '/Students');
  }


  getOneStudent(studentId: string | null): Observable<StudentModel> {
    return this.httpClient.get<StudentModel>(this.baseApiUrl + '/Students/' + studentId);
  }

  updateStudent(studentId: string, studentRequest: StudentModel): Observable<StudentModel> {
    const updateStudentRequest: UpdateStudentRequestModel = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      profileImageUrl: studentRequest.profileImageUrl,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address?.physicalAddress,
      postalAddress: studentRequest.address?.postalAddress,
    }
    return this.httpClient.post<StudentModel>(this.baseApiUrl + '/Students/' + studentId, updateStudentRequest);
    /* Update için PUT metodunu kullanıyoruz. Dönüş tipi StudentModel, studentId ve body olarak updateStudentRequest yolluyoruz  (json.body) */
  }


  insertStudent(studentRequest: StudentModel): Observable<StudentModel> {
    const insertStudentRequest: InsertStudentRequestModel = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      profileImageUrl: studentRequest.profileImageUrl,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address?.physicalAddress,
      postalAddress: studentRequest.address?.postalAddress,
    }
    return this.httpClient.post<StudentModel>(this.baseApiUrl + '/Students/Insert', insertStudentRequest);
    /* Update için PUT metodunu kullanıyoruz. Dönüş tipi StudentModel, studentId ve body olarak updateStudentRequest yolluyoruz  (json.body) */

  }


  deleteStudent(studentId: string): Observable<StudentModel> {
    return this.httpClient.delete<StudentModel>(this.baseApiUrl + '/Students/' + studentId);
    /* Update için PUT metodunu kullanıyoruz. Dönüş tipi StudentModel, studentId ve body olarak updateStudentRequest yolluyoruz  (json.body) */
  }


  // öğrencinin photoImage ini çekiyoruz
  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }


  uploadImage(studentId: string, file: File): Observable<any> {
    // HttpClient ile yollarken FormData şeklinde yolluyoruz
    const formData = new FormData();

    // BackEnd de verdiğimiz dosya ismi ve dosyayı yolluyoruz
    formData.append("profileImage", file);

    return this.httpClient.post(this.baseApiUrl + '/students/' + studentId + '/UploadImage', formData, {
      responseType: 'text'
    });
  }

}
