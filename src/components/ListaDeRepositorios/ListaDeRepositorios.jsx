import './ListaDeRepositorios.css'

function ListaDeRepositorios({titulo,descricao,url_do_repositorio}){
    return (
        <>
            <section className='ListaDeRepositorios'>
                <a href={url_do_repositorio} target='_blank' rel="noreferrer">
                    <h5>{titulo}</h5>
                </a>
                <p>{descricao}</p>
            </section>
            
            <hr />
        </>
    )
}

export default ListaDeRepositorios