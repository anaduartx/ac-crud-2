import Head from 'next/head'
import { useState,useEffect} from 'react'

//importar a config do firebase
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs, orderBy, query, doc, deleteDoc, getDoc } from 'firebase/firestore';

//configurar o Firebase do projeto
const contato = collection(database,'contato')

export default function Read() {

  const [contatoLista,setContatoLista] = useState([])
  const read = ()=>{
    getDocs(query(contato, orderBy("nome")))
    .then((data)=>{
      setContatoLista(data.docs.map((item)=>{
        return{...item.data(), id:item.id}
      }))
    })
  }

  useEffect(()=>{
    read()
  },[])

  //função botão excluir
  const deleteBtn = (id)=>{
    const deleteDocumento = doc(database,"contato",id)
    deleteDoc(deleteDocumento)
    .then(()=>{
      read()
    })
  }

  //rotina de update inicio

  //mostrar o contato selecionado
  const [ID,setID] = useState(null)
  const [contatoUnico,setContatoUnico]=useState[{}]
  const [mostrar,setMostrar] = useState(false)
  const [nome,setNome]=useState("")
  const [email,setEmail]=useState("")
  const [telefone,setTelefone]=useState("")
  const [mensagem,setMensagem]=useState("")

  const show = async(id)=>{
    setID(id)
    if(ID!=null){
      const contatoSimples = doc(database,"contato",ID)
      const resultado = await getDoc(contatoSimples)
      setContatoUnico({...resultado.data(),id:resultado.id})
      setMostrar(true)
    }
  }
  useEffect(()=>{
    show(ID)
  },[ID])

  //rotina de update fim

  return (
    <>
    {mostrar ?(
      <div>
        <h3 className="text-center">ALTERAR</h3>
        <input type="text" name="nome" placeholder='Nome' className='form-control' id="" required onChange={event=>setNome(event.target.value)} value={contatoUnico.nome} />

        <input type="email" name="email" placeholder='Email' className='form-control' id="" required onChange={event=>setEmail(event.target.value)} value={contatoUnico.email} />

        <input type="tel" name="telefone" placeholder='Telefone' className='form-control' id="" required onChange={event=>setTelefone(event.target.value)} value={contatoUnico.telefone} />

        <textarea name="mensagem" className='form-control' placeholder='Mensagem' id="" onChange={event=>setMensagem(event.target.value)} value={contatoUnico.mensagem} ></textarea>

        <input type="submit" value="SALVAR" onClick={cadastrar} className='form-control btn btn-outline-dark' />
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
                <input type="button" className='btn-outline-warning form-control' value="Alterar" onclick={()=>show(lista.id)}/>
              <input type="button" onClick={()=>deleteBtn(lista.id)} className='btn-outline-danger form-control' value="Excluir" />  
              </div>
              </div>

              </div>
          )
        })}
    </>
  )
}
