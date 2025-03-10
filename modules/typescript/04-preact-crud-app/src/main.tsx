import { render } from "preact";
import "./index.css";
import { CrudApp } from "./app";

render(<CrudApp />, document.getElementById("app")!);
