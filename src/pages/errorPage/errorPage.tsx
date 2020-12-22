import React  from "react";

interface IPropsErrorPage {
  error: Error;
}

export function ErrorPage(props: IPropsErrorPage) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1>Что-то пошло не так.</h1>
        <div>{props.error.message}</div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="">ПЕРЕЗАГРУЗИТЬ СТРАНИЦУ</a>
      </div>
    </div>
  );
}
