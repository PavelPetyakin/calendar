import React, { ReactElement, forwardRef, ForwardedRef } from "react";
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

export const Button = forwardRef((props: IButton, ref: ForwardedRef<HTMLButtonElement>) => {
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
    <button className={cx(s[color], s[size], className)} onClick={onClick} ref={ref} tabIndex={tabIndex}>
      {icon}
      {name}
    </button>
  );
})
