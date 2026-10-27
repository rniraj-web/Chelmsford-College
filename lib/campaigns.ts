import campaignsData from "@/data/campaigns.json";

export interface Campaign {
  id: string;
  active: boolean;
  tone: "brand" | "accent";
  title: string;
  body: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

const allCampaigns = campaignsData.campaigns as Campaign[];

export function getActiveCampaigns(): Campaign[] {
  return allCampaigns.filter((campaign) => campaign.active);
}
