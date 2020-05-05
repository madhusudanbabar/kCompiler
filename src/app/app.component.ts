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
  file;
  getFile(event){
    this.file = event.target.files[0]
  }

  
  debug:boolean = false;
  submit(f:NgForm){
    this.compiling = true;
    // console.log(f.form);
    var dto = new FormData()
    dto.append("file",this.file)
    console.log(this.file);
    dto.append("name", f.value.code)
    this.ser.post("/upload",dto).toPromise().then(res=>{
      console.log(JSON.stringify(res));
      this.compiling = false;
    },
    err=>{
      console.log(err);
      alert(err.statusText)
      this.compiling = false;
    });
  }  
}
