'use strict';

let productArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];

const imageSection = document.getElementById( 'imageSection' );
const leftImage = document.getElementById( 'leftImage' );
const middleImage = document.getElementById( 'middleImage' );
const rightImage = document.getElementById( 'rightImage' );

let leftImageIndex = 0;
let middleImageIndex = 0;
let rightImageIndex = 0;
const clickCounter = 25;

function Product ( name ) {
  this.name = name;
  this.image = `./img/${name}.jpg`;
  this.shown = 0;
  this.clicks = 0;
  Product.all.push( this );
}

Product.all = [];
Product.counter = 0;

for( let i = 0; i < productArray.length; i++ ) {
  new Product( productArray[i] );
}

function renderNewProduct() {
  let leftIndex = randomNumber( 0, Product.all.length - 1 );
  leftImage.src = Product.all[leftIndex].image;
  leftImage.alt = Product.all[leftIndex].name;
  leftImageIndex = Number( leftIndex );

  let middleIndex;
  do {
    middleIndex = randomNumber( 0, Product.all.length - 1 );
  } while( leftIndex === middleIndex );

  middleImage.src = Product.all[middleIndex].image;
  middleImage.alt = Product.all[middleIndex].name;
  middleImageIndex = Number( middleIndex );

  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Product.all.length - 1 );
  } while( rightIndex === leftIndex || rightIndex === middleIndex );

  rightImage.src = Product.all[rightIndex].image;
  rightImage.alt = Product.all[rightIndex].name;
  rightImageIndex = Number( rightIndex );

  Product.all[leftIndex].shown++;
  Product.all[middleIndex].shown++;
  Product.all[rightIndex].shown++;



}

function handelClick( event ) {

  if( Product.counter <= clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'leftImage' || clickedElement.id === 'middleImage' || clickedElement.id === 'rightImage' ) {
      if( clickedElement.id === 'leftImage' ) {
        Product.all[leftImageIndex].clicks++;
      }

      if( clickedElement.id === 'middleImage' ) {
        Product.all[middleImageIndex].clicks++;
      }

      if( clickedElement.id === 'rightImage' ) {
        Product.all[rightImageIndex].clicks++;
      }

      Product.counter++;
      if ( Product.counter === clickCounter ){
        const parentElement = document.getElementById( 'result' );
        const btn = document.createElement( 'button' );
        parentElement.appendChild( btn );
        btn.innerText = 'View Results';
        btn.addEventListener( 'click', function(){
          btn.innerText = 'Reset';
          const ulElement = document.createElement( 'ul' );
          parentElement.appendChild( ulElement );

          for ( let i = 0; i < Product.all.length; i++ ) {
            const liElement = document.createElement( 'li' );
            ulElement.appendChild( liElement );
            liElement.textContent = `${Product.all[i].name}  had  ${Product.all[i].clicks}  votes, and was seen  ${Product.all[i].shown} times.`;
          }

        } );
      }
      renderNewProduct();

      console.log( Product.all );
    }
  }
}


imageSection.addEventListener( 'click', handelClick );

// Helper function
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

renderNewProduct();
