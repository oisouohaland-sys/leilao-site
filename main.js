// Dados na memória
let leilaoAtivo = false;
let leilao = { desc: '', inicial: 0, maior: 0, nickname: '', vencedor: '' };
let adminLogado = false;
let leilaoEncerrado = false;

// Elementos
const loginDiv = document.getElementById('login');
const adminPanel = document.getElementById('adminPanel');
const leilaoDiv = document.getElementById('leilao');
const adminControls = document.getElementById('adminControls');
const vencedorDiv = document.getElementById('vencedor');

function loginAdmin() {
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;
  if (user === 'admin' && pass === 'leilao123') {
    adminLogado = true;
    loginDiv.classList.add('hidden');
    adminPanel.classList.remove('hidden');
  } else {
    document.getElementById('loginMsg').innerText = 'Usuário ou senha incorretos.';
  }
}

function criarLeilao() {
  const desc = document.getElementById('itemDesc').value.trim();
  const inicial = Number(document.getElementById('startBid').value);
  if (!desc || isNaN(inicial) || inicial <= 0) {
    document.getElementById('adminMsg').innerText = 'Preencha tudo corretamente!';
    return;
  }
  leilao = { desc, inicial, maior: inicial, nickname: '', vencedor: '' };
  leilaoAtivo = true;
  leilaoEncerrado = false;
  document.getElementById('adminMsg').innerText = 'Leilão criado!';
  adminPanel.classList.add('hidden');
  leilaoDiv.classList.remove('hidden');
  adminControls.classList.remove('hidden');
  atualizarLeilao();
}

function atualizarLeilao() {
  document.getElementById('desc').innerText = leilao.desc;
  const maiorLanceDiv = document.getElementById('maiorLance');
  maiorLanceDiv.innerHTML = `Maior lance: <span id=\"valorAtual\">${leilao.maior}</span> R$<br>`;
  if (leilao.nickname) {
    maiorLanceDiv.innerHTML += `Por: <b>${leilao.nickname}</b>`;
  } else {
    maiorLanceDiv.innerHTML += 'Sem lances além do valor inicial.';
  }
  document.getElementById('lanceMsg').innerText = '';
}

function enviarLance() {
  if (!leilaoAtivo || leilaoEncerrado) return;
  const nickname = document.getElementById('nickname').value.trim();
  const valor = Number(document.getElementById('valorLance').value);
  if (!nickname || isNaN(valor) || valor <= leilao.maior) {
    document.getElementById('lanceMsg').innerText = `Digite um nome e um valor maior que ${leilao.maior} R$`;
    return;
  }
  leilao.maior = valor;
  leilao.nickname = nickname;
  atualizarLeilao();
  document.getElementById('valorLance').value = '';
  document.getElementById('nickname').value = '';
  document.getElementById('lanceMsg').innerText = 'Lance enviado!';
}

function encerrarLeilao() {
  leilaoAtivo = false;
  leilaoEncerrado = true;
  leilao.vencedor = leilao.nickname;
  leilaoDiv.classList.add('hidden');
  adminControls.classList.add('hidden');
  vencedorDiv.classList.remove('hidden');
  let msg = '';
  if (leilao.vencedor) {
    msg = `<p>Vencedor: <b>${leilao.vencedor}</b>!<br>Com valor de <b>${leilao.maior} R$</b></p>`;
  } else {
    msg = '<p>Ninguém deu lance além do valor inicial.</p>';
  }
  document.getElementById('winnerInfo').innerHTML = msg;
}
