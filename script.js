function cekAngka() {
    const numberT1 = parseInt(document.getElementById("numberInputT1").value, 10);
    const result1 = numberT1 % 2 === 0 ? "Genap" : "Ganjil";
    document.getElementById("result1").textContent = `Angka ${numberT1} adalah ${result1}.`;
    document.getElementById("result1").style.display = "block";
}

function cekPythagoras() {
    var a = parseInt(document.getElementById('numberInputT2_1').value, 10);
    var b = parseInt(document.getElementById('numberInputT2_2').value, 10);
    var c = parseInt(document.getElementById('numberInputT2_3').value, 10);

    if (a && b && c && (a * a + b * b === c * c || a * a + c * c === b * b || b * b + c * c === a * a)) {
        document.getElementById('result2').innerText = "Angka-angka ini membentuk segitiga siku-siku.";
    } else {
        document.getElementById('result2').innerText = "Angka-angka ini tidak membentuk segitiga siku-siku.";
    }
    document.getElementById("result2").style.display = "block";
}


function cekPalindrome() {
    var text = document.getElementById('textInputT3').value;
    var cleanedText = text.replace(/\s+/g, '').toLowerCase();
    
    if (cleanedText === cleanedText.split('').reverse().join('')) {
        document.getElementById('result3').innerText = "Kata ini adalah palindrome.";
    } else {
        document.getElementById('result3').innerText = "Kata ini bukan palindrome.";
    }
    document.getElementById("result3").style.display = "block";
}

function cekVokal() {
    var input = document.getElementById('textInputT4').value;
    var result = filterVowels(input);
    document.getElementById('result4').innerText = result;
    document.getElementById("result4").style.display = "block";
}

function filterVowels(input) {
    const vowels = "aeiouAEIOU";
    let result = "";
    let seen = {};

    for (let char of input) {
        if (vowels.includes(char) && !seen[char.toLowerCase()]) {
            result += char.toLowerCase() + " ";
            seen[char.toLowerCase()] = true;
        }
    }

    return result.trim();
}

function cekJumlahHuruf() {
    const input = document.getElementById("textInputT6").value;
    const huruf = input.match(/[a-zA-Z]/g);
    const jumlahHuruf = huruf ? huruf.length : 0;
    document.getElementById("result6").innerText = `Jumlah huruf: ${jumlahHuruf}`;
    document.getElementById("result6").style.display = "block";
}

function pembagianRange() {
    let start = parseInt(document.getElementById('numberInputT5_1').value, 10);
    let end = parseInt(document.getElementById('numberInputT5_2').value, 10);
    const divider = parseInt(document.getElementById('numberInputT5_3').value, 10);

    // Validasi input
    if (isNaN(start) || isNaN(end) || isNaN(divider)) {
        document.getElementById('result5').innerText = 'Harap masukkan angka yang valid.';
        return;
    }
    if (divider === 0) {
        document.getElementById('result5').innerText = 'Pembagi tidak boleh 0.';
        return;
    }

    // Pastikan start <= end
    if (start > end) {
        // Tukar nilai start dan end jika start lebih besar dari end
        [start, end] = [end, start];
    }

    const divisibleNumbers = [];
    for (let i = start; i <= end; i++) {
        if (i % divider === 0) {
            divisibleNumbers.push(i);
        }
    }

    // Tampilkan hasil
    if (divisibleNumbers.length > 0) {
        document.getElementById('result5').innerText = `Angka yang dapat dibagi ${divider} antara ${start} dan ${end}: ${divisibleNumbers.join(', ')}`;
    } else {
        document.getElementById('result5').innerText = `Tidak ada angka yang dapat dibagi ${divider} dalam rentang ${start} hingga ${end}.`;
    }
    document.getElementById("result5").style.display = "block";
}

function deretFibonacci() {
    var num = parseInt(document.getElementById("numberInputT7").value);
    if (isNaN(num) || num <= 0) {
        document.getElementById("result7").innerText = "Masukkan angka yang valid.";
        return;
    }

    var fib = [0, 1];
    while (fib.length < num) {
        fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }

    var primesInFibo = [];
    for (var i = 0; i < fib.length; i++) {
        var isPrime = true;
        if (fib[i] <= 1) continue;

        for (var j = 2; j <= Math.sqrt(fib[i]); j++) {
            if (fib[i] % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            primesInFibo.push(fib[i]);
        }
    }

    document.getElementById("result7").innerText = "Angka Fibonacci prima: " + primesInFibo.join(", ");
    document.getElementById("result7").style.display = "block";
}

function pencarianRange() {
    // Ambil nilai dari input
    let start = parseInt(document.getElementById('numberInputT8_1').value);
    let end = parseInt(document.getElementById('numberInputT8_2').value);
    const searchNumber = document.getElementById('numberInputT8_3').value;

    let result = [];

    // Validasi input
    if (isNaN(start) || isNaN(end) || isNaN(searchNumber)) {
        document.getElementById('result8').innerHTML = "Pastikan semua input valid.";
        return;
    }

    // Pastikan start <= end
    if (start > end) {
        // Tukar nilai start dan end jika start lebih besar dari end
        [start, end] = [end, start];
    }

    // Pencarian angka dalam range
    for (let i = start; i <= end; i++) {
        if (i.toString().includes(searchNumber)) {
            result.push(i);
        }
    }

    // Tampilkan hasil pencarian
    if (result.length > 0) {
        document.getElementById('result8').innerHTML = `Angka yang mengandung ${searchNumber} antara ${start} dan ${end}:<br> ${result.join(', ')}`;
    } else {
        document.getElementById('result8').innerHTML = `Tidak ada angka yang mengandung ${searchNumber} dalam rentang ${start} hingga ${end}.`;
    }
    document.getElementById("result8").style.display = "block";
}


function selisihTanggal() {
    // Ambil nilai input dari user
    let tanggal1 = document.getElementById('tanggal1').value;
    let tanggal2 = document.getElementById('tanggal2').value;
    
    // Pastikan input valid
    if (tanggal1 === '' || tanggal2 === '') {
        document.getElementById('result9').innerText = 'Harap masukkan kedua tanggal.';
        return;
    }

    // Ubah format tanggal ke format yang dapat diproses (DD-MM-YYYY ke YYYY-MM-DD)
    let formatTanggal1 = tanggal1.split('-');
    let formatTanggal2 = tanggal2.split('-');

    if (formatTanggal1.length !== 3 || formatTanggal2.length !== 3) {
        document.getElementById('result9').innerText = 'Format tanggal salah. Gunakan format DD-MM-YYYY.';
        return;
    }

    let tgl1 = new Date(formatTanggal1[2], formatTanggal1[1] - 1, formatTanggal1[0]);
    let tgl2 = new Date(formatTanggal2[2], formatTanggal2[1] - 1, formatTanggal2[0]);

    // Hitung selisih tanggal dalam milidetik
    let selisih = Math.abs(tgl2 - tgl1);

    // Konversi milidetik ke hari
    let selisihHari = Math.floor(selisih / (1000 * 60 * 60 * 24));

    // Tampilkan hasil
    document.getElementById('result9').innerText = 'Selisih antara tanggal 1 dan tanggal 2 adalah ' + selisihHari + ' hari.';
    document.getElementById("result9").style.display = "block";
}



function konversiSuhu() {
    const nilaiInput = parseFloat(document.getElementById("nilaiInput").value);
    const dariSatuan = document.getElementById("dariSatuan").value;
    const keSatuan = document.getElementById("keSatuan").value;

    if (isNaN(nilaiInput)) {
        document.getElementById("result10").textContent = "Harap masukkan angka yang valid.";
        return;
    }

    let celsius;
    switch (dariSatuan) {
        case "C":
            celsius = nilaiInput;
            break;
        case "R":
            celsius = nilaiInput * 5 / 4;
            break;
        case "F":
            celsius = (nilaiInput - 32) * 5 / 9;
            break;
        case "K":
            celsius = nilaiInput - 273.15;
            break;
        default:
            document.getElementById("result10").textContent = "Satuan awal tidak valid.";
            return;
    }

    let hasil;
    switch (keSatuan) {
        case "C":
            hasil = celsius;
            break;
        case "R":
            hasil = celsius * 4 / 5;
            break;
        case "F":
            hasil = (celsius * 9 / 5) + 32;
            break;
        case "K":
            hasil = celsius + 273.15;
            break;
        default:
            document.getElementById("result10").textContent = "Satuan tujuan tidak valid.";
            return;
    }

    document.getElementById("result10").textContent = `Hasil: ${hasil.toFixed(2)} ${keSatuan}`;
    document.getElementById("result10").style.display = "block";
}


function editBook(index) {
    const book = books[index];
  
    document.getElementById("edit-judul").value = book.judul;
    document.getElementById("edit-pengarang").value = book.pengarang;
    document.getElementById("edit-penerbit").value = book.penerbit;
    document.getElementById("edit-tahun").value = book.tahun;
    document.getElementById("edit-jumlah").value = book.jumlah;
  
    const modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
  
    document.getElementById("edit-book-form").onsubmit = function (e) {
      e.preventDefault();
  
      const newTitle = document.getElementById("edit-judul").value.trim();
      const newAuthor = document.getElementById("edit-pengarang").value.trim();
      const newPublish = document.getElementById("edit-penerbit").value.trim();
      const newYear = document.getElementById("edit-tahun").value.trim();
      const newQty = parseInt(document.getElementById("edit-jumlah").value.trim(), 10);
  
      if (newTitle && newAuthor && newPublish && newYear && !isNaN(newQty)) {
        // Hitung jumlah buku yang sedang dipinjam
        const borrowed = book.jumlah - book.available;
  
        // Validasi: Jumlah total tidak boleh lebih kecil dari buku yang dipinjam
        const isInvalidQty = newQty < borrowed;
  
        if (isInvalidQty) {
          alert("Jumlah total tidak boleh lebih kecil dari buku yang dipinjam!");
          return false;
        }
  
        // Jika semua validasi terpenuhi, data diperbarui
        books[index] = {
          judul: newTitle,
          pengarang: newAuthor,
          penerbit: newPublish,
          tahun: newYear,
          jumlah: newQty,
          available: newQty - borrowed, // Hitung ulang jumlah yang tersedia
        };
        
  
        renderBooks();
        updateAvailableBooks();
        modal.hide();
      } else {
        // Pesan peringatan jika input tidak valid
        alert("Pastikan semua input valid dan jumlah tidak lebih kecil dari buku yang dipinjam!");
        return false;
      }
    };
  }