import React, { ReactElement } from "react";
import cx from "classnames";
import s from "./style.module.scss";

type Color = "blue" | "default";
type Size = "medium" | "little";

enum Colors {
  blue = "blue",
  default = "default",
}
enum Sizes {
  medium = "medium",
  little = "little",
}

interface IButton {
  name?: string;
  onClick: () => void;
  icon?: ReactElement;
  color?: Color;
  size?: Size;
  className?: string;
  tabIndex?: number;
}

export function Button(props: IButton) {
  const {
    name,
    icon,
    color = Colors.default,
    onClick,
    className = "",
    size = Sizes.medium,
    tabIndex = 0
  } = props;

  return (
    <button className={cx(s[color], s[size], className)} onClick={onClick} tabIndex={tabIndex}>
      {icon}
      {name}
    </button>
  );
}
