import { Component } from '@angular/core';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { Hero } from '../../components/hero/hero';
import { FeaturedCollections } from "../../components/featured-collections/featured-collections";
import { PrimeLocation } from "../../components/prime-location/prime-location";
import { TrustedByInvestors } from "../../components/trusted-by-investors/trusted-by-investors";
import { Footer } from "../../components/footer/footer";
import { Chatbot } from "../../components/chatbot/chatbot";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBar, Hero, FeaturedCollections, PrimeLocation, TrustedByInvestors, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
