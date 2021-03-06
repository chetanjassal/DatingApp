import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['users'];
    });

    this.galleryOptions =[
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
   // this.loadUser();
  }
  getImages() {
    const imgUrls = [];
    for (const photos of this.user.photos) {
      imgUrls.push({
        small: photos.url,
        medium: photos.url,
        big: photos.url,
        description: photos.description
      })
    }
    return imgUrls;
  }

  // loadUser(){
  //   this.userService.getUser(+this.route.snapshot.params['id'])
  //     .subscribe((user: User) => {
  //       this.user = user;
  //     },error =>{
  //        this.alertify.error(error);
  //     });
  // }
}
