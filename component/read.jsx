import { useState,useEffect} from 'react'
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs, orderBy, query, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
const contato = collection(database,'contato')
export default function Read() {
  const [contatoLista,setContatoLista] = useState([])
  const read = ()=>{
  getDocs(query(contato,orderBy("nome")))
    .then((data)=>{
      setContatoLista(data.docs.map((item)=>{
        return{...item.data(), id:item.id}
      }))
    })
  }
  useEffect(()=>{
    read()
  },[])
  // Função do botão excluir
  const deleteBtn = (id)=>{
    const documento = doc(database,"contato",id)
    deleteDoc(documento)
    .then(()=>{
    read()
    })
  }
// Rotina de Update início
// Mostrar o contato selecionado
const [ID, setID]=useState(null)
const [contatoUnico,setContatoUnico]=useState({})
const [mostrar,setMostrar] = useState(false)
const [nome,setNome] = useState("")
const [email, setEmail] = useState("")
const [telefone, setTelefone] = useState("")
const [mensagem,setMensagem] = useState("")
const show = async(id)=>{
  setID(id)
  if(ID!=null){
    const contatoSimples = doc(database,"contato",ID)
    const resultado = await getDoc(contatoSimples)
    setContatoUnico({...resultado.data(),id:resultado.id})
    setNome(contatoUnico.nome)
    setEmail(contatoUnico.email)
    setTelefone(contatoUnico.telefone)
    setMensagem(contatoUnico.mensagem)
    //setMostrar(true)
  }
  if(mensagem!=""){
    setMostrar(true)
  }
}
useEffect(()=>{
  show()
},[ID])
const bt_cancelar = ()=>{
  setMostrar(false)
  setNome("")
  setEmail("")
  setTelefone("")
  setMensagem("")
  setID(null)
}
const bt_alterar = (id)=>{
  const contatoShow = doc(database,"contato",id)
  updateDoc(contatoShow,{
    nome: nome, email: email, telefone: telefone, mensagem: mensagem
  }).then(()=>{
    setNome("")
    setEmail("")
    setTelefone("")
    setMensagem("")
    setID(null)
    read()
    setMostrar(false)
  })
}
// Rotina de Update fim
  return (
    <>
    {mostrar ?(
      <div>
        <h3 className="text-center">ALTERAR</h3>
        <input type="text" name="nome" placeholder='Nome' className='form-control' id="" required onChange={event=>setNome(event.target.value)} value={nome} />
        <input type="email" name="email" placeholder='Email' className='form-control' id="" required onChange={event=>setEmail(event.target.value)} value={email} />
        <input type="tel" name="telefone" placeholder='Telefone' className='form-control' id="" required onChange={event=>setTelefone(event.target.value)} value={telefone} />
        <textarea name="mensagem" className='form-control' placeholder='Mensagem' id="" onChange={event=>setMensagem(event.target.value)} value={mensagem} ></textarea>
        <input type="button" value="CANCELAR" className="form-control btn btn-outline-danger" onClick={bt_cancelar} />
        <input type="submit" value="SALVAR" className='form-control btn btn-outline-dark' onClick={()=>bt_alterar(contatoUnico.id)} />
      </div>
    ):(
      <></>
    )}
        <h3 className='text-center'>GRAVADOS</h3>
        {contatoLista.map((lista)=>{
          return(
            <div className='card'>
              <div className="card-header bg-dark text-light">{lista.nome}</div>
              <div className='card-body'>
              <p className='card-subtitle'>{lista.email}</p>
              <p className='card-subtitle'>{lista.telefone}</p>
              <p className='card-text'>{lista.mensagem}</p>
              </div>
              <div className='card-footer text-center'>
              <div className="input-group">
              <input type="button" className='btn-outline-warning form-control' value="Alterar" onClick={()=>show(lista.id)} />
              <input type="button" className='btn-outline-danger form-control' value="Excluir" onClick={()=>deleteBtn(lista.id)} />
              </div>
              </div>
            </div>
          )
        })}
    </>
  )
}