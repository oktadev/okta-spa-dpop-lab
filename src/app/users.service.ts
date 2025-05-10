import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './user';
import { oktaConfig } from './okta.config';

interface OktaUser {
  id: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string,
    title: string
  };
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  constructor() { }
  private url = `${oktaConfig.issuer}/api/v1/users?limit=10`

  getUsers(): Observable<User[]> {
    return this.http.get<OktaUser[]>(`${this.url}`).pipe(
      map(res => res || []),
      map(res => res.map(u => ({id: u.id, ...u.profile})))
    )
  }
}
