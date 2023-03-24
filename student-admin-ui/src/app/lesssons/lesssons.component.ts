import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

// StudentsComponent den LessonsComponente içine data almak için MAT_DIALOG_DATA kullanılıyor

@Component({
  selector: 'app-lesssons',
  templateUrl: './lesssons.component.html',
  styleUrls: ['./lesssons.component.scss']
})
export class LesssonsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    // gelen datayı bir değişkende (data) tutuyoruz
  ) {
  }

  ngOnInit(): void {
  }

}
