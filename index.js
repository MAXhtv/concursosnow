//definicoes basicas
let provasWGab=[]
let botaoEnviar=document.getElementById("procurar")
botaoEnviar.disabled = true


//carrega o banco de dados
async function loadProvas() {
    try{
        const response=await fetch('./files/provas.json')
        if (!response.ok){
            throw new Error('erro ao carregar o bd')
        }
        const dados=await response.json()
        provasWGab=dados.provas
        console.log('concursos carregando:', provasWGab)
        botaoEnviar.disabled=false
    } catch (erro){
        console.error('erro:', erro)
    }
}



//tudo isso eh o codigo js pegando quais caixinhas o user ta marcando no frontend
function indexarEsfera(){
    let valores=document.getElementsByClassName('filtro-esfera')
    let valoresEsfera=[]
    for(var i=0; i<valores.length; i++){
        if(valores[i].checked){
            console.log('valores selecionados '+valores[i].value)
            valoresEsfera.push(valores[i].value)
        }
    }
    console.log(valoresEsfera)
    return valoresEsfera
}

function indexarArea(){
    let valores=document.getElementsByClassName('filtro-area')
    let valoresArea=[]
    for(var i=0; i<valores.length; i++){
        if(valores[i].checked){
            console.log('valores selecionados '+valores[i].value)
            valoresArea.push(valores[i].value)
        }
    }
    console.log(valoresArea)
    return valoresArea
}

function indexarRegiao(){
    let valores=document.getElementsByClassName('filtro-regiao')
    let valoresRegiao=[]
    for(var i=0; i<valores.length; i++){
        if(valores[i].checked){
            console.log('valores selecionados '+valores[i].value)
            valoresRegiao.push(valores[i].value)
        }
    }
    console.log(valoresRegiao)
    return valoresRegiao
}


function indexarGeral(){
    let resultGeneral=[]
    let valoresRegiao=indexarRegiao()
    let valoresArea=indexarArea()
    let valoresEsfera=indexarEsfera()

    resultGeneral.push(valoresEsfera, valoresArea, valoresRegiao)
    console.log(resultGeneral)
    return resultGeneral
}




//vai filtrar as provas e percorrer no .json tlgd
function filterProvas(){
    let filtros=indexarGeral()

    let valoresEsfera=filtros[0]
    let valoresArea=filtros[1]
    let valoresRegiao=filtros[2]

    let resultados=provasWGab.filter(provasWGab=>{
        let esferaValida=valoresEsfera.length===0||valoresEsfera.includes(provasWGab.esfera.toLowerCase())
        let areaValida=valoresArea.length===0||valoresArea.includes(provasWGab.area.toLowerCase())
        let regiaoValida=valoresRegiao.length===0||valoresRegiao.includes(provasWGab.estado.toLowerCase())
        return esferaValida && areaValida && regiaoValida
    })
    console.log(resultados)
    exibirResultados(resultados)
    
}


//exibe, obviamente
function exibirResultados(resultados) {

    let lista = document.getElementById('resultList')

    lista.innerHTML = ''

    if (resultados.length === 0) {
        lista.innerHTML = '<li>Nenhum concurso encontrado.</li>'
        return
    }

    resultados.forEach(concurso => {

        let item = document.createElement('li')

        item.innerHTML = `
            <h3>${concurso.concurso}</h3>

            <p>Cargo: ${concurso.cargo}</p>
            <p>Ano: ${concurso.ano}</p>
            <p>Estado: ${concurso.estado}</p>
            <p>Área: ${concurso.area}</p>
            <p>Esfera: ${concurso.esfera}</p>

            <a href="${concurso.prova_url}" target="_blank">
                Baixar prova
            </a></br>

            <a href="${concurso.gabarito_url}" target="_blank">
                Baixar gabarito
            </a>
        `

        lista.appendChild(item)
    })
}

botaoEnviar.addEventListener("click", filterProvas)
loadProvas()