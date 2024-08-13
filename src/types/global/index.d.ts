export type Id = {
  id: number;
};

export type IconImageType = {
  x: number;
  y: number;
  src: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export interface ReactNodeHOCProps {
  children: ReactNode;
}
