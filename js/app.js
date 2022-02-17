const buttonPlay = document.getElementById('buttonPlay')
const controlsOption = document.getElementById('mode')
const gridElement = document.querySelector('.grid')
const messageElement = document.querySelector('.message')


let bombs = [];
let punteggio;
let arrayCells = []
let cellCallback



// salviamo il click nella variabile startgame
const startGame = () => {
    console.log('inizia il gioco');
    gridElement.innerHTML = '';// quando premiamo play si riazzera grid e messagge
    messageElement.innerHTML = ''; 


    // impostare la modalità di gioco
    // leggere value select con modalità selezionata da utente
    const mode = controlsOption.value;
    let rows, columns, cellSize;
    score = punteggio;
   

    
    // determinare numero righe e colonne
    switch (mode) {
        case '1':
            rows = 10;
            columns = 10;
            break;

        case '2':
            rows = 9;
            columns = 9;
            break;

        case '3':
            rows = 7;
            columns = 7;
            break;

        default:
            rows = 10;
            columns = 10;
            break;
    }

    // determinare numero totale di celle e bombe da generare
    const cellNumber = rows * columns;
    const cellSIze = `calc( 100% / ${columns})`;
    bombs = generaBombe (16,1,cellNumber);    // 16 numero bombe - 1 numero minimo - cell number = numero max -
    score = 0 ;
    
    
    

    function cellCallback() {
        const number = parseInt(this.innerHTML)
        if (isBomb(number)) {

            this.classList.add('bomb')

           gameOver(score, arrayCells);
        }else{

            this.classList.add('selected')
            score ++ ;

            if (score === cellNumber - bombs.length) {
                youWin(score, arrayCells);
            } 
        }
        
            this.removeEventListener('click',cellCallback)
    }
    
    // genero la griglia
    // faccio un ciclo da 1 a tot celle = righe * colonne
    // aggiungo il contenuto
    // aggiungo la classe cell
    // appendere cella dentro griglia

    for (let i = 0; i < cellNumber; i++) {
        // genero una cella
        const cell = document.createElement('div');
        cell.style.width = cellSIze;
        cell.append(i + 1);
        cell.classList.add('cell');
        gridElement.appendChild(cell);
        arrayCells.push(cell)



        cell.addEventListener('click',cellCallback)

    }


}

buttonPlay.addEventListener('click', startGame)






function isBomb(numero) {

    if (bombs.includes(numero)) {
        return true;
    } else {
        return false;
    }
}

function gameOver(score,arrayCells) {

    messageElement.innerHTML = (`Mi dispiace hai perso totalizzando  ${ score } punti`);
    removeEventi(arrayCells)

}

function youWin(score,arrayCells) {

    messageElement.innerHTML = (`Complimenti hai vinto con  ${ score } punti`);
    removeEventi(arrayCells)
}

function removeEventi(arrayCells) {

    for (let i = 0; i < arrayCells.length; i++) {

        const cell = arrayCells[i];
        const numero = parseInt(cell.innerHTML)

        cell.removeEventListener('click',cellCallback);

    }
    
}

function generaBombe(totBombe,min,max) {
    // do-while per generare 16 bombe e pusharli nell array
    const arrayBombe= []
    do {
        const numero = getRandomIntInclusive(min, max);
        if (arrayBombe.includes(numero) === false){    // includes per evitare numeri doppi
            arrayBombe.push(numero)
        }

    } while (arrayBombe.length < totBombe);
    
    console.log (arrayBombe);
    return arrayBombe;
}

function getRandomIntInclusive(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min );
    // generare massimo e minimo
}