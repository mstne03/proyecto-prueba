import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CardComponent } from '@/shared/components/card/card.component';

interface NewsItem {
  imageUrl: string;
  title: string;
  subtitle: string;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent, IonHeader,
    IonTitle, IonToolbar,
    CommonModule, FormsModule,
    CardComponent
  ]
})

export class HomePage {
  news: NewsItem[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600',
      title: 'CS2 Major Copenhagen — Grand Final Recap',
      subtitle: 'Esports · 2h ago',
      content: 'NaVi dominated the final map to claim their second consecutive Major title, defeating Team Vitality 2–1 in a nail-biting series that kept fans on the edge of their seats.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600',
      title: 'New Operation: Breakout Skins Revealed',
      subtitle: 'Updates · 5h ago',
      content: 'Valve has dropped a teaser for the upcoming Operation Breakout, featuring 12 new weapon collections including a coveted Karambit finish with animated particles.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600',
      title: 'AK-47 Asiimov Hits All-Time Price High',
      subtitle: 'Market · 8h ago',
      content: 'The AK-47 Asiimov Factory New surged 34% this week, reaching €1,240 on the Steam Market. Analysts attribute the spike to influencer exposure during the Major stream.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=600',
      title: 'Top 10 Budget Skins Under €5 in 2025',
      subtitle: 'Guide · 1d ago',
      content: 'Looking to refresh your loadout without breaking the bank? We ranked the best-looking skins available for under €5, from the M4A1-S Icarus Fell to the Glock-18 Water Elemental.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
      title: 'Faceit Anti-Cheat 2.0 Launches Next Month',
      subtitle: 'Tech · 2d ago',
      content: 'FACEIT announced a major overhaul of its anti-cheat system, promising kernel-level detection and a 90% reduction in smurfing reports based on their closed beta results.'
    },
  ];
}
