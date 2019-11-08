var bool = true;
var dataid = "a";
var username = "a";
var password = "a";
var milih = false;
var jumlahSuaraSatu = 0;
var jumlahSuaraDua = 0;
var total = 0;

document.getElementById("TombolPageDua").onclick = function(){
  document.getElementById("CalonSatu").hidden = false;
  document.getElementById("CalonDua").hidden = false;
  document.getElementById("Silakan").hidden = false;
  document.getElementById("Back").hidden = false;
  document.getElementById("PageDuaContainer").hidden = true;
}

document.getElementById("Result").onclick = function(){
  database.ref("Calon").once('value', getScore);
  function getScore(data){
    var score = data.val();
    var id = Object.keys(score);
    jumlahSuaraSatu = score[id[0]].JumlahSuara;
    jumlahSuaraDua = score[id[1]].JumlahSuara;
    total = score[id[2]].Total;
  }
    document.getElementById("box").hidden = true;
    document.getElementById("chartContainer").hidden = false;
    document.getElementById("PhotoCalonSatu").hidden = false;
    document.getElementById("PhotoCalonDua").hidden = false;
    document.getElementById("BacktoHome").hidden = false;
    document.getElementById("Selamat").hidden = true;
    setTimeout(function(){
    if(total == 0){
      show(jumlahSuaraSatu,jumlahSuaraDua,1);
    }
    else{
      show(jumlahSuaraSatu,jumlahSuaraDua,total);
    }
    }, 500);
}
document.getElementById("BacktoHome").onclick = function(){
  document.getElementById("box").hidden = false;
  document.getElementById("chartContainer").hidden = true;
  document.getElementById("PhotoCalonSatu").hidden = true;
  document.getElementById("PhotoCalonDua").hidden = true;
  document.getElementById("BacktoHome").hidden = true;
}

function auth() {
  if (bool) {
    var name = document.getElementById("Name").value;
    var pass = document.getElementById("Pass").value;
    database.ref("Pemilih").once('value', gotData, errData);

    function gotData(data) {
      let names = data.val();
      let keys = Object.keys(names);
      for (var i = 0; i < keys.length; i++) {
        dataid = keys[i];
        username = names[dataid].Username;
        password = names[dataid].Password;
        milih = names[dataid].Milih;
        if(name == username && pass == password && milih == false) {
          alert("Welcome");
          bool = false;
          document.getElementById("box").hidden = true;
          document.getElementById("Name").value = '';
          document.getElementById("Pass").value = '';
          document.getElementById("PageDuaContainer").hidden = false;
          document.getElementById("Selamat").hidden = true;
          break;
        }
        else if (name == username && pass == password && milih == true) {
          alert("Sudah pernah memilih");
          break;
        }
        else if(i == keys.length-1){
          alert("Username atau Password salah");
        }
      }
    }
  }
  else {
    if (document.getElementById("TombolCalonSatu").checked || document.getElementById("TombolCalonDua").checked) {
      document.getElementById("Back").disabled = false;
    }
    document.getElementById("Back").onclick = function() {
      database.ref("Calon").once('value', total);
      function total(data){
        let names = data.val();
        let keys = Object.keys(names);
        let k = keys[2];
        total = names[k].Total;
        total += 1;
        database.ref('Calon/-LsBpfY77SSzu4p8CjgL').update({
          Total: total
        })
      }
      if (document.getElementById("TombolCalonSatu").checked) {
        database.ref("Calon").once('value', scoreOne, errData);

        function scoreOne(data) {
          let names = data.val();
          let keys = Object.keys(names);
          let k = keys[0];
          let nama = names[k].Nama;
          jumlahSuaraSatu = names[k].JumlahSuara;
          jumlahSuaraSatu += 1;
          database.ref('Calon/-Lrr5r6pJ_F-aRp9dce5').update({
            Nama: "CalonSatu",
            JumlahSuara: jumlahSuaraSatu
          });
        }

        function errData(err) {
          alert(err);
        }
      }
      else if (document.getElementById("TombolCalonDua").checked) {
        database.ref("Calon").once('value', scoreOne, errData);
        function scoreOne(data) {
          let names = data.val();
          let keys = Object.keys(names);
          let k = keys[1];
          let nama = names[k].Nama;
          jumlahSuaraDua = names[k].JumlahSuara;
          jumlahSuaraDua += 1;
          database.ref('Calon/-Lrr7ocru2s33mlnz5j9').update({
            Nama: "CalonDua",
            JumlahSuara: jumlahSuaraDua
          });
        }

        function errData(err) {
          alert(err);
        }
      }
      var d = new Date();
      var hari = d.getDate();
      if (hari < 10) hari = "0" + hari;
      var bulan = d.getMonth() + 1;
      if (bulan < 10) bulan = "0" + bulan;
      var tahun = d.getFullYear();
      if (tahun < 10) tahun = "0" + tahun;
      var jam = d.getHours();
      if (jam < 10) jam = "0" + jam;
      var menit = d.getMinutes();
      if (menit < 10) menit = "0" + menit;
      var detik = d.getSeconds();
      if (detik < 10) detik = "0" + detik;
      var tanggal = hari + "/" + bulan + "/" + tahun;
      if (tanggal < 10) detik = "0" + tanggal;
      var waktu = jam + ":" + menit + ":" + detik;
      database.ref('Pemilih/' + dataid).update({
        Username: username,
        Password: password,
        Milih: true,
        Tanggal: tanggal,
        Waktu: waktu
      });
      document.getElementById("Sudah").hidden = false;
      document.getElementById("Thanks").hidden = false;
      document.getElementById("CalonSatu").hidden = true;
      document.getElementById("CalonDua").hidden = true;
      document.getElementById("Silakan").hidden = true;
      document.getElementById("Back").hidden = true;
      document.getElementById("Back").disabled = true;
    }
    document.getElementById("Sudah").onclick = function() {
      document.getElementById("box").hidden = false;
      document.getElementById("TombolCalonSatu").checked = false;
      document.getElementById("TombolCalonDua").checked = false;
      document.getElementById("Sudah").hidden = true;
      document.getElementById("Thanks").hidden = true;
      document.getElementById("Selamat").hidden = false;
      bool = true;
    }
  }
  function errData(err) {
    alert(err);
  }
}
