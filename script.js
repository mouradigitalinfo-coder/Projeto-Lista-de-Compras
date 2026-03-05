let itemAdicionado = []
let valorAdicionado = []

function adicionarItem() {

    const itemInput = document.getElementById('item_input');
    const valorInput = document.getElementById('valor_input');
    const addButton = document.getElementById('add_button');
    if (!itemInput || !valorInput || !addButton) {
        return;
    }

    const upgradeButtonState = () => {
        if (itemInput.value.trim().length === 0) {
            addButton.disabled = true;
        } else if (valorInput.value.trim().length === 0) {            
            addButton.disabled = true;
        } else {
            addButton.disabled = false;
        }
    };

    itemInput.addEventListener('input', upgradeButtonState);
    valorInput.addEventListener('input', upgradeButtonState);

    let itemAdicionados = itemInput.value.trim();
    let valorAdicionados = valorInput.value.trim();

    itemInput.value = "";
    valorInput.value = "";
    addButton.disabled = true;

    itemAdicionado.push(itemAdicionados);
    valorAdicionado.push(valorAdicionados);
    renderizarItensValor();

    if (itemAdicionados !== 0 || valorAdicionados !== 0) {
        let mensagemItem = document.getElementById('mensagemSucesso');
        mensagemItem.style.display = 'block';

        setTimeout(function() {
            mensagemItem.style.display = 'none';
        }, 2000);
        return;
    }
    return upgradeButtonState();
}

function renderizarItensValor() {
    const listaCarrinho = document.getElementById("carrinhoLista");
    listaCarrinho.innerHTML = "";

    for (let i = 0; i < itemAdicionado.length && i < valorAdicionado.length; i++) {
    let item = document.createElement("li");
    item.textContent = itemAdicionado[i] + valorAdicionado[i];

    let itemLimpar = document.createElement('button_limpar');
    itemLimpar.textContent = 'X';
    itemLimpar.onclick = () => limparItem(i);

    let excluirTudo = document.getElementById('nav_trash');
    if (excluirTudo) {
    excluirTudo.onclick = () => limparLista();
    }
    listaCarrinho.value = "";
    itemAdicionado[i].value = "";
    valorAdicionado[i].value = "";

    item.appendChild(itemLimpar)
    item.appendChild(checkbox);
    listaCarrinho.appendChild(item);

    let listaVazia = document.getElementById('carrinho_conteiner');
    if (listaVazia) {
        if (item !== "") {
            listaVazia.style.display = 'none';
        }
    }
    }
}

function limparItem(i) {
    itemAdicionado.splice(i, 1);
    valorAdicionado.splice(i, 1);
    renderizarItensValor();
}

function limparLista() {
    if (confirm('Tem certeza que deseja Excluir todos os itens da lista?')) {
    itemAdicionado = [];
    valorAdicionado = [];
    renderizarItensValor();
}
}