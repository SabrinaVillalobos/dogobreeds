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
  dropdownList2 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  public lottieConfig: Object;
  public cards = [];
  public allBreeds: Array<any>;
  public allSubBreeds: Array<any>;

  /**
   *Creates an instance of HomeComponent.
   * @param {DogsService} dogsService
   * @memberof HomeComponent
   */
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
    this.getAllBreeds();

    this.dropdownList = [
    ];
    this.selectedItems = [
    ];
    this.selectedItems2 = [
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

    
    this.dropdownList2 = [
    ];
  }

  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }


  /**
   * Shows random pictures of dogs
   *
   * @memberof HomeComponent
   */
  getRandomPics() {
    this.cards = [];
    this.dogsService.getRandomPics().subscribe(
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
    )
  }
  

  /**
   * Displays a list of all breeds
   *
   * @memberof HomeComponent
   */
  getAllBreeds() {
    this.dogsService.getAllBreeds().subscribe(
      data => {
        var jsonStr = JSON.stringify(data.message);
        var jsonParsed = JSON.parse(jsonStr);
        this.dropdownList = Object.keys(jsonParsed);
        
      },
      error => {
        console.log('error');
      }
    );
  }
  

  /**
   * Gets random pics for breed
   * @param breeds 
   */
  getRandomPicsForBreed(breeds) {
    this.cards = [];
     for (let breed of breeds) {
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
    };
  }

   onItemDeSelect(items: any){
    if (this.selectedItems.length > 0 ){
      this.selectedBreed('');
    }
  }
  
/**
 * Gets sub breeds
 * @param breed 
 */
getSubBreeds(breed) {
  this.dogsService.getSubBreeds(breed).subscribe(
    data => {
      var jsonStr = JSON.stringify(data.message);
      var jsonParsed = JSON.parse(jsonStr);
      this.dropdownList2 = jsonParsed;
      
    },
    error => {
      console.log('No sub breeds for this breed');
    }
  );
}
  /**
   * Gets random pictures of selected breed
   *
   * @param {string} selectedBreed
   * @memberof HomeComponent
   */
  selectedBreed(selectedBreed: any) {
    this.getRandomPicsForBreed(this.selectedItems);
  }

/**
 * Gets random pics for sub breed
 * @param breeds 
 */

getRandomPicsForSubBreed(breeds) {
  this.cards = [];
   for (let breed of breeds) {
    this.dogsService.getRandomPicsForSubBreed(breed).subscribe(
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
  };
}

}
