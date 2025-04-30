//npm install -D webpack webpack-cli file-loader html-loader html-webpack-plugin css-loader style-loader webpack-dev-server webpack-merge

import './styles.css';
import './styles_signs.css';
import './styles_intro.css';

import './modules/global_module';
import './modules/intro_module';
// import ranniWelcome from '../ressources/audio/ranniWelcome.wav';

// const playButton = document.querySelector('.factionImage');

// const audio = new Audio(ranniWelcome);
// console.log(audio);
// playButton.addEventListener('click', () => {
//   audio.play();
// });

const dialog = document.querySelector('dialog');

dialog.show();

setTimeout(() => {
  dialog.close();
}, 5000);
