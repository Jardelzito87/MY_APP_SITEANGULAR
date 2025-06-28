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
          <button type="button" (click)="showForgotPassword()" class="forgot-btn">Esqueci a Senha</button>
          <div class="error" [style.display]="errorMessage ? 'block' : 'none'">{{ errorMessage }}</div>
          <div class="success" [style.display]="successMessage ? 'block' : 'none'">{{ successMessage }}</div>
        </form>
        
        <!-- Formulário Esqueci a Senha -->
        <form [style.display]="showForgot ? 'block' : 'none'" (submit)="onForgotPassword($event)" class="forgot-form">
          <h3>Esqueci a Senha</h3>
          <p>Digite seu email para receber um link de reset:</p>
          <div class="form-group">
            <input type="email" #forgotEmail placeholder="Seu Email" required>
          </div>
          <button type="submit">Enviar Email</button>
          <button type="button" (click)="showForgot = false">Cancelar</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
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

    .success {
      color: #44ff44;
      text-align: center;
      margin-top: 10px;
    }

    .forgot-btn {
      background: transparent;
      border: 1px solid #f4b400;
      color: #f4b400;
      margin-top: 10px;
    }

    .forgot-form {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #333;
    }

    .forgot-form h3 {
      color: #f4b400;
      text-align: center;
      margin-bottom: 20px;
    }
  `]
})
export class LoginComponent {
  private router = inject(Router);
  
  errorMessage: string = '';
  successMessage: string = '';
  showForgot: boolean = false;

  showForgotPassword() {
    this.showForgot = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  async onLogin(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
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

  async onForgotPassword(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement).value;

    try {
      const response = await fetch('http://localhost:3001/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        this.successMessage = 'Email de reset enviado! Verifique sua caixa de entrada.';
        this.errorMessage = '';
        this.showForgot = false;
      } else {
        const data = await response.json();
        this.errorMessage = data.message || 'Erro ao enviar email';
      }
    } catch (error) {
      this.errorMessage = 'Erro de conexão';
    }
  }
}