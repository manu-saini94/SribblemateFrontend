export type Id = {
  id: number;
};

export type IconImagePropsType = {
  x: number;
  y: number;
  src: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
