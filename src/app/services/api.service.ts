import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private getBaseUrl(): string {
    // Se estiver em produção (Azure), use a API integrada
    if (window.location.hostname.includes('azurestaticapps.net')) {
      return '/api'; // API integrada do Static Web App
    }
    // Para desenvolvimento local
    return 'http://localhost:3003';
  }

  async login(email: string, password: string) {
    const response = await fetch(`${this.getBaseUrl()}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    return response;
  }

  async forgotPassword(email: string) {
    const response = await fetch(`${this.getBaseUrl()}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    return response;
  }
}