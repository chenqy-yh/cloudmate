type Side = "top" | "right" | "bottom" | "left";

type Alignment = "start" | "end";

type AlignPlacement = `${Side}-${Alignment}`;

export type Placement = Side | AlignPlacement;

export type RectStyle = {
  height: number;
  left: number;
  top: number;
  width: number;
  right: number;
  bottom: number;
};
