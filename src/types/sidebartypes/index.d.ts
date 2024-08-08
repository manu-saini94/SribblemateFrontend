export type MenuItemType = {
  name: string;
  path: string;
  iconSrc: any;
};

export type MenuItemPropsType = {
  key: string;
  itemProps: MenuItemType;
  onMenuItemClick: (event: MouseEventHandler<HTMLLIElement>) => void;
  active: string;
};
