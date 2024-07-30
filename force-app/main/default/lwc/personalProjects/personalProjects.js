import { LightningElement } from "lwc";
import UNSPLASH_IMG from "@salesforce/resourceUrl/stockUnsplashImg";

export default class PersonalProjects extends LightningElement {
  imageUrl = UNSPLASH_IMG;

  renderedCallback() {
    const mainProject = this.template.querySelector(".main-project");
    mainProject.style.backgroundImage = `url('${UNSPLASH_IMG}')`;
  }
}
