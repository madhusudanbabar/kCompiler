import { Component } from '@angular/core';
import { langOptions } from "./langInt";
import { NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
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
  compiling:boolean;

  constructor(private ser:HttpClient){}

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
  


  submit(f:NgForm){
    this.compiling = true;
    console.log(f.form);
    this.ser.post("/upload",f.value).toPromise().then(res=>{
      console.log(res);
      this.compiling = false;
    },
    err=>{
      console.log(err);
      alert(err.statusText)
    });
  }  
}
