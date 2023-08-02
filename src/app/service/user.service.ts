import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api'; // Replace with your backend API URL
  private userId: string | null = null;

  constructor(private http: HttpClient) {}

  registerUser(formData: any): Observable<any> {
    const url = `${this.baseUrl}/user/register`;
    return this.http.post(url, formData);
  }

  // User authentication methods
  // login(email: string, password: string): Observable<any> {
  //   return this.http
  //     .post<any>(`${this.baseUrl}/user/login`, { email, password })
  //     .pipe(
  //       map((response) => {
  //         // Save the token to local storage
  //         localStorage.setItem('token', response.token);
  //         return response;
  //       })
  //     );
  // }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/user/login`, { email, password })
      .pipe(
        tap((response) => {
          // Save the token and user ID to local storage
          localStorage.setItem('token', response.token);
          this.setUserId(response.userId);
          localStorage.setItem('name', response.name);
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    // Remove the token from local storage
    localStorage.removeItem('token');
    this.userId = null;
  }

  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  getAllUser(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/user/profile`, { headers });
  }

  getUserProfile(userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  updateUserProfile(userId: string, userData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(
      `${this.baseUrl}/user/update${userId}`,
      userData,
      { headers }
    );
  }

  // Function to get the JWT token from local storage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Function to set the authorization headers for requests that require token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('x-auth-token', token);
    } else {
      return new HttpHeaders();
    }
  }

  // CRUD methods for user addresses
  getUserAddresses(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/wallet/list`, { headers });
  }

  addUserAddress(address: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/wallet/add`, address, {
      headers,
    });
  }

  // updateUserAddress(walletId: string, address: any): Observable<any> {
  //   const headers = this.getAuthHeaders();
  //   return this.http.put<any>(`${this.baseUrl}/wallet/update/${walletId}`, address, { headers });
  // }

  updateUserAddress(walletId: string, address: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http
      .put<any>(`${this.baseUrl}/wallet/update/${walletId}`, address, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('Error updating address:', error);
          throw error;
        })
      );
  }

  deleteUserAddress(walletId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/wallet/delete/${walletId}`, {
      headers,
    });
  }

  getHistoricalData(): Observable<any[]> {
    // Replace with the endpoint to fetch historical data from the backend
    return this.http.get<any[]>('http://localhost:5000/api/historical-data');
  }
}
