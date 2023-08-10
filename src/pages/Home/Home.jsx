import {useState} from 'react'
import Header from '../../components/Header/Header'
import ListaDeRepositorios  from "../../components/ListaDeRepositorios/ListaDeRepositorios"
import background from './../../assets/background.png'
import './Home.css'

function Home() {
  const [quantidadeDeBuscas,setQuantidadeDeBuscas]=useState(0)
  const [usuario,setUsuario]=useState('')
  const [usuarioPesquisado,setUsuarioPesquisado]=useState(null)
  const [repositorioPesquisado,setRepositorioPesquisado]=useState(null)
  
  const buscar_dados_da_API= async ()=>{
        //LIMPADO OS DADOS DA ULTIMA PESQUISA
        setUsuarioPesquisado(null)
        setRepositorioPesquisado(null)

        //FAZENDO A NOVA PESQUISA
        const dados_da_API=await fetch(`https://api.github.com/users/${usuario}`)
        const dados_da_API_em_json=await dados_da_API.json()
        console.log(dados_da_API_em_json)

        if(dados_da_API_em_json.name){
          const {avatar_url,name,bio,login}=dados_da_API_em_json
          setUsuarioPesquisado({avatar_url,name,bio,login})

          const dados_repositorios_da_API=await fetch(`https://api.github.com/users/${usuario}/repos`)
          const dados_repositorios_da_API_em_json=await dados_repositorios_da_API.json()
          if(dados_repositorios_da_API_em_json.length){
            setRepositorioPesquisado(dados_repositorios_da_API_em_json)
          }  

        }

        //atualizar a quantidade_de buscas feitas na pagina
        setQuantidadeDeBuscas((quantidadeDeBuscas)=>quantidadeDeBuscas+1)

}   
  return (
    <>
      <main className='Home'>
        <Header></Header>
        <main className='conteudo'>
          <img src={background} className='background' alt="figura de um polvo ,fazendo uma referencia ao mascote oficial do GitHub da Microsoft." />


        <div className='agrupamento'>
              <section className='info'>
                  <div>
                    <input type="text" value={usuario} onChange={(evento)=>setUsuario(evento.target.value)} name='usuario' placeholder='@username' className='input-search' aria-label='campo do formulario para digitação do @username do usuario do github para que se busque informaçoes públicas sobre os repositorios do usuario, Exemplo de @username valido: @DavidSantosDeveloper'/>
                    <button onClick={buscar_dados_da_API}>Buscar</button>
                  </div>
              </section>

                {(!usuarioPesquisado?.name && quantidadeDeBuscas>0) ?(
                  <div id='messagem-not-found'>
                    <h3>{'Usuário não encontrado!'}</h3>
                    <span>{' Verifique se você digitou o nome do usuario corretamente.'}</span>
                  </div>

                ):<></>

                }
        

                {usuarioPesquisado?.name? (<>
                
                  <section className='Container-Profile'>
                        <img src={usuarioPesquisado.avatar_url} alt="imagem do perfil do usuario pesquisado" />
                        <div>
                            <h3>{usuarioPesquisado.name} </h3>
                            <a href={`https://github.com/${usuarioPesquisado.login}`} target='_blank' rel="noreferrer">{'@'+usuarioPesquisado.login} </a>
                            {console.log(usuarioPesquisado)}
                            <p onClick={()=>{
                              console.log("click!")
                            }}>{usuarioPesquisado.bio}</p>
                        </div>
                  
                  </section>

                <hr />

                </>):<></>
                  
                }

                {
                  repositorioPesquisado?.length?(<>
                    <section className='SecaoListaDeRepositorios'>
                        <h4>Repositórios</h4>
                        {
                          repositorioPesquisado.map((repositorio_atual)=>(
                            <ListaDeRepositorios titulo={repositorio_atual.name} descricao={repositorio_atual.description} url_do_repositorio={repositorio_atual.html_url}></ListaDeRepositorios>
                          ))
                        }

                        
                    </section>
                  
                  </>):null

                }

                {
                  console.log(repositorioPesquisado)
                }
                         
                  
        </div>
        </main>
      </main>
    </>
  )

}

export default Home
