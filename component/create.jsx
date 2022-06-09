import Head from 'next/head'
import { useState,useEffect} from 'react'

//importar a config do firebase
import { app, database } from '../services/firebase'
import { collection,addDoc, getDocs } from 'firebase/firestore';

//configurar o Firebase do projeto
const contato = collection(database,'contato')

export default function Create() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem,setMensagem]=useState('')

  const cadastrar = ()=>{
    addDoc(contato,
      { nome:nome,
        email:email,
        telefone:telefone,
        mensagem:mensagem
      }
      ).then(()=>{
        setNome('')
        setEmail('')
        setTelefone('')
        setMensagem('')
      })
  }

  return (
    <>
      
      <h3 className='text-center'>CADASTRAR</h3>
        <input type="text" name="nome" placeholder='Nome' className='form-control' id="" required onChange={event=>setNome(event.target.value)} value={nome} />

        <input type="email" name="email" placeholder='Email' className='form-control' id="" required onChange={event=>setEmail(event.target.value)} value={email} />

        <input type="tel" name="telefone" placeholder='Telefone' className='form-control' id="" required onChange={event=>setTelefone(event.target.value)} value={telefone} />

        <textarea name="mensagem" className='form-control' placeholder='Mensagem' id="" onChange={event=>setMensagem(event.target.value)} value={mensagem} ></textarea>

        <input type="submit" value="SALVAR" onClick={cadastrar} className='form-control btn btn-outline-dark' />

    </>
  )
}
