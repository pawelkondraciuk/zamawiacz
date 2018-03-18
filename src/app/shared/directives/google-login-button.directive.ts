import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';

import { AuthService } from './../services/auth.service';

@Directive({
  selector: '[appGoogleLoginButton]'
})
export class GoogleLoginButtonDirective implements OnInit {
  @Output() success = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private changeDetectionRef: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  private onSuccess(googleUser: gapi.auth2.GoogleUser) {
    this.success.emit(googleUser.getAuthResponse().id_token);
  }

  ngOnInit() {
    this.authService.getGoogleAuth().subscribe((auth) => {
      auth.attachClickHandler(
        this.elementRef.nativeElement,
        { },
        this.onSuccess.bind(this),
        this.onFailure.bind(this)
      );
      this.changeDetectionRef.detectChanges();
    });
  }

  private onFailure() {
    throw new Error('Authentication failure');
  }

}
