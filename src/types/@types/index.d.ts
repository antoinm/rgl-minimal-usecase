import { Layout } from 'react-grid-layout';

declare module 'react-grid-layout' {
  export interface ResponsiveProps {
    onLayoutInit?: (layout: Layout[]) => void;
  }
}
