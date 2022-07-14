const CACHE_KEY = "calculation_history"; //key untuk mengakses dan menyimpan data pada localStorage

function checkForStorage() {
  //Fungsi tersebut akan kita gunakan di dalam if statement setiap fungsi transaksi pada localStorage
  return typeof Storage !== "undefined";
}

function putHistory(data) {
  ///Lalu kita buat juga fungsi untuk menyimpan data riwayat kalkulasi pada localStorage.
  ///Fungsi tersebut memiliki satu argumen yang merupakan data dari hasil kalkulasi yang nantinya akan dimasukkan ke dalam localStorage.
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY)); //JSON.parse() yang mana digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript.
    }

    historyData.unshift(data); //unshift(), fungsi ini digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index.
    //Fungsi ini juga mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru.

    if (historyData.length > 5) {
      historyData.pop(); //Fungsi pop() di atas merupakan fungsi untuk menghapus nilai index terakhir pada array, sehingga ukuran array historyData tidak akan pernah lebih dari 5.
      // Hal ini kita terapkan agar riwayat kalkulasi yang muncul adalah lima hasil kalkulasi terakhir oleh pengguna.
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData)); //JSON.stringify() digunakan untuk mengubah objek JavaScript ke dalam bentuk String.
    //JSON sendiri adalah singkatan dari JavaScript Object Notation. JSON merupakan format yang sering digunakan dalam pertukaran data.
    //Saat ini JSON banyak diandalkan karena formatnya berbasis teks dan relatif mudah dibaca.
  }
}

function showHistory() {
  //Fungsi ini mengembalikan nilai array dari localStorage jika sudah memiliki nilai sebelumnya melalui JSON.parse().
  // Namun jika localStorage masih kosong, fungsi ini akan mengembalikan nilai array kosong.
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

function renderHistory() {
  //fungsi untuk merender data riwayat kalkulasi pada tabel HTML.
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
  }
}
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

