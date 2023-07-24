// Mendapatkan referensi elemen DOM
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

// Mendapatkan nilai dari properti khusus CSS '--winning-blocks'
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

// Mendefinisikan konstanta untuk simbol pemain
const O_TEXT = "O";
const X_TEXT = "X";

// Menginisialisasi pemain saat ini dan ruang papan permainan
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

// Memulai permainan dengan menambahkan event listener untuk setiap kotak
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

// Fungsi yang dijalankan ketika kotak pada papan permainan diklik
function boxClicked(e) {
    const id = e.target.id;

    // Memeriksa apakah kotak sudah terisi atau belum
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        // Memeriksa apakah ada pemain yang telah menang
        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} telah menang!`;
            let winning_blocks = playerHasWon();

            // Menandai kotak-kotak yang membuat pemain menang dengan latar belakang yang sesuai
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }

        // Ganti giliran pemain
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

// Kombinasi kotak-kotak yang menghasilkan kemenangan pada permainan Tic Tac Toe
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Fungsi untuk memeriksa apakah ada pemain yang menang
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]; // Mengembalikan kombinasi kotak yang membuat pemain menang
        }
    }
    return false; // Mengembalikan false jika tidak ada pemain yang menang
}

// Menambahkan event listener untuk tombol restart permainan
restartBtn.addEventListener('click', restart);

// Fungsi untuk me-restart permainan
function restart() {
    spaces.fill(null);

    // Mengosongkan semua kotak pada papan permainan dan menghapus penanda kemenangan
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    // Mengatur teks pemain kembali ke "Tic Tac Toe"
    playerText.innerHTML = 'Tic Tac Toe';

    // Mengatur pemain saat ini kembali ke X_TEXT
    currentPlayer = X_TEXT;
}

// Memulai permainan ketika halaman dimuat
startGame();
