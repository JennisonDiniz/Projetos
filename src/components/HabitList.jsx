import HabitCard from './HabitCard'
import {useState} from 'react'

function HabitList(){
    const [habits, setHabits] = useState([
        {id: 1, nome: 'Exercício', descricao: 'Treino de força', meta: 5, ativo: true, diasFeitos: 5},
        {id: 2, nome: 'Leitura', descricao: 'livro ou artigo', meta: 7, ativo: true, diasFeitos: 3},
        {id: 3, nome: 'Meditação', descricao: 'Respiração e foco', meta: 7, ativo: false, diasFeitos: 0},
        {id: 4, nome: 'Hidratação', descricao: 'Beber 2L de água', meta: 7, ativo: true, diasFeitos: 6},
    ])

    

        const [novoNome, setNovoNome] = useState('')
        const [novoDescricao, setNovoDescricao] = useState('')
        const [novoCategoria, setNovoCategoria] = useState('')


        const removerHabit = (id) => {
            setHabits(habits.filter(habit => habit.id !== id))
        
        }

        const adicionarHabit = (event) => {
            event.preventDefault()

            if(!novoNome.trim()){
                alert('Informe um nome para hábito.')
                return
            }
                const novoHabit = {
                    id: Date.now(),
                    nome: novoNome,
                    descricao: novoDescricao,
                    meta: 7,
                    ativo: true,
                    diasFeitos: 0,
                    categoria: novoCategoria || 'Geral',
                }
                
                setHabits([...habits, novoHabit])
                setNovoNome('')
                setNovoDescricao('')
                setNovoCategoria('')
            
        } 

    

    return(
        <section>
            <form onSubmit={adicionarHabit} className="habit-from">
            <div>
                <label>
                    Nome do hábito*  
                    <input 
                    type="text"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Descrição 
                    <input 
                    type="text"
                    value={novoDescricao}
                    onChange={(e) => setNovoDescricao(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Categoria 
                    <input
                    type="text"
                    value={novoCategoria}
                    onChange={(e) => setNovoCategoria(e.target.value)}
                    />
                </label>
            </div>
           



         </form>
        <ul>

            {habit.length === 0 && <p> Nenhum hábito cadastrado ainda. Que tal começar?</p>}

            {habits.map((habit) =>(
                <HabitCard
                key={habit.id}
                nome={habit.nome}
                descricao={habit.descricao}
                meta={habit.meta}
                ativo={habit.ativo}
                diasFeitos={habit.diasFeitos}
                onRemover={() => removerHabit(habit.id)}
                />
            ))}
        </ul>
        </section>
    )
}
export default HabitList