import { Component } from '@angular/core';
import { langOptions } from "./langInt";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  lang: langOptions;
  selectedLang: string;
  snippet: string;
  code: string;
  title = 'compiler';

  languages: langOptions[] = [
    {
      name: "c",
      snippet: `
      #include<stdio.h>
      int main(){
          print('hello world');
        }
      }
      `
    },

    {
      name: "c++", snippet: `
    Include<iostream>
    using namespace std;
    int main(){
      cout << "hello world";
    }
  }`
    },

    { 
      name: "python", 
      snippet: "print('hello world')" }
  ]

  selectSnippet() {
    this.languages.find(sel => {
      if (sel.name == this.selectedLang) {
        this.snippet = sel.snippet
        console.log(this.snippet);
        document.querySelector("textarea").value = this.snippet;
        return;
      }
    })
  }
}
