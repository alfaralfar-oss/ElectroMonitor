const STORAGE_KEY = "electromonitor_measurements_v1";
let records = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const $ = (id) => document.getElementById(id);

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
function format(value, digits=2) {
  return Number(value).toLocaleString("id-ID", {maximumFractionDigits: digits});
}
function render() {
  const last = records[records.length - 1];
  $("voltage").innerHTML = last ? `${format(last.voltage)} <small>V</small>` : `— <small>V</small>`;
  $("current").innerHTML = last ? `${format(last.current)} <small>A</small>` : `— <small>A</small>`;
  $("power").innerHTML = last ? `${format(last.power)} <small>W</small>` : `— <small>W</small>`;
  const totalEnergy = records.reduce((sum, row) => sum + row.energy, 0);
  $("energy").innerHTML = `${format(totalEnergy, 4)} <small>kWh</small>`;
  $("history").innerHTML = records.slice().reverse().map(row =>
    `<tr><td>${row.time}</td><td>${format(row.voltage)}</td><td>${format(row.current)}</td><td>${format(row.power)}</td><td>${format(row.energy, 4)}</td></tr>`
  ).join("") || `<tr><td colspan="5">Belum ada data. Tambahkan pengukuran pertama.</td></tr>`;
  chart.data.labels = records.map((r, idx) => `Data ${idx+1}`);
  chart.data.datasets[0].data = records.map(r => r.power);
  chart.update();
}
const chart = new Chart($("powerChart"), {
  type: "line",
  data: { labels: [], datasets: [{ label: "Daya (W)", data: [], borderWidth: 2, tension: .3, fill: false }] },
  options: { responsive: true, plugins: { legend: { display: true } }, scales: { y: { beginAtZero: true } } }
});
function addRecord(voltage, current, hours) {
  const power = voltage * current;
  const energy = power * hours / 1000;
  records.push({time: new Date().toLocaleString("id-ID"), voltage, current, power, hours, energy});
  saveRecords(); render();
}
$("measurementForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const voltage = Number($("v").value), current = Number($("i").value), hours = Number($("t").value);
  if ([voltage,current,hours].some(n => !Number.isFinite(n) || n < 0)) {
    alert("Masukkan angka yang valid dan tidak negatif."); return;
  }
  addRecord(voltage,current,hours);
  event.target.reset(); $("t").value = 1;
});
$("demoBtn").addEventListener("click", () => {
  addRecord(220, 0.35 + Math.random()*0.4, 1);
});
$("clearBtn").addEventListener("click", () => {
  if(confirm("Hapus seluruh riwayat pengukuran dari browser ini?")) {
    records=[]; saveRecords(); render();
  }
});
render();