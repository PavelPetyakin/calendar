import React, { PropsWithChildren } from "react";
import s from "./style.module.scss";
import cx from "classnames";

interface IPropsShadowBox{
  className?: string;
}

export function ShadowBox(props: PropsWithChildren<IPropsShadowBox>) {
  const { className, children } = props;

  return (
    <div className={cx(s.container, className)}>
      {children}
    </div>
  );
}
