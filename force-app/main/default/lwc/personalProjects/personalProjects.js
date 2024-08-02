import { LightningElement, wire, track } from "lwc";
import UNSPLASH_IMG from "@salesforce/resourceUrl/stockUnsplashImg";

import { getRelatedListRecords } from "lightning/uiRelatedListApi";

export default class PersonalProjects extends LightningElement {
  imageUrl = UNSPLASH_IMG;
  allProjectsData = [];
  @track mainProjectData;
  @track leftProjectsData = [];
  @track rightProjectsData = [];

  renderedCallback() {
    //const mainProject = this.template.querySelector(".main-project");
    //mainProject.style.backgroundImage = `url('${UNSPLASH_IMG}')`;
    //const sideProjects = this.template.querySelector(".side-projects");
    //sideProjects.style.backgroundImage = `url('${UNSPLASH_IMG}')`;
  }

  @wire(getRelatedListRecords, {
    parentRecordId: "a00NS000008ujYzYAI",
    relatedListId: "Personal_Projects__r",
    fields: [
      "Personal_Project__c.Is_Main_Project__c",
      "Personal_Project__c.Name",
      "Personal_Project__c.Tags__c",
      "Personal_Project__c.Summary_One__c",
      "Personal_Project__c.Summary_Two__c",
      "Personal_Project__c.Summary_Three__c",
      "Personal_Project__c.Github_Link__c",
      "Personal_Project__c.Website_Link__c",
      "Personal_Project__c.Background_Image__c",
      "Personal_Project__c.Position__c"
    ]
  })
  getAllProjects({ error, data }) {
    if (data) {
      console.log(data);
      this.allProjectsData = data;
      this.processProjectData(data);
    } else if (error) {
      console.log(error);
    }
  }

  processProjectData(data) {
    console.log("From processProjectData Function");

    this.allProjectsData = data.records;
    console.log("allProjectsData: ", this.allProjectsData);
    this.allProjectsData.forEach((project) => {
      if (
        project.fields.Is_Main_Project__c.value &&
        project.fields.Position__c.value === "Middle"
      ) {
        this.mainProjectData = project;
        //console.log("Found Main Project: ", this.mainProjectData);
      } else if (project.fields.Position__c.value === "Left") {
        this.leftProjectsData.push(project);
      } else if (project.fields.Position__c.value === "Right") {
        this.rightProjectsData.push(project);
      }
    });
  }

  projectData = {
    heading: "APEX LOG ANALYZER",
    tags: [
      "LWC",
      "Apex",
      "Integration",
      "Javascript",
      "Javascript",
      "Javascript"
    ],
    summary1:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit aut,accusamus totam, earum assumenda illo distinctio nam et tempore omnis perferendis dolorum recusandae exercitationem incidunt voluptatibu facilis. Sed, dolore neque.",
    summary2:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit aut,accusamus totam, earum assumenda illo distinctio nam et tempore omnis perferendis dolorum recusandae exercitationem incidunt voluptatibu facilis. Sed, dolore neque.",
    summary3:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit aut,accusamus totam, earum assumenda illo distinctio nam et tempore omnis perferendis dolorum recusandae exercitationem incidunt voluptatibu facilis. Sed, dolore neque.",
    backgroundImage: ""
  };
}
