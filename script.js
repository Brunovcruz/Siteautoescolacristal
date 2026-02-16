const precosA = { 2: 300, 4: 475, 6: 650.10, 8: 825.12, 10: 1000 };
const precosB = { 2: 300, 4: 525, 6: 750, 8: 974.96, 10: 1200 };

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
    
    const pacotesAulas = [2, 4, 6, 8, 10]; 

    pacotesAulas.forEach(qtd => {
        let precoEscola = 0;
        let desc = "";

        if (catSelecionada == 0 || catSelecionada == 3) {
            precoEscola = precosA[qtd] + (qtd <= 4 ? 100 : 0);
            desc = `${qtd} Aulas Práticas de Moto`;
        } else if (catSelecionada == 1 || catSelecionada == 4) {
            precoEscola = precosB[qtd] + (qtd <= 4 ? 100 : 0);
            desc = `${qtd} Aulas Práticas de Carro`;
        } else if (catSelecionada == 2) {
            precoEscola = precosA[qtd] + precosB[qtd] + (qtd*2 <= 8 ? 100 : 0);
            desc = `${qtd} Aulas de Moto + ${qtd} Aulas de Carro`;
        }

        let taxaDetran = (catSelecionada == 2) ? 1010.21 : (catSelecionada >= 3 ? 510.75 : 834.23);

        grid.innerHTML += `
            <div class="card" onclick="finalizarOrcamento('${qtd}', ${precoEscola}, ${taxaDetran})">
                <div class="card-img" style="background-image: url('pacote_${qtd}.jpg');"></div>
                <div class="card-info">
                    <h3>Plano ${qtd} Aulas</h3>
                    <p class="price-tag">R$ ${precoEscola.toFixed(2)}</p>
                    <ul class="features">
                        <li>${desc}</li>
                        <li>Material Didático Incluso</li>
                        <li style="color: #e67e22; font-weight: 600;">⚠️ Taxas Detran/Clínica à parte</li>
                    </ul>
                    <button class="btn-primary" style="width:100%; padding: 12px;">SELECIONAR</button>
                </div>
            </div>
        `;
    });

    if (catSelecionada == 2) {
        grid.innerHTML += `
            <div class="card" style="border-top: 5px solid var(--accent)">
                <div class="card-img" style="background-image: url('custom.jpg');"></div>
                <div class="card-info">
                    <h3>Personalizado</h3>
                    <p style="margin-bottom: 20px;">Monte seu plano conforme sua necessidade específica.</p>
                    <button class="btn-primary" style="background:var(--accent); width:100%" onclick="contactWhats()">WHATSAPP</button>
                </div>
            </div>
        `;
    }
}

function finalizarOrcamento(qtd, escola, taxas) {
    document.getElementById('result-display').innerHTML = `
        <h3 style="color: var(--primary); font-size: 1.5rem; margin-bottom: 10px;">${nomeCat}</h3>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Plano contratado: ${qtd} Aulas</p>
        <div style="text-align: left; background: #f9f9f9; padding: 20px; border-radius: 15px;">
            <p style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Valor Autoescola:</span>
                <strong>R$ ${escola.toFixed(2)}</strong>
            </p>
            <p style="color: #666; font-size: 0.85rem; border-top: 1px solid #eee; pt-10; margin-top: 10px;">
                * As taxas do Detran e Clínica serão detalhadas no seu atendimento via WhatsApp.
            </p>
        </div>
    `;
    showPage(4);
}

function contactWhats() {
    window.open("https://wa.me/5588999138424?text=Olá! Acabei de fazer um orçamento no site e gostaria de seguir com o atendimento.");
}