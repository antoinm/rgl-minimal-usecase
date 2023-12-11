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

const App: React.FC = () => {
  const [originalLayouts] = useState(storedLayout);
  const [layouts, setLayouts] = useState<Layout[]>(storedLayout);

  const onLayoutChange = (newLayouts: Layout[]) => {
    setLayouts(newLayouts);
  };

  const isDashboardDirty = !isEqual(originalLayouts, layouts);

  return (
    <div style={{ flex: 1 }}>
      <h1>Example with the issue</h1>
      <p>
        The grid layout is dirty without any user interaction, because there is
        a difference between the stored layouts, and the widgets retrieved
        remotely. (There is a newly added widget that does not have a layout
        associated) A, B, C, D widgets have a layout associated, but E does not.
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
        cols={{ lg: 6, xs: 1, sm: 6, xxs:1 }}
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

export default App;
