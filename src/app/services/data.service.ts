import { Injectable } from '@angular/core'
import { TNSTextToSpeech, SpeakOptions } from 'nativescript-texttospeech';
import { Dialogs } from "@nativescript/core";
import * as AppSettings from '@nativescript/core/application-settings'
export interface Data {
    word: string
    defi: string
    wordImage : any
    favorite: boolean
  }

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private Datas = new Array<Data>(
    { word: "Dog", defi: 'สุนัข' , wordImage : null, favorite: false},
    { word: "Cat", defi: 'เเมว' , wordImage : null, favorite: false},
    { word: "Pig", defi: 'หมู'  , wordImage : null, favorite: false},
  )
  speakOptions:SpeakOptions;
  constructor(private tts:TNSTextToSpeech){
    AppSettings.getBoolean("firstRun");
    // ถ้า run ครั้งเเรก
    if (AppSettings.getBoolean("firstRun") === undefined || AppSettings.getBoolean("firstRun") === null){
      AppSettings.setString("myDatas", JSON.stringify(this.Datas));
      AppSettings.setBoolean("firstRun", false);
    }else{// ถ้าไม่ใช่ครั้งเเรก ><
      this.Datas = JSON.parse(AppSettings.getString("myDatas"))
    }


  }
  getAllWord(): Array<Data> {
    return this.Datas
  }

  getWord(word: string): Data {
    return this.Datas.filter((Data) => Data.word === word)[0]
  }
  sound(item){
    this.speakOptions = {
      text: item, /// *** required ***
      speakRate: 0.5, // optional - default is 1.0
      pitch: 1.0, // optional - default is 1.0
      volume: 1.0, // optional - default is 1.0
      locale: 'en-GB', // optional - default is system locale,
      finishedCallback: (data)=>{console.log(data)} // optional
    }
    this.tts.speak(this.speakOptions).then(()=>{
    })
    //console.log(AppSettings.getBoolean("firstRun"));
  }
  add(word:string, definition:string){
    let temp = []
    for(let i =0;i<this.Datas.length;i++){
      temp.push(this.Datas[i].word.toLowerCase())
    }
    if(!temp.includes(word.toLowerCase())){
      this.Datas.push({word: word, defi: definition , wordImage : null, favorite: false})
      AppSettings.setString("myDatas", JSON.stringify(this.Datas));
    }else{
      Dialogs.alert({
        title: "Add word failed",
        message: "Already add this word",
        okButtonText: "OK"
      })
    }
  }
  edit(word:string, nWord:string, definition:string){
    for(let i =0;i<this.Datas.length;i++){
      if(this.Datas[i].word === word){
        if(nWord != "" && definition != ""){
          this.Datas[i].word = nWord
          this.Datas[i].defi = definition
        }
      }
    }
    AppSettings.setString("myDatas", JSON.stringify(this.Datas));
  }
  delete(word:string){
    for(let i =0;i<this.Datas.length;i++){
      if(this.Datas[i].word === word){
        this.Datas.splice(i,1)
      }
    }
    AppSettings.setString("myDatas", JSON.stringify(this.Datas));
  }

  addImage(word:string , imagePath:string){
    for(let i =0;i<this.Datas.length;i++){
      if(this.Datas[i].word === word){
        this.Datas[i].wordImage = imagePath;
      }
    }
    AppSettings.setString("myDatas", JSON.stringify(this.Datas));
  }

  makeFavorite(word:string){
    for(let i =0;i<this.Datas.length;i++){
      if(this.Datas[i].word === word){
        this.Datas[i].favorite = !this.Datas[i].favorite;
      }
    }
    AppSettings.setString("myDatas", JSON.stringify(this.Datas));
  }

  getFavorite(): Data[] {
    return this.Datas.filter((Data) => Data.favorite == true)
  }
}