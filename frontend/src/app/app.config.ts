import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { VoiceAssistantComponent } from './voice-assistant/voice-assistant.component';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter([])],
};
