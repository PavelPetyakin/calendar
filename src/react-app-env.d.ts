/// <reference types="react-scripts" />
declare module "*.svg" {
  const value: SvgComponent;
  export default value;
}

declare module "*.scss" {
  const content: { [key: string]: string };
  export default content;
}
