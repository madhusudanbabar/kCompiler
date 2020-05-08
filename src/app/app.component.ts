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
  compiling: boolean;
  showOp: boolean;
  op: any;
  fileContents: string;

  constructor(private ser: HttpClient) { }

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
    #include<iostream>
    using namespace std;
    int main(){
      cout << "hello world";
    }
  }`
    },

    {
      name: "python",
      snippet: "print('hello world')"
    }
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


  file: File;
  getFile(event) {
    this.file = event.target.files[0];
    this.file.text().then((value) => {
      console.log(value);
      document.querySelector("textarea").value = value;
    }).catch((err) => {
      console.log(err);
    })
  }


  debug: boolean = false;
  submit(f: NgForm) {
    this.showOp = false;
    this.op = null;
    this.compiling = true;
    var dto = new FormData()
    // dto.append("file", this.file)
    // console.log(this.file);
    dto.append("lang", this.selectedLang)
    console.log(this.selectedLang);
    dto.append("code", f.value.code)
    this.ser.post("/upload", dto).toPromise().then(res => {
      console.log(res);
      this.op = res;
      this.compiling = false;
      this.showOp = true;
    },
      err => {
        console.log(err);
        alert(err.statusText)
        this.compiling = false;
      });
  }
}
