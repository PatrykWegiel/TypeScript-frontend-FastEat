import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getActiveRouterUrl(url: string = this.router.url)
  {
    let activeRouterData = this.getActiveRouterData(url);
    return activeRouterData['activeRouterUrl'];
  }

  getActiveRouterIcon(url: string = this.router.url)
  {
    let activeRouterData = this.getActiveRouterData(url);
    return activeRouterData['activeRouterIcon'];
  }

  private getActiveRouterData(url: string = this.router.url)
  {
    let activeRouterData: {
      "activeRouterIcon": string,
      "activeRouterUrl": string
    } = {
      "activeRouterIcon": "bi-bookmark-star",
      "activeRouterUrl": "Dashboard"
    };

    switch(url) {
      case "/menu":
        activeRouterData["activeRouterUrl"] = "Menu";
        activeRouterData["activeRouterIcon"] = "bi-book"
        break;
        case "/menu/edit":
          activeRouterData["activeRouterUrl"] = "Menu";
          activeRouterData["activeRouterIcon"] = "bi-book"
          break;
      case "/orders":
        activeRouterData["activeRouterUrl"] = "Orders";
        activeRouterData["activeRouterIcon"] = "bi-box-seam"
        break;
      case "/delivery-zones":
        activeRouterData["activeRouterUrl"] = "Delivery zones";
        activeRouterData["activeRouterIcon"] = "bi-geo-alt"
        break;
        case "/login":
          activeRouterData["activeRouterUrl"] = "Sign in";
          activeRouterData["activeRouterIcon"] = "bi-box-arrow-in-right"
          break;
        case "/sign-up":
          activeRouterData["activeRouterUrl"] = "Sign up";
          activeRouterData["activeRouterIcon"] = "bi-person-fill"
          break;
        case "/configuration":
          activeRouterData["activeRouterUrl"] = "Configuration";
          activeRouterData["activeRouterIcon"] = "bi-gear"
          break;
      default:
        activeRouterData["activeRouterUrl"] = "Dashboard";
        activeRouterData["activeRouterIcon"] = "bi-bookmark-star"
        break;
    }
    return activeRouterData;
  }
}
