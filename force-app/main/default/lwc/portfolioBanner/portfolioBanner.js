import { LightningElement, wire, api } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import Ninjabootstrap from "@salesforce/resourceUrl/Ninjabootstrap";
import FULLNAME from "@salesforce/schema/Portfolio__c.Full_Name__c";
import LOCATION from "@salesforce/schema/Portfolio__c.Location__c";
import COMPANY_NAME from "@salesforce/schema/Portfolio__c.CompanyName__c";
import DESIGNATION from "@salesforce/schema/Portfolio__c.Designation__c";
export default class PortfolioBanner extends LightningElement {
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
  //site urls
  @api trRecordId; //= "a00NS000008ujYzYAI";
  @api trLinkedinUrl; // = "https://www.linkedin.com/in/charan-girijala-ba2257233/";
  @api trGithubUrl; //= "https://github.com/charangirijala";
  @api trTwitterUrl; //= "https://github.com/charangirijala";
  @api trTrailheadUrl; //=
  //"https://www.salesforce.com/trailblazer/lm21othp36tt9fs0bd";

  //igonore these properties
  @api recordId;
  @api linkedinUrl;
  @api githubUrl;
  @api twitterUrl;
  @api trailheadUrl;

  @wire(getRecord, {
    recordId: "$trRecordId",
    fields: [FULLNAME, LOCATION, COMPANY_NAME, DESIGNATION]
  })
  portfolioData;
  // portfolioHandler({ data, err }) {
  //   if (data) {
  //     console.log("Data : ", JSON.stringify(data));
  //   }
  //   if (err) {
  //     console.error(err);
  //   }
  // }

  get fullName() {
    return getFieldValue(this.portfolioData.data, FULLNAME);
  }

  get location() {
    return getFieldValue(this.portfolioData.data, LOCATION);
  }

  get companyName() {
    return getFieldValue(this.portfolioData.data, COMPANY_NAME);
  }

  get designation() {
    return getFieldValue(this.portfolioData.data, DESIGNATION);
  }
}
