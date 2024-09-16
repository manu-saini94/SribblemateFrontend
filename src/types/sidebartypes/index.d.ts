export type MenuItemType = {
  name: string;
  path: string;
  iconSrc: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

export type MenuItemPropsType = {
  key: string;
  itemProps: MenuItemType;
  onMenuItemClick: (event: MouseEventHandler<HTMLLIElement>) => void;
  active: string;
};
