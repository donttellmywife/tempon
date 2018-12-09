// import * as fontAwesome from 'font-awesome/css/font-awesome.css';
import styles from './index.scss';
import {Elm} from './app/Main.elm';


Elm.Main.init({
  node: window.elmapp,
});

if (module.hot) {
  module.hot.accept();
}
