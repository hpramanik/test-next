import type { ResponsiveProps } from "react-grid-layout";

export interface DynamicProps {
  data: unknown;
}

export interface AutoGridComponent {
  name: string;
  component?:
    | React.FC<DynamicProps>
    | React.ComponentClass<DynamicProps>
    | null;
  props?: unknown;
  hidden?: boolean;
}

export interface AutoGridProps {
  reactGridLayoutProps: ResponsiveProps;
  components: AutoGridComponent[];
  debug?: boolean;
}
