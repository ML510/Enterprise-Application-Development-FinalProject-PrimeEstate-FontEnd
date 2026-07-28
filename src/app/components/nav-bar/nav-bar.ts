import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css'],
})
export class NavBar implements OnInit {


  @Input() isDark = false;

  // Emits up to AppComponent to toggle the theme
  @Output() themeToggled = new EventEmitter<void>();

  selectedLang: 'EN' | 'AR' = 'EN';
  private readonly langStorageKey = 'prime-state-page-lang';

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem(this.langStorageKey);
    if (savedLang === 'EN' || savedLang === 'AR') {
      this.selectedLang = savedLang;
    }

    this.ensureGoogleTranslate();
    setTimeout(() => {
      this.applyWholePageLanguage(this.selectedLang);
    }, 300);
  }

  toggle() {
    this.themeToggled.emit();
  }

  setLang(lang: 'EN' | 'AR') {
    this.selectedLang = lang;
    localStorage.setItem(this.langStorageKey, this.selectedLang);
    this.applyWholePageLanguage(this.selectedLang);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBack() {
    this.location.back();
  }

  isRootPath(): boolean {
    return this.router.url === '/';
  }

  changeLanguage() {
    this.selectedLang = this.selectedLang === 'EN' ? 'AR' : 'EN';
    localStorage.setItem(this.langStorageKey, this.selectedLang);
    this.applyWholePageLanguage(this.selectedLang);
  }

  private ensureGoogleTranslate(): void {
    const win = window as any;
    if (win.google?.translate) {
      this.initializeTranslateWidget();
      return;
    }

    win.googleTranslateElementInit = () => {
      this.initializeTranslateWidget();
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  private initializeTranslateWidget(): void {
    const win = window as any;
    if (!win.google?.translate || document.querySelector('.goog-te-combo')) {
      return;
    }

    if (!document.getElementById('google_translate_element')) {
      const mount = document.createElement('div');
      mount.id = 'google_translate_element';
      mount.style.display = 'none';
      document.body.appendChild(mount);
    }

    new win.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,ar',
        autoDisplay: false,
      },
      'google_translate_element'
    );
  }

  private applyWholePageLanguage(lang: 'EN' | 'AR'): void {
    const targetLang = lang.toLowerCase();
    const apply = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (!select) {
        return false;
      }

      select.value = targetLang;
      select.dispatchEvent(new Event('change'));
      return true;
    };

    if (apply()) {
      return;
    }

    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (apply() || tries > 20) {
        clearInterval(timer);
      }
    }, 200);
  }


}
