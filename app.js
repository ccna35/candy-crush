const grid = document.querySelector(".grid");
const cards = document.querySelectorAll(".item");
const scoreBoard = document.querySelector(".score");

let score = 0;

const candy = [
  "./assets/candy (1).svg",
  "./assets/candy (2).svg",
  "./assets/candy (3).svg",
  "./assets/candy (4).svg",
  "./assets/candy (5).svg",
];

const randomCandy = () => {
  let randIndex = Math.floor(Math.random() * 5);
  return randIndex;
};

cards.forEach((card) => {
  const img = document.createElement("img");
  img.src = candy[randomCandy()];
  card.appendChild(img);
});

let sources = [];

const images = document.querySelectorAll("img");
images.forEach((img) => sources.push(img.getAttribute("src")));

let comparisonArray = [];

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    card.style.cssText = `background-color: #e9ecef`;
    let imgSrc = card.querySelector("img").getAttribute("src");
    if (comparisonArray.length < 2) {
      comparisonArray.push({
        index,
        imgSrc,
      });
    }
    if (comparisonArray.length === 2)
      console.log(comparisonArray[0].imgSrc === comparisonArray[1].imgSrc);
  });

  card.addEventListener("mouseenter", () => {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.innerText = index;
    card.appendChild(tooltip);
  });
  card.addEventListener("mouseleave", () => {
    const tooltips = document.querySelectorAll(".tooltip");
    tooltips.forEach((tip) => tip.remove());
  });
});

const checkDuplicates = (arr) => {
  let duplicatesArray = [];

  for (let k = 0; k < 8; k++) {
    for (let i = k * 8; i < (1 + k) * 8 - 2; i++) {
      if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
        for (let j = 0; j < 3; j++) {
          if (!duplicatesArray.includes(i + j)) duplicatesArray.push(i + j);
        }
      }
    }
  }

  for (let k = 0; k < 8; k++) {
    for (let i = k; i < 48 + k; i += 8) {
      if (arr[i] === arr[i + 8] && arr[i + 8] === arr[i + 16]) {
        for (let j = 0; j <= 16; j += 8) {
          if (!duplicatesArray.includes(i + j)) duplicatesArray.push(i + j);
        }
      }
    }
  }

  score = duplicatesArray.length;

  return duplicatesArray;
};

console.log(checkDuplicates(sources));
console.log(score);
scoreBoard.innerText = score;
