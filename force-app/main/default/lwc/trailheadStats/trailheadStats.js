import { api, LightningElement } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import Ninjabootstrap from "@salesforce/resourceUrl/Ninjabootstrap";

export default class TrailheadStats extends LightningElement {
  bootStrapLoaded = false;
  //loading bootstrap
  renderedCallback() {
    if (!this.bootStrapLoaded) {
      Promise.all([loadStyle(this, Ninjabootstrap)])
        .then(() => {
          this.bootStrapLoaded = true;
          console.log("Ninjabootstrap Loaded");
        })
        .catch((err) => {
          console.log("Err loading bootstrap in portfolioBanner", err);
        });
    }
  }

  @api trailHeadRankImg;

  @api badges;
  @api points;
  @api trails;
}
