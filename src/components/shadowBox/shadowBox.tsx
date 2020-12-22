import React, { PropsWithChildren } from "react";
import s from "./style.module.scss";


export function ShadowBox(props: PropsWithChildren<any>) {
  return (
    <div className={s.container}>
      {props.children}
    </div>
  );
}
