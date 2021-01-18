import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubcription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubcription = interval(1000).subscribe( count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create( observer => {
      let count = 0;
      setInterval( ()=> {
        observer.next(count);
        if(count == 4) {
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000)
    });

    customIntervalObservable.pipe(map( data => {
      return 'Round: ' + (+data + 1);
    }));

    this.firstObsSubcription = customIntervalObservable.subscribe(data => {
      console.log('Round:' + (data + 1));
    }, error => {
      alert(error);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(){
    this.firstObsSubcription.unsubscribe();
  }
}
