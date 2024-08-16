import { LightningElement, wire, api } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import Ninjabootstrap from "@salesforce/resourceUrl/Ninjabootstrap";
import FULLNAME from "@salesforce/schema/Portfolio__c.Full_Name__c";
import LOCATION from "@salesforce/schema/Portfolio__c.Location__c";
import COMPANY_NAME from "@salesforce/schema/Portfolio__c.CompanyName__c";
import DESIGNATION from "@salesforce/schema/Portfolio__c.Designation__c";
import SUMMARY_ONE from "@salesforce/schema/Portfolio__c.Summary_One__c";
import SUMMARY_TWO from "@salesforce/schema/Portfolio__c.Summary_Two__c";
import SUMMARY_THREE from "@salesforce/schema/Portfolio__c.Summary_Three__c";
import EMAIL from "@salesforce/schema/Portfolio__c.Email__c";
export default class PortfolioBanner extends LightningElement {
  bootStrapLoaded = false;
  //loading bootstrap
  renderedCallback() {
    //bootstrap
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

    const event = new CustomEvent("summarydetails", {
      detail: {
        summaryoneData: getFieldValue(this.portfolioData.data, SUMMARY_ONE),
        summarytwoData: getFieldValue(this.portfolioData.data, SUMMARY_TWO),
        summarythreeData: getFieldValue(this.portfolioData.data, SUMMARY_THREE),
        email: getFieldValue(this.portfolioData.data, EMAIL)
      }
    });
    this.dispatchEvent(event);
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
    fields: [
      FULLNAME,
      LOCATION,
      EMAIL,
      COMPANY_NAME,
      DESIGNATION,
      SUMMARY_ONE,
      SUMMARY_TWO,
      SUMMARY_THREE
    ]
  })
  portfolioData;

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

  get summaryOne() {
    return getFieldValue(this.portfolioData.data, SUMMARY_ONE);
  }

  get summaryTwo() {
    return getFieldValue(this.portfolioData.data, SUMMARY_TWO);
  }

  get summaryThree() {
    return getFieldValue(this.portfolioData.data, SUMMARY_THREE);
  }
}
