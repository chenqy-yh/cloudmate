import { CSSProperties, useMemo, useState } from "react";
import { Placement } from "./index.d";
import { useFloating } from "./use-floating";

type PopoverProps = {
  content: React.ReactNode;
  placement: Placement;
  children: React.ReactNode;
  open?: boolean;
  offset?: { x: number; y: number };
  onOpenChange?: (open: boolean) => void;
};

const genRandomStr = () => Math.random().toString(36).slice(6);

const Popover: React.FC<PopoverProps> = (props) => {
  const { placement, children, content, open, offset, onOpenChange } = props;

  const [inner_open, setInnerOpen] = useState(false);

  const final_open = open ?? inner_open;

  const { cls, tooltip_base_style, toggle_style, mask_style } = useMemo(() => {
    const prefix = `popover_${genRandomStr()}`;
    const cls = (s: string) => `${prefix}_${s}`;

    const toggle_style: CSSProperties = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    const mask_style: CSSProperties = {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      isolation: "isolate",
    };

    return {
      cls,
      tooltip_base_style,
      toggle_style,
      mask_style,
    };
  }, []);

  const { tooltip_style, first_render } = useFloating({
    placement,
    reference_cls: cls("toggle"),
    tooltip_cls: cls("tooltip"),
    reference_open: final_open,
    offset,
  });

  const handleToggle = () => {
    if (open === undefined) {
      setInnerOpen((prev) => !prev);
    } else {
      onOpenChange?.(!open);
    }
  };

  return (
    <>
      <div
        className={cls("toggle")}
        onClick={handleToggle}
        style={toggle_style}
      >
        {children}
      </div>
      {final_open && (
        <>
          <div style={mask_style} onClick={handleToggle} />
          <div
            className={cls("tooltip")}
            style={{
              ...tooltip_style,
              opacity: first_render ? 0 : 1,
            }}
          >
            {content}
          </div>
        </>
      )}
    </>
  );
};

export default Popover;
export * from "./index.d";
