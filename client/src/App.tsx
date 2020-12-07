import * as React from "react";

export interface Props {
  userName: string;
  lang: string;
}

export const App = (props: Props) => (
  <h1>
    Hi {props.userName} from React! Welcome to {props.lang}!
  </h1>
);
