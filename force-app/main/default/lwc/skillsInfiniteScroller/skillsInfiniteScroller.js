import { LightningElement, wire } from "lwc";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";
export default class SkillsInfiniteScroller extends LightningElement {
  skillsData = [];
  skillsFinal = [];
  // firstLoad = false;
  renderedCallback() {
    this.initCssVariables();
    //provide all li elements skill confidence styling and svg image append
    this.appendStylesAndSVG();
  }

  @wire(getRelatedListRecords, {
    parentRecordId: "a00NS000008ujYzYAI",
    relatedListId: "Skills__r",
    fields: [
      "Skill__c.Skill_Confidence__c",
      "Skill__c.Svg_Image__c",
      "Skill__c.Name"
    ]
  })
  getSkills({ data, error }) {
    if (data) {
      this.skillsData = data.records;
    } else if (error) {
      console.log(error);
    }
  }
  initCssVariables() {
    var css = this.template.host.style;
    const marqueeElementsDisplayed = css.getPropertyValue(
      "--marquee-elements-displayed"
    );
    //     console.log("Executing initCssVariables");
    console.log("Marqueee elements:", marqueeElementsDisplayed);
    const marqueeContentLi = this.template.querySelectorAll("li");
    const marqueeContentUl = this.template.querySelector("ul.marquee-content");
    css.setProperty("--marquee-elements", marqueeContentLi.length);

    marqueeContentLi.forEach((singleLi) => {
      marqueeContentUl.appendChild(singleLi.cloneNode(true));
    });
  }

  //getter for all the data with skill confidence as css width property
  get allSkills() {
    if (this.skillsData == null) return null;
    this.skillsData.forEach((skill) => {
      const skillID = "Skill-Confidence-Tag#" + skill.id;
      skill = {
        ...skill,
        Skill_Confidence__c_ID: "progress-percent " + skillID
      };
      this.skillsFinal.push(skill);
    });
    return this.skillsFinal;
  }

  appendStylesAndSVG() {
    //create Map for confidence
    const confidenceMap = new Map();
    this.skillsFinal.forEach((skill) => {
      confidenceMap.set(
        skill.Skill_Confidence__c_ID,
        skill.fields.Skill_Confidence__c.value + "%"
      );
    });
    // console.log(confidenceMap);
    //append confidence styling
    const allLiElements = this.template.querySelectorAll(".progress-percent");
    allLiElements.forEach((ele) => {
      // console.log("Class Name:", ele.className);
      if (confidenceMap.has(ele.className)) {
        //console.log("In confidenceMap IF");
        const width = confidenceMap.get(ele.className);
        ele.style.height = "10px";
        ele.style.width = width;
        ele.style.backgroundColor = "#45F925";
      }
    });
  }
}
