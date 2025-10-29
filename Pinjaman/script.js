function hitungPinjaman() {
  const jumlah = parseFloat(document.getElementById("jumlah").value);
  const bulan = parseInt(document.getElementById("bulan").value);
  const bungaTahunan = parseFloat(document.getElementById("bunga").value);

  if (isNaN(jumlah) || jumlah <= 0) {
    document.getElementById("hasil").innerHTML = "<p>Masukkan jumlah pinjaman yang valid.</p>";
    return;
  }

  const r = bungaTahunan / 100 / 12;
  const n = bulan;
  const P = jumlah;

  const EMI = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const totalBayar = EMI * n;
  const totalBunga = totalBayar - P;

  const formatRupiah = (angka) =>
    angka.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById("hasil").innerHTML = `
    <p><strong>Rincian Pinjaman:</strong></p>
    <p>Jumlah Pinjaman: Rp ${formatRupiah(P)}</p>
    <p>Lama Pinjaman: ${n} bulan</p>
    <p>Bunga per tahun: ${bungaTahunan}%</p>
    <hr>
    <p><strong>Cicilan per bulan:</strong> Rp ${formatRupiah(EMI)}</p>
    <p><strong>Total yang dibayar:</strong> Rp ${formatRupiah(totalBayar)}</p>
    <p><strong>Total bunga:</strong> Rp ${formatRupiah(totalBunga)}</p>
  `;
}
