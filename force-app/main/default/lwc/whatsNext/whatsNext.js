import { api, LightningElement, track } from "lwc";

export default class WhatsNext extends LightningElement {
  @api email;
  @track mailToAddress;
  renderedCallback() {
    console.log("Email id:", this.email);
    if (this.email) {
      this.mailToAddress = "mailto:" + this.email;
    }
  }
}
