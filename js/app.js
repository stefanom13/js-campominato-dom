const buttonPlay = document.getElementById('buttonPlay')
const controlsOption = document.getElementById('mode')
const gridElement = document.querySelector('.grid')



// salviamo il click nella variabile startgame
const startGame = () => {
    console.log('inizia il gioco');
    gridElement.innerHTML = '';

    // impostare la modalità di gioco
    // leggere value select con modalità selezionata da utente
    const mode = controlsOption.value;
    let rows, columns, cellSize,bombs;
   

    
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
    bombs = generaBombe (16,1,cellNumber);
    
    
    
    

    function cellCallback() {

        if (isBomb(this.innerHTML,bombs)) {

            this.classList.add('bomb')

            // game-over
        }else{
            this.classList.add('selected')
            
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
        
        cell.addEventListener('click',cellCallback)

    }


}

buttonPlay.addEventListener('click', startGame)


function generaBombe(totBombe,min,max) {
    // do-while per generare 16 bombe e pusharli nell array
    const arrayBombe= []
    do {
        const numero = getRandomIntInclusive(min, max);
        if (arrayBombe.includes (numero) === false){    // includes per evitare numeri doppi
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

function isBomb(numero, bombs) {

    if (bombs.includes(numero, bombs)) {
        return true;
    } else {
        return false;
    }
}