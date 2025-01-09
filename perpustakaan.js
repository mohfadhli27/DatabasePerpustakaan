// Data buku
let books = [];

// Data peminjaman
let borrowings = [];

// Render daftar buku
function renderBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Hapus isi tabel sebelumnya

  books.forEach((book, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${book.judul}</td>
        <td>${book.pengarang}</td>
        <td>${book.penerbit}</td>
        <td>${book.tahun}</td>
        <td>${book.jumlah}</td> <!-- Total jumlah buku -->
        <td>${book.available}</td> <!-- Jumlah buku yang tersedia -->
        <td>
          <button onclick="editBook(${index})" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg> Edit</button>
          <button onclick="deleteBook(${index})" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg> Hapus</button>
        </td>
      </tr>
    `;
    bookList.innerHTML += row;
  });

  updateAvailableBooks(); // Perbarui dropdown buku
}

// Perbarui daftar buku yang tersedia untuk dipinjam
function updateAvailableBooks() {
  const borrowBookSelect = document.getElementById("borrow-book");
  borrowBookSelect.innerHTML = "<option value=''>Pilih Buku</option>"; // Reset dropdown

  books.forEach((book, index) => {
    if (book.available > 0) {
      borrowBookSelect.innerHTML += `<option value="${index}">${book.judul} (${book.tahun})</option>`;
    }
  });
}

// Fungsi Tambah Buku
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("judul").value.trim();
  const author = document.getElementById("pengarang").value.trim();
  const publish = document.getElementById("penerbit").value.trim();
  const year = document.getElementById("tahun").value.trim();
  const qtyInput = document.getElementById("jumlah").value.trim();
  const qty = parseInt(qtyInput, 10);

  if (title && author && publish && year && !isNaN(qty) && qty > 0) {
    const existingBook = books.find((book) => 
      book.judul.toLowerCase() === title.toLowerCase() && book.tahun === year);

    const existingBook2 = books.find((book) =>book.judul.toLowerCase() === title.toLowerCase() && book.tahun ===  year);

    if (existingBook) {
      alert('Buku Sudah Ada');
      return false;

    } else if(existingBook2) {

      const newBook = {
        judul: title,
        pengarang: author,
        penerbit: publish,
        tahun: year,
        jumlah: qty,
        available: qty,
      };
    books.push(newBook);
    }
    else {
      books.push({
        judul: title,
        pengarang: author,
        penerbit: publish,
        tahun: year,
        jumlah: qty,
        available: qty,
      });
    }

    document.getElementById("judul").value = "";
    document.getElementById("pengarang").value = "";
    document.getElementById("penerbit").value = "";
    document.getElementById("tahun").value = "";
    document.getElementById("jumlah").value = "";

    renderBooks();
  } else {
    alert("Semua kolom harus diisi dan jumlah harus lebih dari 0!");
  }
});

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

      // Update borrowing yang menggunakan buku ini
      borrowings.forEach((borrow) => {
        if (borrow.book === book.judul + " (" + book.tahun + ")") {
          borrow.book = newTitle + " (" + newYear + ")";
        }
      });

      renderBooks();
      renderBorrowings(); // Update daftar peminjaman
      updateAvailableBooks();
      modal.hide();
    } else {
      // Pesan peringatan jika input tidak valid
      alert("Pastikan semua input valid dan jumlah tidak lebih kecil dari buku yang dipinjam!");
      return false;
    }
  };
}



// Fungsi Hapus Buku
function deleteBook(index) {
  const book = books[index];
  
  // Periksa apakah jumlah buku yang tersedia sama dengan total jumlah buku
  if (book.available !== book.jumlah) {
    alert("Buku belum sepenuhnya dikembalikan, tidak dapat dihapus!");
    return;
  }

  // Hapus buku jika semua buku sudah dikembalikan
  books.splice(index, 1);
  renderBooks();
}

// Fungsi Tambah Peminjaman
document.getElementById("borrow-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const bookIndex = document.getElementById("borrow-book").value;
  const borrower = document.getElementById("borrower").value.trim();

  if (bookIndex !== "" && borrower) {
    const book = books[bookIndex];

    if (book.available > 0) {
      book.available -= 1; // Kurangi jumlah yang tersedia

      borrowings.push({
        book: book.judul + " (" + book.tahun + ")",
        borrower: borrower,
      });

      renderBooks();
      renderBorrowings();
      updateAvailableBooks();
    } else {
      alert("Stok buku habis!");
    }

    document.getElementById("borrow-book").value = "";
    document.getElementById("borrower").value = "";
  } else {
    alert("Pilih buku dan masukkan nama peminjam!");
  }
});

// Fungsi Render Daftar Peminjaman
function renderBorrowings() {
  const borrowList = document.getElementById("borrow-list");
  borrowList.innerHTML = "";

  borrowings.forEach((borrow, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${borrow.book}</td>
        <td>${borrow.borrower}</td>
        <td>
          <button class="btn btn-warning text-white" onclick="returnBook(${index})">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-skip-backward" viewBox="0 0 16 16">
    <path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m7 1.133L1.696 8 7.5 11.367zm7.5 0L9.196 8 15 11.367z"/>
  </svg> 
  Kembalikan
</button>

        </td>
      </tr>
    `;
    borrowList.innerHTML += row;
  });
  
}

// Fungsi Kembalikan Buku
// Fungsi Kembalikan Buku
function returnBook(index) {
  const borrowing = borrowings[index];
  const borrowedBookTitle = borrowing.book.split(" (")[0]; // Ambil judul buku saja
  const borrowedBookYear = borrowing.book.split(" (")[1].replace(")", ""); // Ambil tahun buku

  // Cari buku berdasarkan judul dan tahun
  const book = books.find((b) => b.judul === borrowedBookTitle && b.tahun == borrowedBookYear);

  if (book) {
    book.available += 1; // Tambahkan jumlah yang tersedia
  }

  borrowings.splice(index, 1); // Hapus peminjaman dari daftar
  renderBooks();
  renderBorrowings();
  updateAvailableBooks();
}


// Inisialisasi halaman
document.addEventListener("DOMContentLoaded", function () {
  renderBooks();
  updateAvailableBooks();
});


document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".nav-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    // Tambahkan event listener pada setiap tab
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Hapus kelas 'active' dari semua tab dan konten
        tabs.forEach((t) => t.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
  
        // Tambahkan kelas 'active' ke tab dan konten yang dipilih
        tab.classList.add("active");
        tabContents[index].classList.add("active");
      });
    });
  });

function hanyaHuruf(event){
  var charCode = (event.which) ? event.which : event.keyCode
  if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)
    return true;
  return false;
}

function hanyaAngka(event) {
  var charCode = (evt.which) ? evt.which : event.keyCode;
  // Memeriksa apakah charCode adalah angka (0-9)
  if (charCode >= 48 && charCode <= 57) {
    return true;
  }
  // Memeriksa jika charCode adalah 'e', 'E', atau '.'
  if (charCode === 69 || charCode === 101 || charCode === 46) {
    return false;
  }
  return false;
}

function hanyaAngka(event) {
  var charCode = (event.which) ? event.which : event.keyCode;
  // Memeriksa apakah charCode adalah angka (0-9)
  if (charCode >= 48 && charCode <= 57 && charCode) {
    return true;
  }
  // Memblokir semua karakter lainnya
  return false;
}


// Fungsi untuk memvalidasi tahun (maks 4 digit dan tidak lebih dari tahun saat ini)
function validateYearInput(event) {
  const input = event.target;
  const currentYear = new Date().getFullYear();

  // Hapus karakter selain angka
  input.value = input.value.replace(/[^0-9]/g, "");

  // Batasi panjang input hingga 4 angka
  if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
  }

  // Batasi tahun tidak boleh melebihi tahun saat ini
  if (Number(input.value) > currentYear) {
      alert(`Tahun tidak boleh lebih dari ${currentYear}`);
      input.value = "2025";
  }
}