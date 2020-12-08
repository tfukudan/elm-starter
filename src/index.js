import {Elm} from './Main.elm';
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css';

let initialState = null;
try{
    initialState = JSON.parse(localStorage.getItem('elm-todo-save'));
}catch(_){}

const app = Elm.Main.init({ flags: initialState });
app.ports.setStorage.subscribe(function(state) {
    localStorage.setItem('elm-todo-save', JSON.stringify(state));
});
