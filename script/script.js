let pos = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
let jogador = "X";
const triplets = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function venceu(board, jogador) {
    for (let [a, b, c] of triplets) {
        if (board[a] === jogador && board[b] === jogador && board[c] === jogador) {
            return true;
        }
    }
    return false;
}

function empate(board) {
    return board.every(cell => cell !== " ");
}

function venceu_empate(jogadorAtual) {
    if (venceu(pos, jogadorAtual)) {
        alert("Jogador " + jogadorAtual + " venceu!");
    } else if (empate(pos)) {
        alert("Empate!");
    } else {
        jogador = jogadorAtual === "X" ? "O" : "X";
        if (jogador === "O") jogada_ia(); 
    }
}

function jogar(i) {
    if (pos[i] === " " && jogador === "X") {
        pos[i] = jogador;
        document.getElementById(i).classList.add(jogador);
        venceu_empate(jogador);
    } else {
        alert("Posição já ocupada!");
    }
}

function jogada_ia() {
    const dificuldade = document.getElementById("dificuldade").value;
    if (dificuldade === "facil") {
        jogada_ia_facil();
    } else if (dificuldade === "medio") {
        jogada_ia_media();
    } else if (dificuldade === "dificil") {
        jogada_ia_dificil();
    }
}

function jogada_ia_facil() {
    let jogada;
    do {
        jogada = Math.floor(Math.random() * 9);
    } while (pos[jogada] !== " ");
    pos[jogada] = "O";
    document.getElementById(jogada).classList.add("O");
    venceu_empate("O");
}

function jogada_ia_media() {
    for (let [a, b, c] of triplets) {
        if (pos[a] === "O" && pos[b] === "O" && !["X", "O"].includes(pos[c])) {
            pos[c] = "O";
            document.getElementById(c).classList.add("O");
            venceu(pos, "O");
            return;
        } 
        else if (pos[a] === "O" && pos[c] === "O" && !["X", "O"].includes(pos[b])) {
            pos[b] = "O";
            document.getElementById(b).classList.add("O");
            venceu(pos, "O");
            return;
        } 
        else if (pos[b] === "O" && pos[c] === "O" && !["X", "O"].includes(pos[a])) {
            pos[a] = "O";
            document.getElementById(a).classList.add("O");
            venceu(pos, "O");
            return;
        }
    }

    for (let [a, b, c] of triplets) {
        if (pos[a] === "X" && pos[b] === "X" && !["X", "O"].includes(pos[c])) {
            pos[c] = "O";
            document.getElementById(c).classList.add("O");
            venceu_empate("O");
            return;
        }
        else if (pos[a] === "X" && pos[c] === "X" && !["X", "O"].includes(pos[b])) {
            pos[b] = "O";
            document.getElementById(b).classList.add("O");
            venceu_empate("O");
            return;
        }
        else if (pos[b] === "X" && pos[c] === "X" && !["X", "O"].includes(pos[a])) {
            pos[a] = "O";
            document.getElementById(a).classList.add("O");
            venceu_empate("O");
            return;
        }
    }

    jogada_ia_facil();
}

function jogada_ia_dificil() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
        if (pos[i] === " ") {
            pos[i] = "O";
            let score = minimax(pos, 0, false);
            pos[i] = " ";

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== undefined) {
        pos[move] = "O";
        document.getElementById(move).classList.add("O");
        venceu_empate("O");
    }
}

function minimax(board, depth, isMaximizing) {
    if (venceu(board, "O")) return 1;
    if (venceu(board, "X")) return -1;
    if (empate(board)) return 0;

    let bestScore = isMaximizing ? -Infinity : Infinity;
    let scoreFunc = isMaximizing ? Math.max : Math.min;

    for (let i = 0; i < 9; i++) {
        if (board[i] === " ") {
            board[i] = isMaximizing ? "O" : "X";
            let score = minimax(board, depth + 1, !isMaximizing);
            board[i] = " ";
            bestScore = scoreFunc(bestScore, score);
        }
    }
    return bestScore;
}

function resetarJogo() {
    pos.fill(" ");
    jogador = "X";
    document.querySelectorAll(".square").forEach(square => {
        square.classList.remove("X", "O");
    });
}
