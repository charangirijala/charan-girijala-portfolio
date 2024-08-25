import { api, LightningElement, track } from "lwc";

export default class WhatsNext extends LightningElement {
  @api emailId;
  @track mailToAddress;
  renderedCallback() {
    console.log("Email id:", this.emailId);
  }
}
