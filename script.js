// Lógica de Preços (Seu código C++)
const valoresA = { 2: 300, 4: 475, 6: 650.10, 8: 825.12, 10: 1000 };
const valoresB = { 2: 300, 4: 525, 6: 750, 8: 974.96, 10: 1200 };

let currentCatId = -1;
let currentCatNome = "";

// FUNÇÃO PRINCIPAL DE NAVEGAÇÃO
function showPage(num) {
    // Remove a classe active de todas as seções
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    // Adiciona na página clicada
    const target = document.getElementById('page' + num);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0,0);
    }
}

function selectCategory(id, nome) {
    currentCatId = id;
    currentCatNome = nome;
    document.getElementById('cat-title').innerText = nome;
    
    // Mostra ou esconde selects de aulas
    document.getElementById('areaAulasA').style.display = (id==0||id==2||id==3) ? 'block' : 'none';
    document.getElementById('areaAulasB').style.display = (id==1||id==2||id==4) ? 'block' : 'none';
    
    showPage(3);
}

function generateOrcamento() {
    const qA = parseInt(document.getElementById('aulasA').value) || 0;
    const qB = parseInt(document.getElementById('aulasB').value) || 0;
    
    let vEscola = 0;
    if (currentCatId==0||currentCatId==2||currentCatId==3) vEscola += valoresA[qA] || 0;
    if (currentCatId==1||currentCatId==2||currentCatId==4) vEscola += valoresB[qB] || 0;

    // Taxa de Matrícula (Lógica original)
    if ((currentCatId==2 && (qA+qB) <= 8) || (currentCatId!=2 && (qA<=4 || qB<=4))) {
        vEscola += 100;
    }

    let vTaxas = (currentCatId==2) ? 1010.21 : (currentCatId>=3 ? 510.75 : 834.23);

    document.getElementById('result-display').innerHTML = `
        <h3>${currentCatNome}</h3>
        <p>Serviços: R$ ${vEscola.toFixed(2)}</p>
        <p>Taxas: R$ ${vTaxas.toFixed(2)}</p>
        <div style="background:#1a2a6c; color:white; padding:15px; margin-top:10px; border-radius:10px; text-align:center; font-size:1.4rem">
            <strong>TOTAL: R$ ${(vEscola + vTaxas).toFixed(2)}</strong>
        </div>
    `;
    showPage(4);
}

function contactWhats() {
    window.open(`https://wa.me/5588999138424?text=Olá! Fiz um orçamento no site para ${currentCatNome}.`);
}