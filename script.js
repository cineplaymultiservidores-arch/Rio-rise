const features=[
 {name:"Munição Infinita",desc:"Mantenha o arsenal sempre abastecido.",icon:"♜"},
 {name:"Dinheiro Infinito",desc:"Exiba um saldo elevado no painel.",icon:"$"},
 {name:"Mira Automática",desc:"Ajuste automático de mira na interface.",icon:"◎"},
 {name:"Voar",desc:"Ative o modo de movimentação aérea.",icon:"➤"},
 {name:"Correr Mais Rápido",desc:"Ajuste a velocidade exibida no painel.",icon:"➜"},
 {name:"Líder de Família",desc:"Gerencie o status de liderança.",icon:"♛"}
];
const cards=document.getElementById("cards"),count=document.getElementById("activeCount"),progress=document.getElementById("progress"),toast=document.getElementById("toast");
let state=JSON.parse(localStorage.getItem("modState")||"null")||Array(6).fill(true);

function render(){
 cards.innerHTML="";
 features.forEach((f,i)=>{
   const c=document.createElement("article"); c.className="card"+(state[i]?"":" disabled");
   c.innerHTML=`<div class="card-icon">${f.icon}</div><h3>${f.name}</h3><p>${f.desc}</p>
   <div class="toggle" data-i="${i}"><span class="on">ON</span><span class="off">OFF</span></div>`;
   cards.appendChild(c);
 });
 updateStats();
}
function updateStats(){
 const n=state.filter(Boolean).length; count.textContent=`${n}/6`; progress.style.width=`${n/6*100}%`;
 localStorage.setItem("modState",JSON.stringify(state));
}
function showToast(t){toast.textContent=t;toast.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>toast.classList.remove("show"),1800)}
cards.addEventListener("click",e=>{const t=e.target.closest(".toggle");if(!t)return;const i=+t.dataset.i;state[i]=!state[i];render();showToast(`${features[i].name}: ${state[i]?"ATIVADO":"DESATIVADO"}`)});
document.getElementById("allBtn").onclick=()=>{state=Array(6).fill(true);render();showToast("Todas as opções foram ativadas.")};
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("bright");showToast("Brilho da interface alternado.")};
document.getElementById("settingsBtn").onclick=()=>{document.getElementById("settingsPanel").classList.toggle("hidden");document.getElementById("aboutPanel").classList.add("hidden")};
document.querySelectorAll(".nav").forEach(b=>b.addEventListener("click",()=>{
 document.querySelectorAll(".nav").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 if(b.dataset.section==="config")document.getElementById("settingsPanel").classList.remove("hidden");
 else document.getElementById("settingsPanel").classList.add("hidden");
 if(b.dataset.section==="sobre")document.getElementById("aboutPanel").classList.remove("hidden");
 else document.getElementById("aboutPanel").classList.add("hidden");
}));
document.getElementById("saveSettings").onclick=()=>showToast("Configurações salvas.");
document.getElementById("exitBtn").onclick=()=>showToast("Painel encerrado.");
render();