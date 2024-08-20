export type Id = {
  id: number;
};

export type IconImageType = {
  x: number;
  y: number;
  src: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export interface ReactNodeHOCProps {
  children: ReactNode;
}
export interface ThemeContextType {
  isDarkMode: Boolean;
  toggleTheme: () => void;
}

export interface ThemeContextProps extends ReactNodeHOCProps {}

// Redux store global types for Notes
export type CommonInitialState = {
  loading: Boolean;
  error: string;
};
