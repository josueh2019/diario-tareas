const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'Line-through'
let id 
let LIST



//fecha
const FECHA = new Date()
fecha.innerHTML= FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'long',day:'numeric',year:'numeric'})


//esta es la funcion que me va agregar las tareas 
function agregarTarea (tarea,id,realizado,eliminado) {
  if(eliminado){return}

  const REALIZADO = realizado ?check :uncheck
  const LINE = realizado ?lineThrough :''

  const elemento = `
                    <li id="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>
                    `
  lista.insertAdjacentHTML("beforeend",elemento)                  
}

//funcion que ya realice mi tarea
function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}

//funcion con la que elimino la tarea realizada

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  LIST[element.id].eliminado = true
}

//lo que ocurre cuando doy click al icono

botonEnter.addEventListener('click',()=>{
    const tarea = input.value
    if(tarea) {
      agregarTarea(tarea,id,false,false)
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false 
      })
    }
    localStorage.setItem('DIARIO',JSON.stringify(LIST))
    input.value=''
    id++
})

//lo que ocurre cuando doy enter a una nueva tarea

document.addEventListener('keyup', function(event){
  if(event.key=='Enter'){
      const tarea = input.value
      if(tarea){
          agregarTarea(tarea,id,false,false)
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false 
      })
    }
    localStorage.setItem('DIARIO',JSON.stringify(LIST))
    input.value=''
    id++
  }
})

lista.addEventListener('click',function(event){
  const element = event.target
  const elementData = element.attributes.data.value
  if(elementData==='realizado'){
    tareaRealizada(element)
  }
  else if(elementData==='eliminado'){
    tareaEliminada(element)
  }
  localStorage.setItem('DIARIO',JSON.stringify(LIST))
})

//traer la info guardada
let data = localStorage.getItem('DIARIO')
if(data){
  LIST=JSON.parse(data)
  id = LIST.length
  cargarLista(LIST)
}else {
    LIST = []
    id=0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
      agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}