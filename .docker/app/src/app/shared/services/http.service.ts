import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { SignInAdminDto } from '../dto/sign-in-admin.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { Default } from '../interfaces/default.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = environment.url;

  constructor(private readonly http: HttpClient) {}

  auth = {
    url: `${environment.url}/auth`,
    signUp: (dto: SignUpDto) => {
      return this.http.post<Default>(`${this.auth.url}/sign-up`, dto);
    },
    signIn: (dto: SignInDto) => {
      return this.http.post<Default>(`${this.auth.url}/sign-in`, dto);
    },
    signInAdmin: (dto: SignInAdminDto) => {
      return this.http.post<Default>(`${this.auth.url}/adm/sign-in`, dto);
    },
  };
}
