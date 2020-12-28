import PopperJS from "@popperjs/core";
import React, { PropsWithChildren, useState } from "react";
import { usePopper } from "react-popper";
import ReactDOM from "react-dom";
import s from "./style.module.scss";
import { ShadowBox } from "../index";

interface IPropsTooltip {
  targetRef: HTMLElement | null;
  placement?: PopperJS.Placement;
}

export function Tooltip(props: PropsWithChildren<IPropsTooltip>) {
  const { targetRef, children, placement = "bottom" } = props;
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(targetRef, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement }},
      { name: "offset", options: { offset: [0, 15]}}
    ],
    placement
  });

  return (
    ReactDOM.createPortal(
      <div
        className={s.popper}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className={s.arrow1} ref={setArrowElement} style={styles.arrow} />
        <div className={s.arrow2} ref={setArrowElement} style={styles.arrow} />
        <ShadowBox className={s.box} children={children}/>
      </div>,
      document.body
    )
  )
}
