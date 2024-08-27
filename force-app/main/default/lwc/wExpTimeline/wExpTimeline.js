import { LightningElement, track, wire } from "lwc";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";

class WorkExperience {
  role;
  organization;
  duration;
  expSummary;
  processExpSummary(data) {
    if (data == null) return null;
    data = data.replaceAll("</li>", "");
    data = data.replace("<li>", "");
    data = data.replaceAll("<ul>", "");
    data = data.replaceAll("</ul>", "");
    //console.log(data);
    const weSummary = data.split("<li>");
    return weSummary;
  }
}

export default class WExpTimeline extends LightningElement {
  workExpData = [];
  @track workExpObj = [];
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
  workExp({ error, data }) {
    if (data) {
      this.workExpData = data.records;
      //console.log("WorkExperience: ", JSON.stringify(this.workExpData));
      this.processRecords();
    } else if (error) {
      console.log("Error Fetching work Experience", error);
    }
  }
  processRecords() {
    this.workExpData.forEach((exp) => {
      var we = new WorkExperience();
      we.organization = exp.fields.Organization__c.value;
      we.duration = exp.fields.Duration__c.value;
      we.expSummary = we.processExpSummary(
        exp.fields.Experience_Summary__c.value
      );
      we.role = exp.fields.Role__c.value;
      this.workExpObj.push(we);
      console.log(JSON.stringify(we.expSummary));
    });
  }
}
