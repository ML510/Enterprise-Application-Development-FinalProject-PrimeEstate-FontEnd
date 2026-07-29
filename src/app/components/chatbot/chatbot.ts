import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot implements OnInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  private readonly storageKey = 'prime-state-chatbot-messages';

  constructor(private http: HttpClient , private cdr: ChangeDetectorRef) {}

  text = '';
  loading = false;

  messages: { role: 'assistant' | 'customer'; text: string }[] = [
    {
      role: 'assistant',
      text: 'Welcome to PrimeState. I am your personal concierge. How can I assist with your property search today?',
    },
  ];

  ngOnInit(): void {
    const storedMessages = localStorage.getItem(this.storageKey);

    if (!storedMessages) {
      this.saveMessages();
      return;
    }

    try {
      const parsedMessages = JSON.parse(storedMessages) as { role: 'assistant' | 'customer'; text: string }[];
      if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
        this.messages = parsedMessages;
        return;
      }
    } catch {
      // Fall back to the default welcome message below.
    }

    this.saveMessages();
  }

  private scrollToBottom(): void {
    queueMicrotask(() => {
      const container = this.messagesContainer?.nativeElement;
      if (!container) {
        return;
      }

      container.scrollTop = container.scrollHeight;
    });
  }

  private saveMessages(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.messages));
  }

  sendMessage() {
    const messageText = this.text.trim();
    if (!messageText || this.loading) {
      return;
    }

    this.loading = true;
    this.messages.push({ role: 'customer', text: messageText });
    this.saveMessages();
    this.text = '';
    this.scrollToBottom();

    this.http
      .get(`http://localhost:8080/api/model/send?msg=${messageText}`, { responseType: 'text' })
      .subscribe((response) => {
        this.messages.push({ role: 'assistant', text: response as string });
        this.saveMessages();
        this.loading = false;
        this.scrollToBottom();
        this.cdr.detectChanges();
      }, (error) => {
        console.error('Chatbot request failed:', error);
        this.loading = false;
        this.scrollToBottom();
        this.cdr.detectChanges();
      });
  }

}
