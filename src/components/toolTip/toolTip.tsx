import PopperJS from "@popperjs/core";
import React, {PropsWithChildren, useEffect, useState} from "react";
import { usePopper } from "react-popper";
import ReactDOM from "react-dom";
import s from "./style.module.scss";
import { ShadowBox } from "../index";
import { Icon } from "../../svg";

interface IPropsTooltip {
  isShow: boolean;
  onClose?: () => void;
  targetRef: HTMLElement | null;
  placement?: PopperJS.Placement;
}

export function Tooltip(props: PropsWithChildren<IPropsTooltip>) {
  const { targetRef, children, placement = "bottom", isShow, onClose } = props;
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const padding: number = targetRef ? targetRef.clientWidth / 2 - 15 : 10;
  const { styles, attributes } = usePopper(targetRef, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement, padding }},
      { name: "offset", options: { offset: [0, 15]}}
    ],
    placement
  });

  const [refCancel, setRefCancel] = useState<any>(null);

  useEffect(() => {
    refCancel?.addEventListener("keydown", f);
    return function cleanup() {
      refCancel?.removeEventListener("keydown", f);
    };
  });

  const f = (e: any) => {
    if (onClose && e.keyCode === 13) {
      onClose();
    }
  };

  return (
      <>
        {isShow ?
            ReactDOM.createPortal(
                <div
                    className={s.popper}
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                  <div className={s.arrow} ref={setArrowElement} style={styles.arrow}>
                    <Icon.Triangle/>
                  </div>
                  <ShadowBox className={s.box}>
                    {onClose && <Icon.Cancel ref={setRefCancel} className={s.cancel} onClick={onClose} tabIndex={46}/>}
                    {children}
                  </ShadowBox>
                  <div className={s.arrow} ref={setArrowElement} style={styles.arrow}>
                    <Icon.Triangle/>
                  </div>
                </div>,
                document.body
            ) : null
        }
      </>
  )
}
