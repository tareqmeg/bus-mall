'use strict';

let productArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
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
  this.name = name.split( '.' ).slice( 0, -1 ).join( '.' );
  this.image = `./img/${name}`;
  this.shown = 0;
  this.clicks = 0;
  Product.all.push( this );
  // localStorage.setItem( 'Product', JSON.stringify( Product.all ) );
}

Product.all = [];
Product.counter = 0;

for( let i = 0; i < productArray.length; i++ ) {
  new Product( productArray[i] );
}

let previousIndex = [];
function renderNewProduct() {
  let leftIndex = randomNumber( 0, Product.all.length - 1 ) ;
  leftImage.src = Product.all[leftIndex].image;
  leftImage.alt = Product.all[leftIndex].name;
  leftImageIndex = Number( leftIndex );
  previousIndex.push( leftIndex );

  let middleIndex;
  do {
    middleIndex = randomNumber( 0, Product.all.length - 1 );
  } while( leftIndex === middleIndex );
  previousIndex.push( middleIndex );
  middleImage.src = Product.all[middleIndex].image;
  middleImage.alt = Product.all[middleIndex].name;
  middleImageIndex = Number( middleIndex );

  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Product.all.length - 1 );
  } while( rightIndex === leftIndex || rightIndex === middleIndex );
  previousIndex.push( rightIndex );
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
          btn.onclick = function( ){
            location.reload();
          };
          const ulElement = document.createElement( 'ul' );
          parentElement.appendChild( ulElement );

          for ( let i = 0; i < Product.all.length; i++ ) {
            const liElement = document.createElement( 'li' );
            ulElement.appendChild( liElement );
            liElement.textContent = `${Product.all[i].name}  had  ${Product.all[i].clicks}  votes, and was seen  ${Product.all[i].shown} times.`;
          }
          renderChart();


        }
        );
      }
      renderNewProduct();

      console.log( Product.all );

    }

  }
  else{
    imageSection.removeEventListener( 'click', handelClick );
    localStorage.setItem( 'Product', JSON.stringify( Product.all ) );


  }
}

function getData() {
  const data = localStorage.getItem( 'Product' );
  if( data ) {
    const objData = JSON.parse( data );
    Product.all = objData;
    renderNewProduct();
  }
}

getData();


imageSection.addEventListener( 'click', handelClick );

// Helper function

function randomNumber( min, max ) {

  let theNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;

  for( let i = 0;i < previousIndex.length;i++ ){
    while ( theNumber === previousIndex[i] ){
      theNumber = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
  }return( theNumber );
}

renderNewProduct();

function renderChart(){
  let nameArray = [];
  let clicksArray = [];
  let showsArray = [];
  for( let i = 0; i < Product.all.length; i++ ){
    nameArray.push( Product.all[i].name );
    clicksArray.push( Product.all[i].clicks );
    showsArray.push( Product.all[i].shown );
  }


  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# of Clicks',
          data: clicksArray,
          backgroundColor: 'blue',
          borderColor:
            'rgba(255, 99, 132, 1)',
          borderWidth: 2
        },
        {
          label: '# of shown',
          data: showsArray,
          backgroundColor:  'blue' ,
          borderColor:
            'rgba(255, 99, 132, 1)',
          borderWidth: 3
        }
      ]

    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );
}




