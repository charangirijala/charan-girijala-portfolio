import { api, LightningElement } from "lwc";

export default class TrailheadStats extends LightningElement {
  //in Use API properties from masterComponent
  @api trTrailHeadRanking;
  @api trTrailHeadRankImg;
  @api trBadges;
  @api trPoints;
  @api trTrails;

  //these tags not in Use
  @api trailHeadRankImg;

  @api badges;
  @api points;
  @api trails;
}
