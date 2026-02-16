const precosA = { 2: 300, 4: 475, 6: 650, 8: 825, 10: 1000 };
const precosB = { 2: 300, 4: 525, 6: 750, 8: 975, 10: 1200 };

let catSelecionada = -1;
let nomeCat = "";

function showPage(num) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page' + num).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectCategory(id, nome) {
    catSelecionada = id;
    nomeCat = nome;
    document.getElementById('cat-title').innerHTML = `Pacotes para <span class="accent">${nome}</span>`;
    renderizarPacotes();
    showPage(3);
}

function renderizarPacotes() {
    const grid = document.getElementById('pacotes-grid');
    grid.innerHTML = "";
    
    if (catSelecionada == 2) {
        grid.innerHTML = `
            <div class="ab-custom-box">
                <h3>Monte seu plano AB</h3>
                <p>Escolha a quantidade de aulas para cada categoria:</p>
                <div class="ab-controls">
                    <div>
                        <label>Moto (A):</label>
                        <select id="customA">
                            ${[2,4,6,8,10].map(n => `<option value="${n}">${n} Aulas</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label>Carro (B):</label>
                        <select id="customB">
                            ${[2,4,6,8,10].map(n => `<option value="${n}">${n} Aulas</option>`).join('')}
                        </select>
                    </div>
                </div>
                <button class="btn-primary" onclick="calcularABPersonalizado()">CALCULAR E SELECIONAR</button>
            </div>
        `;
    }

    const pacotesAulas = [2, 4, 6, 8, 10]; 

    pacotesAulas.forEach(qtd => {
        let precoEscola = 0;
        let desc = "";

        if (catSelecionada == 0 || catSelecionada == 3) {
            precoEscola = precosA[qtd] + (qtd <= 4 && catSelecionada != 2 ? 100 : 0);
            desc = `${qtd} Aulas Práticas de Moto`;
        } else if (catSelecionada == 1 || catSelecionada == 4) {
            precoEscola = precosB[qtd] + (qtd <= 4 && catSelecionada != 2 ? 100 : 0);
            desc = `${qtd} Aulas Práticas de Carro`;
        } else if (catSelecionada == 2) {
            precoEscola = precosA[qtd] + precosB[qtd] + (qtd*2 <= 8 ? 100 : 0);
            desc = `${qtd} Aulas de Moto + ${qtd} Aulas de Carro`;
        }

        const materialTexto = (catSelecionada != 3 && catSelecionada != 4) ? 
            `<li>Material Didático</li>` : "";

        // Lógica de Interação: Destaque para o plano de 2 aulas
        const isPopular = (qtd === 2);
        const popularTag = isPopular ? `<div class="popular-badge">POPULAR 🔥</div>` : "";
        const popularClass = isPopular ? "card-popular" : "";

        grid.innerHTML += `
            <div class="card ${popularClass}">
                ${popularTag}
                <div class="card-img" style="background-image: url('pacote_${qtd}.jpg');"></div>
                <div class="card-info center-text">
                    <h3>Plano ${qtd} Aulas</h3>
                    <p class="price-tag">R$ ${Math.round(precoEscola)},00</p>
                    <ul class="features">
                        <li>${desc}</li>
                        ${materialTexto}
                        <li>Acompanhamento completo</li>
                        <li style="color: #e67e22; font-weight: 600;">Taxas Detran/Clínica à parte</li>
                    </ul>
                    <button class="btn-primary" style="width:100%; padding: 12px; margin-top: 15px;" 
                            onclick="gerarOrcamentoFinal('${qtd}', ${precoEscola})">SELECIONAR</button>
                </div>
            </div>
        `;
    });
}

function calcularABPersonalizado() {
    const qA = parseInt(document.getElementById('customA').value);
    const qB = parseInt(document.getElementById('customB').value);
    
    let precoEscola = precosA[qA] + precosB[qB];
    if ((qA + qB) <= 8) precoEscola += 100;

    gerarOrcamentoFinal(`${qA}A + ${qB}B`, precoEscola);
}

function gerarOrcamentoFinal(qtd, escola) {
    const display = document.getElementById('result-display');
    let material = (catSelecionada != 3 && catSelecionada != 4) ? 
        `<div class="service-item"><span>Material Didático</span> <strong>Sim</strong></div>` : "";

    display.innerHTML = `
        <h3 style="color: var(--primary); margin-bottom: 20px; border-bottom: 2px solid var(--accent); padding-bottom: 10px;">${nomeCat}</h3>
        <div class="orcamento-detalhes">
            <div class="service-item"><span>Aulas contratadas:</span> <strong>${qtd}</strong></div>
            ${material}
            <div class="service-item"><span>Acompanhamento:</span> <strong>Completo</strong></div>
            <div class="service-item" style="border-top: 2px solid var(--primary); margin-top: 15px; padding-top: 15px;">
                <span>VALOR AUTOESCOLA</span>
                <strong style="font-size: 1.5rem;">R$ ${Math.round(escola)},00</strong>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 20px;">
                Taxas de Detran e Clínica não inclusas. Atendimento via WhatsApp para finalização.
            </p>
        </div>
    `;
    showPage(4);
}

function contactWhats() {
    window.open("https://wa.me/5588999138424?text=Olá! Fiz um orçamento de " + nomeCat + " e gostaria de tirar dúvidas.");
}