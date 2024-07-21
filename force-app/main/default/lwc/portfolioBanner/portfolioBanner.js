import { LightningElement } from "lwc";
import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets";
export default class PortfolioBanner extends LightningElement {
  userPic = `${PortfolioAssets}/PortfolioAssets/userPic.jpeg`;
  //site urls
  linkedinUrl = "https://www.linkedin.com/in/charan-girijala-ba2257233/";
  githubUrl = "https://github.com/charangirijala";
  twitterUrl = "https://github.com/charangirijala";
  trailheadUrl = "https://www.salesforce.com/trailblazer/lm21othp36tt9fs0bd";
  //Image links
  linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
  github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
  twitter = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`;
  trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`;

  // recordId = 'a00NS000008ujYzYAI';
  // @wire(getRecord, { recordId: this.recordId, field:[]})
}
