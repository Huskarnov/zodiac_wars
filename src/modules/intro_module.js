import ranniWelcome from '/ressources/audio/ranniWelcome.mp3';
import audioTheme from '/ressources/audio/classictheme.mp3';

document.addEventListener('DOMContentLoaded', () => {
  let factionChoice;
  const factionImage = document.querySelector('.factionImage');

  const header = document.querySelector('header');
  const playGround = document.querySelector('#playGround');
  const dialogIntro = document.querySelector('dialog');

  const introPanel = document.querySelector('.introPanel');
  const joinButton = document.querySelector('.introPanel button');

  const zodiacChoice = document.querySelector('.zodiacChoice');
  const firstSixSigns = Array.from(
    document.querySelector('.zodiacChoice div:nth-Child(1)').children
  );
  const secondSixSigns = Array.from(
    document.querySelector('.zodiacChoice div:nth-Child(3)').children
  );
  const allSigns = [...firstSixSigns, ...secondSixSigns];

  const anAudio = new Audio(ranniWelcome);
  const themeAudio = new Audio(audioTheme);

  joinButton.addEventListener('click', () => {
    introPanel.style.display = 'none';
    zodiacChoice.style.display = 'flex';
    anAudio.play();
    themeAudio.play();
  });

  allSigns.forEach((image, index) => {
    image.addEventListener('click', (event) => {
      switch (index) {
        case 0:
          factionChoice = 'aries';
          factionImage.src = `/18f83c66346acfa2fff3.png`;
          break;
        case 1:
          factionChoice = 'taurus';
          factionImage.src = `/71bdb7e3ecbbb8fa3512.png`;
          break;
        case 2:
          factionChoice = 'gemini';
          factionImage.src = `/b1706e8da823460af055.png`;
          break;
        case 3:
          factionChoice = 'cancer';
          factionImage.src = `/d145a4b1f5612aa6cb59.png`;
          break;
        case 4:
          factionChoice = 'leo';
          factionImage.src = `/434ff012a907ac608787.png`;
          break;
        case 5:
          factionChoice = 'virgo';
          factionImage.src = `/494ced40f74322a1c4c2.png`;
          break;
        case 6:
          factionChoice = 'libra';
          factionImage.src = `/30348ee267d906b7c438.png`;
          break;
        case 7:
          factionChoice = 'scorpio';
          factionImage.src = `/d360b3465f83d228d48b.png`;
          break;
        case 8:
          factionChoice = 'sagittarus';
          factionImage.src = `/e17c58e812c8fbbd8db5.png`;
          break;
        case 9:
          factionChoice = 'capricornus';
          factionImage.src = `/0f18bdea3038f4073340.png`;
          break;
        case 10:
          factionChoice = 'aquarius';
          factionImage.src = `/8aa3b3a765c74796be05.png`;
          break;
        case 11:
          factionChoice = 'pisces';
          factionImage.src = `/0df6d7d963d0b98cc141.png`;
          break;
      }

      header.style.display = 'grid';
      playGround.style.display = 'block';
      dialogIntro.close();
    });
  });
});

// (function introIIFE() {

// })();
