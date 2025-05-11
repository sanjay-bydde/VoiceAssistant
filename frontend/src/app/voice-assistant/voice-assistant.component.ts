import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-voice-assistant',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './voice-assistant.component.html',
  styleUrls: [],
})
export class VoiceAssistantComponent {
  transcript = '';
  isListening = false;
  recognition: any;
  backendResponse = '';

  constructor(private ngZone: NgZone, private http: HttpClient) {
    const { webkitSpeechRecognition }: any = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      this.ngZone.run(() => {
        this.transcript = event.results[0][0].transcript;
        console.log('Recognized:', this.transcript);

        // Call backend once speech is recognized
        this.sendToBackend(this.transcript);
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event);
    };
  }

  toggleListening() {
    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.transcript = '';
      this.backendResponse = '';
      this.recognition.start();
    }
    this.isListening = !this.isListening;
  }

  sendToBackend(text: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    this.http
      .post('http://localhost:8081/api/voice', text, {
        headers: headers,
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          this.backendResponse = response;
          console.log('Backend response:', response);
        },
        error: (error) => {
          console.error('Error from backend:', error);
          this.backendResponse = 'Error from backend';
        },
      });
  }
}
