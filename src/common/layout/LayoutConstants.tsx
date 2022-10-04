export enum SidebarItem {
  STAKING,
  HOME
}

export const SIDEBAR_ROUTES: { [key: string]: string } = {
  [SidebarItem.STAKING]: "/mint",
  [SidebarItem.HOME]: "/stfulabs.com/"
};

export const SIDEBAR_ITEMS: { [key: string]: string } = {
  [SidebarItem.STAKING]: "MINT NFT",
  [SidebarItem.HOME]: "HOME"
}
