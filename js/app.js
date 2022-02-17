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
    let rows, columns, cellSize;


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

    // determinare numero totale di celle da generare
    const cellNumber = rows * columns;
    const cellSIze = `calc( 100% / ${columns})`;
    console.log(cellNumber);

    // genero la griglia
    // faccio un ciclo da 1 a tot celle = righe * colonne
    for (let i = 0; i < cellNumber; i++) {
        // genero una cella
        const cell = document.createElement('div');
        cell.style.width = cellSIze;
        cell.append(i + 1);
        cell.classList.add('cell');
        gridElement.appendChild(cell);


    }




    // aggiungo il contenuto
    // aggiungo la classe cell
    // appendere cella dentro griglia
}

buttonPlay.addEventListener('click', startGame)