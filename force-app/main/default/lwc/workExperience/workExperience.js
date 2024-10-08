import { api, LightningElement, wire } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import Ninjabootstrap from "@salesforce/resourceUrl/Ninjabootstrap";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";
export default class WorkExperience extends LightningElement {
  @api summaryDetails;
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

    console.log(
      "Summary from workExperience",
      JSON.stringify(this.summaryDetails)
    );
  }

  @wire(getRelatedListRecords, {
    parentRecordId: "a00NS000008ujYzYAI",
    relatedListId: "Work_Experiences__r",
    fields: [
      "Work_Experience__c.Name",
      "Work_Experience__c.Organization__c",
      "Work_Experience__c.Duration__c",
      "Work_Experience__c.Experience_Summary__c",
      "Work_Experience__c.Role__c",
      "Work_Experience__c.Duration__c"
    ]
  })
  weList({ error, data }) {
    if (data) {
      this.records = data.records;
      //console.log(this.records);
    } else if (error) {
      console.log(
        "Error fetching Related List Work_Experiences__r-->",
        error.body.message
      );
    }
  }

  //prepare all data in tabs array to use in lighting-tab
  tabs = [];
  tabNames = [];
  tabContent = [];
  get tabData() {
    if (this.tabs.length !== 0) return this.tabs;
    else if (this.records != null) {
      let count = 0;
      this.records.forEach((workExp) => {
        this.tabNames.push({
          company: workExp.fields.Organization__c.value,
          dataId: "tabId-" + count.toString()
        });
        this.tabContent.push({
          dataId: "tabId-" + count.toString(),
          duration: workExp.fields.Duration__c.value,
          role: workExp.fields.Role__c.value,
          summary: this.getSummaryList(
            workExp.fields.Experience_Summary__c.value
          )
        });
        this.tabs.push({
          value: `${workExp.fields.Organization__c.value}`,
          label: `${workExp.fields.Organization__c.value}`,
          content: this.getSummaryList(
            workExp.fields.Experience_Summary__c.value
          ),
          role: `${workExp.fields.Role__c.value}`,
          duration: `${workExp.fields.Duration__c.value}`
        });

        count++;
      });
    }
    console.log("Size of tabs: ", this.tabs.length);
    console.log("Tab Names: ", this.tabNames.length);
    console.log("Tab content: ", this.tabContent.length);
    return this.tabs;
  }

  //function to extract points from experience summary
  getSummaryList(data) {
    if (data == null) {
      return null;
    }
    data = data.replaceAll("</li>", "");
    data = data.replace("<li>", "");
    data = data.replaceAll("<ul>", "");
    data = data.replaceAll("</ul>", "");
    //console.log(data);
    const weSummary = data.split("<li>");
    return weSummary;
  }

  //handle the styling and functionality of active tab
  handleActive() {
    console.log("Tab active");
  }

  handleTabClick(event) {
    const dataId = event.currentTarget.dataset.id;
    // console.log(
    //   "Button clicked with data-id: ",
    //   event.currentTarget.dataset.id
    // );

    const ulTag = this.template.querySelector(".slds-tabs-mobile");
    const panelTags = this.template.querySelectorAll(".slds-panel");
    ulTag.classList.add("slds-hidden");
    ulTag.style.display = "none";
    panelTags.forEach((tag) => {
      if (dataId === tag.dataset.id) {
        // console.log("Entered if condition");
        tag.hidden = false;
        tag.classList.remove("slds-hidden");
        tag.classList.add("slds-is-open");
      }
    });
  }

  handleBackNavigation(event) {
    const dataId = event.currentTarget.dataset.id;
    // console.log("Back Nav button clicked", dataId);
    const ulTag = this.template.querySelector(".slds-tabs-mobile");
    ulTag.classList.remove("slds-hidden");
    ulTag.style.display = "block";
    const panelTags = this.template.querySelectorAll(".slds-panel");

    panelTags.forEach((tag) => {
      if (dataId === tag.dataset.id) {
        //console.log("Entered if condition");
        tag.hidden = true;
        tag.classList.add("slds-hidden");
        tag.classList.remove("slds-is-open");
      }
    });
  }
}
