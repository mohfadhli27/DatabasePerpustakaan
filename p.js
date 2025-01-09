// Data buku
let books = [];

// Data peminjaman
let borrowings = [];

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
        <td>${book.jumlah}</td>
        <td>${book.sisa}</td>
        <td>
          <button onclick="editBook(${index})" class="btn btn-success">Edit</button>
          <button onclick="deleteBook(${index})"  class="btn btn-danger">Hapus</button>
        </td>
      </tr>
    `;
    bookList.innerHTML += row;
  });

  updateAvailableBooks(); // Perbarui dropdown buku
}

function updateAvailableBooks() {
  const borrowBookSelect = document.getElementById("borrow-book");
  borrowBookSelect.innerHTML = "<option value=''>Pilih Buku</option>"; // Reset dropdown

  books.forEach((book, index) => {
    if (book.sisa > 0) {
      borrowBookSelect.innerHTML += `<option value="${index}">${book.judul } (${book.tahun})</option>`;
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

  const max = 2025;

  const qty = parseInt(qtyInput, 10);

  if(parseInt(year, 10) > max){
    alert('Maksimal Tahun adalah 2025');
    return false;
  }

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
        sisa: qty,
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
        sisa: qty,
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
    const newQty = parseInt(document.getElementById("edit-jumlah").value.trim(),10);
    
    const max = 2025;

    if(parseInt(newYear, 10) > max){
      alert('Maksimal Tahun adalah 2025');
      return false;
    }

    if (newTitle && newAuthor && newPublish && newYear && !isNaN(newQty)) {
      books[index] = {
        judul: newTitle,
        pengarang: newAuthor,
        penerbit: newPublish,
        tahun: newYear,
        jumlah: newQty,
        sisa: newQty,
      };

      borrowings.forEach((borrow) => {
        if (borrow.book === book.judul) {
          borrow.book = newTitle;
        }
      });

      renderBooks();
      renderBorrowings();
      modal.hide();
    }
  };
}

function deleteBook(index) {
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

    if (book.sisa > 0) {
      book.sisa -=1;
      
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
          <button class="btn btn-warning" onclick="returnBook(${index})">Kembalikan</button>
        </td>
      </tr>
    `;
    borrowList.innerHTML += row;
  });
}

function returnBook(index) {
  const borrowing = borrowings[index];
  const book = books.find((b) => b.judul === borrowing.book);

  if (book) {
    book.sisa += 1;
  }

  borrowings.splice(index, 1);
  renderBooks();
  renderBorrowings();
  updateAvailableBooks();
}

document.addEventListener("DOMContentLoaded", function () {
  renderBooks();
  updateAvailableBooks();
});