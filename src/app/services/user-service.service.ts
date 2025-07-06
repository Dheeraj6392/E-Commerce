import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }

  // userSignUp(user: SignUp) {
  // this.http.post('http://localhost:3000/users', user, { observe: 'response' })
  //   .subscribe((result) => {
  //     if (result) {
  //       localStorage.setItem('user', JSON.stringify(result.body));
  //       this.router.navigate(['/']);
  //     }
  //   })
  // }


  userSignUp(user: SignUp) {
    const users: SignUp[] = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.find(u => u.email === user.email);
    if (userExists) {
      alert('User already exists!');
      return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(user)); // current logged-in user

    this.router.navigate(['/']);
  }


  // userLogin(data: login) {
  //   this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
  //     { observe: 'response' }
  //   ).subscribe((result) => {
  //     if (result && result.body?.length) {
  //       localStorage.setItem('user', JSON.stringify(result.body[0]));
  //       this.router.navigate(['/']);
  //       this.invalidUserAuth.emit(false)
  //     } else {
  //       this.invalidUserAuth.emit(true)
  //     }
  //   })
  // }

  userLogin(data: login) {
    // Step 1: Check if user already logged in
    const localUser = localStorage.getItem('user');
    if (localUser) {
      this.router.navigate(['/']);
      this.invalidUserAuth.emit(false);
      return;
    }

    // Step 2: Search for matching user in stored users
    const users: SignUp[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      user => user.email === data.email && user.password === data.password
    );

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser)); // store current user
      this.router.navigate(['/']);
      this.invalidUserAuth.emit(false);
    } else {
      this.invalidUserAuth.emit(true);
    }
  }


  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
