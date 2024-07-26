import { LightningElement, api } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import Ninjabootstrap from "@salesforce/resourceUrl/Ninjabootstrap";
export default class MasterComponent extends LightningElement {
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

  @api recordId; //= "a00NS000008ujYzYAI";
  @api linkedinUrl; // = "https://www.linkedin.com/in/charan-girijala-ba2257233/";
  @api githubUrl; //= "https://github.com/charangirijala";
  @api twitterUrl; //= "https://github.com/charangirijala";
  @api trailheadUrl;
}
