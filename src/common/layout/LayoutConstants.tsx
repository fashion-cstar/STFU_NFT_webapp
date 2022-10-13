export enum SidebarItem {
  STAKING,
  NFT_STAKING,
  HOME
}

export const SIDEBAR_ROUTES: { [key: string]: {type:string, link:string} } = {
  [SidebarItem.STAKING]: {type: "internal", link: "/mint"},
  [SidebarItem.NFT_STAKING]: {type: "external", link: "https://stake.stfulabs.com/nft_staking"},
  [SidebarItem.HOME]: {type: "external", link: "https://stfulabs.com"}
};

export const SIDEBAR_ITEMS: { [key: string]: string } = {
  [SidebarItem.STAKING]: "MINT NFT",
  [SidebarItem.NFT_STAKING]: "NFT STAKING",
  [SidebarItem.HOME]: "HOME"
}
