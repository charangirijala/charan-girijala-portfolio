import { LightningElement, wire } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import Ninjabootstrap from "@salesforce/resourceUrl/Ninjabootstrap";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";
import WE_NAME from "@salesforce/schema/Work_Experience__c.Name";
import ORGANIZATION from "@salesforce/schema/Work_Experience__c.Organization__c";
import START_DATE from "@salesforce/schema/Work_Experience__c.Start_Date__c";
import END_DATE from "@salesforce/schema/Work_Experience__c.End_Date__c";
import EXP_SUMMARY from "@salesforce/schema/Work_Experience__c.Experience_Summary__c";
export default class WorkExperience extends LightningElement {
  records;
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

  @wire(getRelatedListRecords, {
    ParentRecordId: "a00NS000008ujYzYAI",
    RelatedListId: "Work_Experience__c",
    fields: [WE_NAME, ORGANIZATION, START_DATE, END_DATE, EXP_SUMMARY]
  })
  weList({ error, data }) {
    if (data) {
      this.records = data.records;
    } else if (error) {
      console.log("Error fetching Related List Work_Experience__c", error);
    }
  }
  NUM_OF_TABS = 3;
  tabs = [];
  get tabData() {
    for (let i = 0; i < this.NUM_OF_TABS; i++) {
      this.tabs.push({
        value: `${i}`,
        label: `Item ${i}`,
        content: `Tab Content ${i}`
      });
    }
    return this.tabs;
  }

  handleActive() {
    console.log("Tab active");
  }
}
