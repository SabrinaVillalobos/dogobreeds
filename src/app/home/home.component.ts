import { Component } from '@angular/core';
import { DogsService } from '../services/dogs.service';


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
  subBreed = [];
  breeed = [];
  value = [];
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
  )

   /**
   *Lottie animation configuration.
   */ {
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
    this.dropdownList2 = [
    ];

    /**
     * settings of ng-multiselect-dropdown
     */
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
  }
  onSelectAll(items: any) {
  }

  /**
   * Gets random pictures of dogs
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
   * Displays a list of all dog breeds
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
   * Gets random pics of selected breed
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
                pic: picture,
                breed: breed
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

  /**
   * When one selection deleted refresh selected breeds
   * if none is selected cleans all cards
   * @param {*} items
   * @memberof HomeComponent
   */
  onItemDeSelect(items: any) {
    if (this.selectedItems.length > 0) {
      this.selectedBreed(items);
    } else {
      this.cards = [];
    }
  }

  /**
   * Gets sub breeds
   * @param breed 
   */
  getSubBreeds(subBreed) {
    this.dogsService.getSubBreeds(subBreed).subscribe(
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
   * Calls random pictures of selected breed when one breed is selected
   *
   * @param {string} selectedBreed
   * @memberof HomeComponent
   */
  selectedBreed(selBreed) {
    if (selBreed.length > 0) {
      this.getSubBreeds(selBreed);
      this.getRandomPicsForBreed(this.selectedItems);
    }
  }

  /**
   * Calls random picture for sub breed when one sub breed is selected
   *
   * @param {*} subBreed
   * @memberof HomeComponent
   */
  selectedSubBreed(subBreed: any) {
    if (this.selectedItems.length > 0) {
      this.getRandomPicsForSubBreed(this.selectedItems, subBreed);
    }
  }
  /**
   * Gets random pics for sub breed
   * @param breeds 
   */
  getRandomPicsForSubBreed(breeds: any, subBreed: any) {
    this.cards = [];
    for (let breed of breeds) {
      this.dogsService.getRandomPicsForSubBreed(breed, subBreed).subscribe(
        data => {
          const randomPics = data.message;
          for (var i = 1; i < randomPics.length; i++) {
            for (let picture of randomPics) {
              this.cards.push({
                id: i++,
                pic: picture,
                breed: breed,
                subbreed: subBreed
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