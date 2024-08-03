import { LightningElement, api } from "lwc";
// import UNSPLASH_IMG from "@salesforce/resourceUrl/stockUnsplashImg";

export default class SingleProject extends LightningElement {
  @api projectData;
  renderedCallback() {
    console.log("Rendered Callback of singleProject: ", this.projectData);
    const wrapper = this.template.querySelector(".wrapper");
    if (this.projectData) {
      wrapper.style.backgroundImage = `linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.6)
    ),url('${this.projectData.fields.Background_Image__c.value}')`;
    }
  }

  get tagsArr() {
    let arr = this.projectData.fields.Tags__c.value.split(";");
    return arr;
  }
}
