import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
  standalone: true
})
export class CardComponent  implements OnInit {
  @Input() title: string = 'No title provided';
  @Input() subtitle: string = 'No subtitle provided';
  @Input() content: string = 'No content provided';
  @Input() imageUrl: string = '';

  constructor() { }

  ngOnInit() {}

}
