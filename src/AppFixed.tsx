import "./App.css";
import "react-grid-layout/css/styles.css";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { useState } from "react";
import { isEqual } from "lodash";

const ResponsiveGridLayout = WidthProvider(Responsive);

type MyComponentProps = {
  text: string;
};

const remotelyFetchedWidgets = [
  "a",
  "b",
  "c",
  "d",
  "e", // This widget has been added on the remote, but no layout is saved for this widget
];

const storedLayout = [
  { i: "a", x: 0, y: 0, w: 1, h: 2 },
  { i: "b", x: 1, y: 0, w: 1, h: 1 },
  { i: "c", x: 0, y: 2, w: 1, h: 1 },
  { i: "d", x: 1, y: 1, w: 1, h: 2 },
];

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  return <div>{text}</div>;
};

const AppFixed: React.FC = () => {
  const [originalLayouts, setOriginalLayouts] = useState(storedLayout);
  const [layouts, setLayouts] = useState<Layout[]>(storedLayout);

  const onLayoutChange = (newLayouts: Layout[]) => {
    setLayouts(newLayouts);
  };
  const onLayoutInit = (newLayouts: Layout[]) => {
    setOriginalLayouts(newLayouts);
  };

  const isDashboardDirty = !isEqual(originalLayouts, layouts);

  return (
    <div style={{ flex: 1 }}>
      <h1>Example with the onLayoutInit Callback fixing the issue</h1>
      <p>
        Once the layout has been auto-corrected, the onLayoutInit callback is
        triggered, and will update the originalLayouts
      </p>
      <p>
        The dashboard layout{" "}
        {isDashboardDirty ? (
          <span style={{ color: "red" }}>HAS CHANGED</span>
        ) : (
          <span style={{ color: "green" }}>HAS NOT CHANGED</span>
        )}
      </p>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layouts }}
        onLayoutChange={onLayoutChange}
        onLayoutInit={onLayoutInit}
        cols={{ lg: 6, xs: 1, sm: 6 }}
      >
        {remotelyFetchedWidgets.map((w) => (
          <div key={w}>
            <MyComponent text={`Component ${w.toUpperCase()}`} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default AppFixed;
