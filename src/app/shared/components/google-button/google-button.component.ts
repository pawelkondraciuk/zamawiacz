import { AuthService } from './../../services/auth.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { GoogleAuthService } from 'ng-gapi';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.css']
})
export class GoogleButtonComponent implements OnInit {
  @Output() success = new EventEmitter();
  @ViewChild('signIn') signInButton: ElementRef;

  constructor(
    private googleAuthService: GoogleAuthService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.authService.getGoogleAuth().subscribe((auth) => {
      auth.attachClickHandler(
        this.signInButton.nativeElement,
        { },
        this.onSuccess.bind(this),
        this.onFailure.bind(this)
      );
      this.cdRef.detectChanges();
    });
  }

  onSuccess(googleUser: gapi.auth2.GoogleUser) {
    this.success.emit(googleUser.getAuthResponse().id_token);
  }

  onFailure(reason: string) {
  }
}
