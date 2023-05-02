import lemonade from "lemonadejs";
import Datagrid from "./datagrid";

function App() {
    let self = this;
    self.hello = "Hello world";

    return `<div>{{self.hello}}</div>`;
}

lemonade.render(App, document.getElementById('root'));
