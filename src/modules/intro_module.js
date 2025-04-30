(function introIIFE() {
  let factionChoice;

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

  joinButton.addEventListener('click', () => {
    introPanel.style.display = 'none';
    zodiacChoice.style.display = 'flex';
  });

  allSigns.forEach((image, index) => {
    image.addEventListener('click', (event) => {
      switch (index) {
        case 0:
          factionChoice = 'aries';
          console.log(factionChoice);
          break;
        case 1:
          factionChoice = 'taurus';
          console.log(factionChoice);
          break;
        case 2:
          factionChoice = 'gemini';
          console.log(factionChoice);
          break;
        case 3:
          factionChoice = 'cancer';
          console.log(factionChoice);
          break;
        case 4:
          factionChoice = 'leo';
          console.log(factionChoice);
          break;
        case 5:
          factionChoice = 'virgo';
          console.log(factionChoice);
          break;
        case 6:
          factionChoice = 'libra';
          console.log(factionChoice);
          break;
        case 7:
          factionChoice = 'scorpio';
          console.log(factionChoice);
          break;
        case 8:
          factionChoice = 'sagittarus';
          console.log(factionChoice);
          break;
        case 9:
          factionChoice = 'capricornus';
          console.log(factionChoice);
          break;
        case 10:
          factionChoice = 'aquarius';
          console.log(factionChoice);
          break;
        case 11:
          factionChoice = 'pisces';
          console.log(factionChoice);
          break;
      }

      header.style.display = 'grid';
      playGround.style.display = 'block';
      dialogIntro.close();
    });
  });
})();
