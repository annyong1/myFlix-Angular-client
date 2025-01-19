import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://duncanflixapi-2df251ca79e4.herokuapp.com/signup';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(Username: string, Password: string) {
    const userDetails = { Username, Password };
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get one movie
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(name: string) {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(name: string) {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get a user
  public getUser() {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get favorite movies for a user
  public getFavoriteMovies() {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/$usermname/movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to favourite Movies
  public addUserFavoriteMovie(movieId: string) {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + '$username' + '/movies/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + '$username', userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + '$username', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete a movie from favorite movies
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/${username}/movies/${movieId}', {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ${token}',
      })
    }).pipe(
        map(this.extractResponseData),
          catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
  }
  return throwError(
    'Something bad happened; please try again later.');
}

  // Non-typed response extraction
  private extractResponseData(res: any): any {
  const body = res;
  return body || {};
}
}