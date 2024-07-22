import { LightningElement, wire, api } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import Ninjabootstrap from "@salesforce/resourceUrl/Ninjabootstrap";
import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets";
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
  @api recordId; //= "a00NS000008ujYzYAI";
  @api linkedinUrl; // = "https://www.linkedin.com/in/charan-girijala-ba2257233/";
  @api githubUrl; //= "https://github.com/charangirijala";
  @api twitterUrl; //= "https://github.com/charangirijala";
  @api trailheadUrl; //=
  //"https://www.salesforce.com/trailblazer/lm21othp36tt9fs0bd";
  //Image links
  userPic = `${PortfolioAssets}/PortfolioAssets/userPic.jpeg`;
  linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
  github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
  twitter = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`;
  trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`;

  @wire(getRecord, {
    recordId: "$recordId",
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
