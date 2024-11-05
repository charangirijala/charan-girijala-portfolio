import { LightningElement } from "lwc";

export default class WhatsNext extends LightningElement {
  emailId = "girijalac@gmail.com";
  mailToAddress = "mailto:" + this.emailId;
  renderedCallback() {
    console.log("Email id:", this.emailId);
  }
}
