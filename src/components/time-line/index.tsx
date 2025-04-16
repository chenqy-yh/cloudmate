import React, { ReactNode, createContext, useContext } from "react";
import styles from "./index.module.scss";

type TimelineItemProps = {
  children: React.ReactNode;
  dotEl?: React.ReactNode;
  last?: boolean;
};

type TimelineProps = {
  children: React.ReactNode;
};

type TimelineItem = React.FC<TimelineItemProps>;

type Timeline = React.FC<TimelineProps> & { Item: TimelineItem };

interface TimelineItemContext {
  dotEl: React.ReactNode;
  last: boolean;
}

const TimelineItemContext = createContext<TimelineItemContext | null>(null);

const useTimelineItemContext = () => {
  const context = useContext(TimelineItemContext);
  if (!context) {
    throw new Error("useTimelineItemContext 必须在 TimelineItem 中使用");
  }
  return context;
};

const Dot = () => {
  const { dotEl } = useTimelineItemContext();
  return <div className={styles.dot_container}>{dotEl}</div>;
};

const Line = () => {
  const { last } = useTimelineItemContext();
  return (
    <div className={styles.line}>
      <Dot />
      {!last && <div className={styles.line_inner} />}
    </div>
  );
};

const TimelineItem: TimelineItem = ({
  children,
  dotEl = <div className={styles.dot_default} />,
  last = false,
}) => {
  return (
    <TimelineItemContext.Provider value={{ dotEl, last }}>
      <>
        <Line />
        <div className={styles.timeline_item_content}>{children}</div>
      </>
    </TimelineItemContext.Provider>
  );
};

const isTimelineItem = (child: ReactNode) => {
  return React.isValidElement(child) && child.type === TimelineItem;
};

const Timeline: Timeline = ({ children }) => {
  const items = React.Children.toArray(
    children
  ) as React.ReactElement<TimelineItemProps>[];

  if (!items.every(isTimelineItem)) {
    throw new Error("Timeline 的子元素必须是 Timeline.Item");
  }

  return (
    <div className={styles.timeline_body}>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return React.cloneElement(item, { key: index, last });
      })}
    </div>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;
