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
  public lottieConfig: Object;
  public cards = [];
  public allBreeds: Array<any>;
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  selected = -1;


  constructor(
    public dogsService: DogsService,
  ) {  this.lottieConfig = {
    path: "assets/json/dog-lottie.json",
    autoplay: true,
    loop: true
  }; }

  ngOnInit() {
    this.getRandomPics();
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

              pic: picture,

              likes: 0

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
        this.allBreeds = Object.keys(jsonParsed);
        console.log("razaaaastest",this.allBreeds);
      },
      error => {
        console.log('error');
      }
    )
  }

  selectBreed(selectedBreed: string) {
    console.log(selectedBreed);
    this.getRandomPicsForBreed(selectedBreed);
  }

  getRandomPicsForBreed(breed) {
    this.cards = [];
    this.dogsService.getRandomPicsForBreed(breed).subscribe(
      data => {
        const randomPics = data.message;

        for (var i = 1; i < randomPics.length; i++) {
          for (let pictureLink of randomPics) {
            this.cards.push({
              id: i++,
              img_link: pictureLink,
              likes: 0
            });
          }
        }
      },
      error => {
        console.log('error');
      }
    );
  }
}
