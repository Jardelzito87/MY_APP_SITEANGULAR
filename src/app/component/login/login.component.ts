import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <div class="login-container">
      <div class="login-form">
        <h2>Login</h2>
        <form (submit)="onLogin($event)">
          <div class="form-group">
            <input 
              type="email" 
              #emailInput
              placeholder="Email" 
              required>
          </div>
          <div class="form-group">
            <input 
              type="password" 
              #passwordInput
              placeholder="Senha" 
              required>
          </div>
          <button type="submit">Entrar</button>
          <div class="error" [style.display]="errorMessage ? 'block' : 'none'">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #000;
    }

    .login-form {
      background: rgba(0, 0, 0, 0.8);
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 8px 32px rgba(244, 180, 0, 0.3);
      width: 400px;
    }

    .login-form h2 {
      color: #f4b400;
      text-align: center;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #333;
      border-radius: 5px;
      background: #222;
      color: #fff;
      font-size: 16px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(to right, #f4b400, #ffcc33);
      border: none;
      border-radius: 5px;
      color: #000;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .error {
      color: #ff4444;
      text-align: center;
      margin-top: 10px;
    }
  `]
})
export class LoginComponent {
  private router = inject(Router);
  
  errorMessage: string = '';

  async onLogin(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement).value;
    const password = (form.querySelector('input[type="password"]') as HTMLInputElement).value;

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Email ou senha inválidos';
      }
    } catch (error) {
      this.errorMessage = 'Erro de conexão';
    }
  }
}