import React, { memo, forwardRef } from "react";

type Props = {
  className?: string;
  path: string;
  ref?: React.RefObject<SVGSVGElement>;
  tabIndex?: number;
  title?: string;
  viewBox: string;
};

const Icon = forwardRef<SVGSVGElement, Props>(function Icon(props, ref) {
  return (
    <svg
      className={props.className}
      ref={ref}
      role="img"
      tabIndex={props.tabIndex}
      viewBox={props.viewBox}
    >
      {props.title && <title>{props.title}</title>}
      <g dangerouslySetInnerHTML={{ __html: props.path }} />
    </svg>
  );
});

Icon.displayName = "Icon";

export default memo(Icon);
