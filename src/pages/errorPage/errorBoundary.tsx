import React, { ErrorInfo, ReactChildren } from "react";
import { ErrorPage } from "./errorPage";

export interface IState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<{}, IState> {
  constructor(props: ReactChildren) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error: error })
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    return error ? <ErrorPage error={error} /> : children;
  }
}
