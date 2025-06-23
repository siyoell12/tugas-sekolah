const readline = require('readline'); // Untuk input/output di konsol
const fs = require('fs');             // Untuk membaca/menulis file

// --- KODE ANIMASI LOADING BARU ---
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']; // Karakter spinner Unicode
let intervalId = null;
let currentFrame = 0;
let loadingMessage = '';

function startLoadingAnimation(message = "Memproses...") {
    loadingMessage = message;
    process.stdout.write('\x1B[?25l'); // Sembunyikan kursor
    intervalId = setInterval(() => {
        process.stdout.write('\x1B[G'); // Pindah kursor ke awal baris
        process.stdout.write(` ${frames[currentFrame]} ${loadingMessage}`);
        currentFrame = (currentFrame + 1) % frames.length;
    }, 80); // Ubah kecepatan di sini (milidetik)
}

function stopLoadingAnimation() {
    clearInterval(intervalId);
    process.stdout.write('\x1B[G\x1B[K'); // Pindah kursor ke awal baris & bersihkan baris
    process.stdout.write('\x1B[?25h'); // Tampilkan kursor kembali
    currentFrame = 0; // Reset frame
}
// --- AKHIR KODE ANIMASI LOADING ---


// Konfigurasi file penyimpanan data tugas
const DATA_FILE = 'assignments.json'; // Nama file untuk menyimpan data tugas
let assignments = [];                 // Array untuk menyimpan semua tugas

// Konfigurasi interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// --- FUNGSI UNTUK MANAJEMEN DATA TUGAS (Load & Save) ---

// Memuat tugas dari file JSON
function loadAssignments() {
  startLoadingAnimation("Memuat data tugas..."); // Mulai animasi
  try {
    // Simulasi penundaan agar animasi terlihat (hapus di produksi)
    // const start = Date.now();
    // while (Date.now() - start < 500) {} // Menunda selama 500ms

    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      if (data) {
        assignments = JSON.parse(data);
        console.log(`[INFO] Tugas berhasil dimuat dari ${DATA_FILE}.`);
      } else {
        console.log(`[INFO] File ${DATA_FILE} kosong, memulai dengan daftar kosong.`);
        assignments = [];
      }
    } else {
      console.log(`[INFO] File ${DATA_FILE} tidak ditemukan, membuat daftar tugas baru.`);
      assignments = [];
    }
  } catch (error) {
    console.error(`[ERROR] Gagal memuat tugas dari ${DATA_FILE}:`, error.message);
    assignments = [];
  } finally {
    stopLoadingAnimation(); // Hentikan animasi setelah selesai
  }
}

// Menyimpan tugas ke file JSON
function saveAssignments() {
  startLoadingAnimation("Menyimpan data tugas..."); // Mulai animasi
  try {
    // Simulasi penundaan agar animasi terlihat (hapus di produksi)
    // const start = Date.now();
    // while (Date.now() - start < 300) {} // Menunda selama 300ms

    const data = JSON.stringify(assignments, null, 2);
    fs.writeFileSync(DATA_FILE, data, 'utf8');
    console.log(`[INFO] Tugas berhasil disimpan ke ${DATA_FILE}.`);
  } catch (error) {
    console.error(`[ERROR] Gagal menyimpan tugas ke ${DATA_FILE}:`, error.message);
  } finally {
    stopLoadingAnimation(); // Hentikan animasi setelah selesai
  }
}

// --- FUNGSI KALKULATOR DENGAN TAMPILAN KOTAK ---

/**
 * Fungsi untuk menggambar "layar" kalkulator dengan hasil atau pesan
 */
function drawCalculatorScreen(displayText = "0") {
  console.log(" ┌─────────────────────┐");
  console.log(` │ ${displayText.padStart(19, ' ')} │`);
  console.log(" └─────────────────────┘");
}

/**
 * Fungsi untuk menggambar layout tombol kalkulator
 * Ini hanya visual, input tetap melalui keyboard
 */
function drawCalculatorButtons() {
  console.log("┌─────┬─────┬─────┬─────┐");
  console.log("│  7  │  8  │  9  │  /  │");
  console.log("├─────┼─────┼─────┼─────┤");
  console.log("│  4  │  5  │  6  │  *  │");
  console.log("├─────┼─────┼─────┼─────┤");
  console.log("│  1  │  2  │  3  │  -  │");
  console.log("├─────┼─────┼─────┼─────┤");
  console.log("│  0  │  .  │  =  │  +  │");
  console.log("└─────┴─────┴─────┴─────┘");
  console.log("Ketik 'exit' untuk kembali ke menu utama.");
}

/**
 * Fungsi utama untuk kalkulator dengan tampilan kotak
 */
function startCalculator() {
  console.log("\n   --- KALKULATOR ---");
  drawCalculatorScreen("0");
  drawCalculatorButtons();

  askCalculatorInput();
}

/**
 * Fungsi untuk meminta input kalkulator secara berurutan
 */
function askCalculatorInput() {
  rl.question('Masukkan angka pertama: ', (num1Input) => {
    if (num1Input.toLowerCase().trim() === 'exit') {
      showMainMenu();
      return;
    }

    const num1 = parseFloat(num1Input);
    if (isNaN(num1)) {
      console.log("Input tidak valid. Harap masukkan angka.");
      drawCalculatorScreen("Error: Angka Tidak Valid");
      drawCalculatorButtons();
      askCalculatorInput();
      return;
    }

    rl.question('Masukkan operator (+, -, *, /): ', (operatorInput) => {
      if (operatorInput.toLowerCase().trim() === 'exit') {
        showMainMenu();
        return;
      }

      const operator = operatorInput.trim();
      if (!['+', '-', '*', '/'].includes(operator)) {
        console.log("Operator tidak valid. Hanya +, -, *, / yang diizinkan.");
        drawCalculatorScreen("Error: Operator Salah");
        drawCalculatorButtons();
        askCalculatorInput();
        return;
      }

      rl.question('Masukkan angka kedua: ', (num2Input) => {
        if (num2Input.toLowerCase().trim() === 'exit') {
          showMainMenu();
          return;
        }

        const num2 = parseFloat(num2Input);
        if (isNaN(num2)) {
          console.log("Input tidak valid. Harap masukkan angka.");
          drawCalculatorScreen("Error: Angka Tidak Valid");
          drawCalculatorButtons();
          askCalculatorInput();
          return;
        }

        if (operator === '/' && num2 === 0) {
          console.log("Tidak bisa membagi dengan nol!");
          drawCalculatorScreen("Error: Pembagian Nol");
          drawCalculatorButtons();
          askCalculatorInput();
          return;
        }

        let result;
        switch (operator) {
          case '+':
            result = num1 + num2;
            break;
          case '-':
            result = num1 - num2;
            break;
          case '*':
            result = num1 * num2;
            break;
          case '/':
            result = num1 / num2;
            break;
        }

        // Tampilkan hasil di layar kalkulator
        drawCalculatorScreen(`${num1} ${operator} ${num2} = ${result}`);
        drawCalculatorButtons();

        rl.question('Hitung lagi? (ya/tidak): ', (answer) => {
          if (answer.toLowerCase().trim() === 'ya') {
            startCalculator(); // Mulai kalkulator lagi dari awal
          } else {
            showMainMenu(); // Kembali ke menu utama
          }
        });
      });
    });
  });
}

// --- FUNGSI PENGELOLA TUGAS ---

// Menampilkan menu pengelola tugas
function displayTaskMenu() {
  console.log("\n--- PENGELOLA TUGAS SEKOLAH ---");
  console.log("1. Tambah Tugas Baru");
  console.log("2. Lihat Semua Tugas");
  console.log("3. Tandai Tugas Selesai");
  console.log("4. Hapus Tugas");
  console.log("5. Kembali ke Menu Utama");
  console.log("------------------------------");
}

// Menambahkan tugas baru
function addAssignment() {
  rl.question('Nama tugas: ', (name) => {
    if (!name.trim()) {
      console.log("Nama tugas tidak boleh kosong.");
      addAssignment();
      return;
    }
    rl.question('Tenggat waktu (opsional, cth: 2025-12-31): ', (dueDate) => {
      const newAssignment = {
        id: assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1,
        name: name.trim(),
        dueDate: dueDate.trim() || 'Tidak ada',
        completed: false,
        createdAt: new Date().toISOString()
      };
      assignments.push(newAssignment);
      saveAssignments();
      console.log(`Tugas "${newAssignment.name}" berhasil ditambahkan.`);
      showTaskMenuPrompt(); // Kembali ke menu tugas
    });
  });
}

/**
 * Melihat semua tugas
 * Fungsi ini tidak lagi memanggil showTaskMenuPrompt() di dalamnya.
 * Fungsi pemanggil yang bertanggung jawab untuk melanjutkan alur.
 */
function viewAssignments() {
  if (assignments.length === 0) {
    console.log("Belum ada tugas.");
    return false; // Mengembalikan false jika tidak ada tugas
  }
  console.log("\n--- DAFTAR TUGAS ---");
  assignments.forEach((task, index) => {
    const status = task.completed ? "[SELESAI]" : "[BELUM SELESAI]";
    console.log(`${index + 1}. ID: ${task.id} | Nama: ${task.name} | Tenggat: ${task.dueDate} | Status: ${status}`);
  });
  console.log("--------------------");
  return true; // Mengembalikan true jika tugas ditampilkan
}

// Menandai tugas sebagai selesai
function markAssignmentComplete() {
  // Jika tidak ada tugas atau viewAssignments mengembalikan false (tidak ada yang ditampilkan)
  if (!viewAssignments()) {
    showTaskMenuPrompt(); // Langsung tampilkan menu tugas
    return;
  }

  rl.question('Masukkan ID tugas yang ingin ditandai selesai (atau "batal" untuk kembali): ', (idInput) => {
    if (idInput.toLowerCase().trim() === 'batal') {
      showTaskMenuPrompt(); // Kembali ke menu tugas
      return;
    }
    const idToMark = parseInt(idInput);
    if (isNaN(idToMark)) {
      console.log("Input tidak valid. Harap masukkan angka ID.");
      markAssignmentComplete(); // Ulangi fungsi ini jika input tidak valid
      return;
    }
    const taskIndex = assignments.findIndex(task => task.id === idToMark);
    if (taskIndex !== -1) {
      if (assignments[taskIndex].completed) {
        console.log(`Tugas "${assignments[taskIndex].name}" sudah ditandai selesai sebelumnya.`);
      } else {
        assignments[taskIndex].completed = true;
        saveAssignments();
        console.log(`Tugas "${assignments[taskIndex].name}" berhasil ditandai selesai.`);
      }
    } else {
      console.log("ID tugas tidak ditemukan.");
    }
    showTaskMenuPrompt(); // Kembali ke menu tugas setelah operasi
  });
}

// Menghapus tugas
function deleteAssignment() {
  // Jika tidak ada tugas atau viewAssignments mengembalikan false (tidak ada yang ditampilkan)
  if (!viewAssignments()) {
    showTaskMenuPrompt(); // Langsung tampilkan menu tugas
    return;
  }

  rl.question('Masukkan ID tugas yang ingin dihapus (atau "batal" untuk kembali): ', (idInput) => {
    if (idInput.toLowerCase().trim() === 'batal') {
      showTaskMenuPrompt(); // Kembali ke menu tugas
      return;
    }
    const idToDelete = parseInt(idInput);
    if (isNaN(idToDelete)) {
      console.log("Input tidak valid. Harap masukkan angka ID.");
      deleteAssignment(); // Ulangi fungsi ini jika input tidak valid
      return;
    }
    const initialLength = assignments.length;
    // Filter membuat array baru yang tidak menyertakan tugas dengan ID yang dihapus
    assignments = assignments.filter(task => task.id !== idToDelete);
    if (assignments.length < initialLength) {
      saveAssignments();
      console.log("Tugas berhasil dihapus.");
    } else {
      console.log("ID tugas tidak ditemukan.");
    }
    showTaskMenuPrompt(); // Kembali ke menu tugas setelah operasi
  });
}

// Meminta input pilihan menu tugas
function showTaskMenuPrompt() {
  displayTaskMenu();
  rl.question('Pilih opsi (1-5): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        addAssignment();
        break;
      case '2':
        viewAssignments(); // viewAssignments sekarang hanya menampilkan
        showTaskMenuPrompt(); // Lalu kembali ke menu tugas
        break;
      case '3':
        markAssignmentComplete();
        break;
      case '4':
        deleteAssignment();
        break;
      case '5':
        showMainMenu(); // Kembali ke menu utama
        break;
      default:
        console.log("Pilihan tidak valid. Silakan pilih 1-5.");
        showTaskMenuPrompt(); // Tampilkan menu tugas lagi
        break;
    }
  });
}

// --- MENU UTAMA APLIKASI ---

// Menampilkan menu utama aplikasi
function showMainMenu() {
  console.log("\n--- APLIKASI SEKOLAH ---");
  console.log("1. Kalkulator Sederhana");
  console.log("2. Pengelola Tugas Sekolah");
  console.log("3. Keluar");
  console.log("------------------------------");

  rl.question('Pilih opsi (1-3): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        startCalculator();
        break;
      case '2':
        showTaskMenuPrompt();
        break;
      case '3':
        console.log("Terima kasih telah menggunakan Aplikasi Sekolah!");
        rl.close(); // Tutup interface readline
        break;
      default:
        console.log("Pilihan tidak valid. Silakan pilih 1-3.");
        showMainMenu(); // Tampilkan menu utama lagi
        break;
    }
  });
}

// --- PROGRAM UTAMA ---
function main() {
  loadAssignments(); // Muat data tugas saat aplikasi dimulai
  console.log("Selamat datang di Aplikasi Sekolah!");
  showMainMenu();    // Tampilkan menu utama pertama kali
}

// Jalankan fungsi utama
main();
