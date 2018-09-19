import { BrowserModule } from '@angular/platform-browser';
//import { NgModule , LOCALE_ID} from '@angular/core';
import { NgModule , TRANSLATIONS,TRANSLATIONS_FORMAT,LOCALE_ID} from '@angular/core';

import { AppComponent } from './app.component';
// Import the service
import { I18n } from '@ngx-translate/i18n-polyfill';
declare const require; // Use the require method provided by webpack
const translations = require(`raw-loader!../locale/messages.kn.xlf`);
export function localeFactory(): string {
  return (window.clientInformation && window.clientInformation.language) || window.navigator.language;
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [I18n,{
    provide: TRANSLATIONS,
    useFactory: (locale) => {
      locale = locale || 'en'; // default to english if no locale provided
      return require(`raw-loader!../locale/messages.${locale}.xlf`);
    },
    deps: [LOCALE_ID]
  },
  {
    provide: LOCALE_ID,
    useFactory: localeFactory
  },
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
