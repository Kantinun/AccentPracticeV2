import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router";
import { DataService } from '../services/data.service'

@Component({
    selector: 'ns-practice',
    templateUrl: './practice.component.html',
    styleUrls: ["./practice.component.css"]
  })
export class Practicecomponent implements OnInit {
    filterFav:boolean;    
    constructor(private DataService: DataService , private router: Router) {
        this.filterFav = false
    }
    words : Array<any>
    ngOnInit(): void {
        this.words = this.DataService.getAllWord()
        console.log(this.words) 
        
    }
    
    goDetail(word : string){
        this.router.navigate(["/practice", word]);
    }
    back() {
        this.router.navigate(["/homepage"]);
    }
    filter(){
        this.filterFav = !this.filterFav
        console.log(this.filterFav)        
        this.router.navigate(["/practice"]);
        if(this.filterFav== false){
            this.words = this.DataService.getAllWord()
        }else{
            this.words = this.DataService.getFavorite()
        }
        console.log(this.words) 
    }
}