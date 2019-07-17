import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DogsService } from '../services/dogs.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  public lottieConfig: Object;
  public cards = [];
  public allBreeds: Array<any>;

  constructor(
    public dogsService: DogsService
  ) {
  this.lottieConfig = {
    path: "assets/json/dog-lottie.json",
    autoplay: true,
    loop: true
  };
  }

  ngOnInit() {
    this.getRandomPics();
    this.getAllBreeds();

    this.dropdownList = [
    ];
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getRandomPics() {
    this.cards = [];
    this.dogsService.getRandomPics().subscribe(
      data => {
        const randomPics = data.message;
        console.log(data.message)
        for (var i = 1; i < randomPics.length; i++) {
          for (let picture of randomPics) {
            this.cards.push({
              id: i++,
              pic: picture
            });
          }
        }
      },
      error => {
        console.log('error');
      }
    )
  }
  

  getAllBreeds() {
    this.dogsService.getAllBreeds().subscribe(
      data => {
        var jsonStr = JSON.stringify(data.message);
        var jsonParsed = JSON.parse(jsonStr);
        this.dropdownList = Object.keys(jsonParsed);
        
        console.log("razaaaastest", this.allBreeds);
      },
      error => {
        console.log('error');
      }
    );
  }

  
  selectedBreed(selectedBreed: string) {
    console.log("raza seleccionada",selectedBreed);
    this.getRandomPicsForBreed(selectedBreed);
  }

  getRandomPicsForBreed(breed) {
    this.cards = [];
    this.dogsService.getRandomPicsForBreed(breed).subscribe(
      data => {
        const randomPics = data.message;
        for (var i = 1; i < randomPics.length; i++) {
          for (let picture of randomPics) {
            this.cards.push({
              id: i++,
              pic: picture
            });
          }
        }
      },
      error => {
        console.log('error');
      }
    );
  }
  
getSubBreeds(breed) {
  this.dogsService.getSubBreeds(breed).subscribe(
    data => {
      var jsonStr = JSON.stringify(data.message);
      var jsonParsed = JSON.parse(jsonStr);
      this.allBreeds = Object.keys(jsonParsed);
      
      console.log("subreed testestes", this.allBreeds);
    },
    error => {
      console.log('error');
    }
  );
}

}