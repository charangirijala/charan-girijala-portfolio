import { api, LightningElement } from "lwc";

export default class TrailheadStats extends LightningElement {
  @api trailHeadRankImg;

  @api badges;
  @api points;
  @api trails;
}
