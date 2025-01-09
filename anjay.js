// Data Master Buku (stok buku asli di perpustakaan)
let books = [
    { judul: "Buku A", pengarang: "Pengarang A", penerbit: "Penerbit A", tahun: 2020, jumlah: 5 },
    { judul: "Buku B", pengarang: "Pengarang B", penerbit: "Penerbit B", tahun: 2021, jumlah: 3 },
    // Tambahkan buku lainnya jika perlu
  ];
  
  // Data Peminjaman
  let borrowings = [
    // { book: "Buku A (2020)", borrower: "John Doe" },
    // Peminjaman akan ditambahkan di sini
  ];
  
  // Fungsi untuk menampilkan buku yang dipinjam
  function renderBooks() {
    // Render buku yang ada di master (jumlah tidak berubah)
    books.forEach(book => {
      console.log(`${book.judul} (${book.tahun}) - Stok: ${book.jumlah}`);
    });
  }
  
  // Fungsi untuk menampilkan peminjaman yang ada
  function renderBorrowings() {
    borrowings.forEach(borrow => {
      console.log(`${borrow.borrower} meminjam ${borrow.book}`);
    });
  }
  
  // Fungsi Peminjaman
  document.getElementById("borrow-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const bookIndex = document.getElementById("borrow-book").value;
    const borrower = document.getElementById("borrower").value.trim();
  
    if (bookIndex !== "" && borrower) {
      const book = books[bookIndex];
  
      if (book.jumlah > 0) {
        // Jika stok lebih dari 0, lakukan peminjaman
        book.jumlah -= 1; // Stok sementara berkurang
  
        borrowings.push({
          book: book.judul + " (" + book.tahun + ")",
          borrower: borrower,
        });
  
        // Perbarui tampilan buku dan peminjaman
        renderBooks();
        renderBorrowings();
      } else {
        alert("Stok buku habis!");
      }
  
      // Reset input form
      document.getElementById("borrow-book").value = "";
      document.getElementById("borrower").value = "";
    } else {
      alert("Pilih buku dan masukkan nama peminjam!");
    }
  });
  
  // Fungsi Pengembalian Buku
  function returnBook(bookIndex) {
    const book = books[bookIndex];
  
    // Jika buku dikembalikan, stok buku akan bertambah
    book.jumlah += 1;
  
    renderBooks(); // Menampilkan update jumlah buku
    renderBorrowings(); // Menampilkan data peminjaman yang telah diperbarui
  }
  