const precosA = { 2: 300, 4: 475, 6: 650.10, 8: 825.12, 10: 1000 };
const precosB = { 2: 300, 4: 525, 6: 750, 8: 974.96, 10: 1200 };

let catSelecionada = -1;
let nomeCat = "";

function showPage(num) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page' + num).classList.add('active');
    window.scrollTo(0,0);
}

function selectCategory(id, nome) {
    catSelecionada = id;
    nomeCat = nome;
    document.getElementById('cat-title').innerText = "Pacotes para " + nome;
    renderizarPacotes();
    showPage(3);
}

function renderizarPacotes() {
    const grid = document.getElementById('pacotes-grid');
    grid.innerHTML = "";
    
    // Lista de aulas que queremos mostrar como "pacotes"
    const pacotesAulas = [4, 6, 8, 10]; 

    pacotesAulas.forEach(qtd => {
        let precoEscola = 0;
        let desc = "";

        // Lógica de cálculo conforme sua regra C++
        if (catSelecionada == 0 || catSelecionada == 3) { // A ou Inclusão A
            precoEscola = precosA[qtd] + (qtd <= 4 ? 100 : 0);
            desc = `${qtd} Aulas Práticas de Moto`;
        } else if (catSelecionada == 1 || catSelecionada == 4) { // B ou Inclusão B
            precoEscola = precosB[qtd] + (qtd <= 4 ? 100 : 0);
            desc = `${qtd} Aulas Práticas de Carro`;
        } else if (catSelecionada == 2) { // AB
            precoEscola = precosA[qtd] + precosB[qtd] + (qtd*2 <= 8 ? 100 : 0);
            desc = `${qtd} Aulas de Moto + ${qtd} Aulas de Carro`;
        }

        let taxaDetran = (catSelecionada == 2) ? 1010.21 : (catSelecionada >= 3 ? 510.75 : 834.23);
        let total = precoEscola + taxaDetran;

        grid.innerHTML += `
            <div class="card" onclick="finalizarOrcamento('${qtd}', ${precoEscola}, ${taxaDetran})">
                <div class="card-img" style="background-image: url('pacote.jpg');"></div>
                <h3>Plano ${qtd} Aulas</h3>
                <p class="price-tag">R$ ${total.toFixed(2)}</p>
                <ul class="features">
                    <li>✓ ${desc}</li>
                    <li>✓ Taxas Detran Inclusas</li>
                    <li>✓ Material Didático</li>
                </ul>
                <button class="btn-primary" style="border-radius:0">SELECIONAR</button>
            </div>
        `;
    });

    // Se for AB, adicionamos a opção personalizada
    if (catSelecionada == 2) {
        grid.innerHTML += `
            <div class="card" style="border-top-color: var(--secondary)">
                <div class="card-img" style="background-image: url('custom.jpg');"></div>
                <h3>Personalizado</h3>
                <p>Monte do seu jeito</p>
                <p>Fale direto com nossos consultores para ajustar aulas de carro e moto separadamente.</p>
                <button class="btn-primary" style="background:var(--secondary)" onclick="contactWhats()">WHATSAPP</button>
            </div>
        `;
    }
}

function finalizarOrcamento(qtd, escola, taxas) {
    const total = escola + taxas;
    document.getElementById('result-display').innerHTML = `
        <h3>${nomeCat} - ${qtd} Aulas</h3>
        <hr style="margin:15px 0">
        <p>Autoescola: <strong>R$ ${escola.toFixed(2)}</strong></p>
        <p>Taxas/Clínica: <strong>R$ ${taxas.toFixed(2)}</strong></p>
        <div style="background:var(--primary); color:white; padding:20px; margin-top:20px; border-radius:10px; text-align:center">
            <span style="font-size:0.8rem">TOTAL ESTIMADO</span><br>
            <span style="font-size:2rem; font-weight:bold">R$ ${total.toFixed(2)}</span>
        </div>
    `;
    showPage(4);
}

function contactWhats() {
    window.open("https://wa.me/5588999138424?text=Olá! Gostaria de saber mais sobre os planos da Cristal.");
}