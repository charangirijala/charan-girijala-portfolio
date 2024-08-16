/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import Ninjabootstrap from "@salesforce/resourceUrl/Ninjabootstrap";
export default class MasterComponent extends LightningElement {
  summaryDetails;
  bootStrapLoaded = false;
  email;
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
  summaryDetailsHandler(event) {
    console.log("Details of summary::", JSON.stringify(event.detail));
    this.summaryDetails = {
      summaryOne: event.detail.summaryoneData,
      summaryTwo: event.detail.summarytwoData,
      summaryThree: event.detail.summarythreeData
    };
    this.email = event.detail.email;
  }

  @api recordId; //= "a00NS000008ujYzYAI";
  @api linkedinUrl; // = "https://www.linkedin.com/in/charan-girijala-ba2257233/";
  @api githubUrl; //= "https://github.com/charangirijala";
  @api twitterUrl; //= "https://github.com/charangirijala";
  @api trailheadUrl; //trailhead link

  @api trailHeadRanking;
  @api trailHeadRankImg;

  @api badges;
  @api points;
  @api trails;
}
