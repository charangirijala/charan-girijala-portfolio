import { LightningElement } from "lwc";
import UNSPLASH_IMG from "@salesforce/resourceUrl/stockUnsplashImg";

export default class PersonalProjects extends LightningElement {
  imageUrl = UNSPLASH_IMG;

  renderedCallback() {
    const mainProject = this.template.querySelector(".main-project");
    mainProject.style.backgroundImage = `url('${UNSPLASH_IMG}')`;
    const sideProjects = this.template.querySelector(".side-projects");
    sideProjects.style.backgroundImage = `url('${UNSPLASH_IMG}')`;
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
