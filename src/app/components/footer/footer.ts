import { ChangeDetectorRef, Component } from '@angular/core';
import { Chatbot } from '../chatbot/chatbot';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, Chatbot, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  isChatOpen = false;
  mail: string = '';
  subscribeMessage = '';

  constructor(private http:HttpClient,private cdr: ChangeDetectorRef) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  whatsappOpen() {
    window.open('https://wa.me/message/GU66FORKVCWZP1', '_blank');
  }

  mailSubscribe(){
    const email = this.mail.trim();

    if (!email || !email.includes('@')) {
      this.subscribeMessage = 'Please enter a valid email address.';
      return;
    }else{
      this.subscribeMessage = '';
    }

    const url = `http://localhost:8080/api/mail/subscribe?email=${(this.mail)}`;

    this.http.post(url, {}).subscribe({
      next: (response) => {
        this.subscribeMessage = 'Subscribed successfully!';
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.subscribeMessage = 'Subscription failed. Please try again later.';
        this.cdr.detectChanges();
      }
    });
  }
  
}
