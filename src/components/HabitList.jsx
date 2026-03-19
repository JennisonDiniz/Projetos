import { useState, useEffect, useRef } from 'react'
import HabitCard from './HabitCard'

function HabitList() {
  const [habits, setHabits] = useState(() => {
// Esta função executa UMA VEZ — na montagem
const stored = localStorage.getItem('my-daily-habits')
// Se não há nada salvo — usa o array inicial
if (!stored) return [
{ id: 1, nome:'Exercício', descricao: 'Treino de força', meta: 5,
ativo: true, diasFeitos: 5 },
{ id: 2, nome: 'Leitura', descricao: 'Livro ou artigo', meta: 7,
ativo: true, diasFeitos: 3 },
{ id: 3, nome: 'Meditação', descricao: 'Respiração e foco', meta: 7,
ativo: false, diasFeitos: 0 },
{ id: 4, nome: 'Hidratação', descricao: 'Beber 2L de água', meta: 7,
ativo: true, diasFeitos: 6 },
]
  
// Se há dados salvos — tenta fazer o parse
try {
	return JSON.parse(stored)
} catch {
// Se o JSON estiver corrompido — volta pro array inicial
return []
}
})

     useEffect(() => {
    localStorage.setItem('my-daily-habits', JSON.stringify(habits))
    }, [habits])

    const [erroNome, setErroNome] = useState('')
    const nomeInputRef = useRef(null)

    const [novoNome,      setNovoNome]      = useState('')
    const [novaDescricao, setNovaDescricao] = useState('')
    const [novaCategoria, setNovaCategoria] = useState('')

    const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'novoNome') {
  setNovoNome(value)
// Valida comprimento mínimo em tempo real
  if (value.length > 0 && value.length < 3) {
  setErroNome('O nome deve ter pelo menos 3 caracteres.')
  } 
    else {
  setErroNome('')
    }
  }
if (name === 'novaDescricao') setNovaDescricao(value)
if (name === 'novaCategoria') setNovaCategoria(value)
  }
   const removerHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }
    const adicionarHabit = (event) => {
    event.preventDefault()

  if (!novoNome.trim()) {
    alert('Informe um nome para o hábito.')
    return
  }
  // Bloqueia se há erro de validação
    if (erroNome) {
  nomeInputRef.current?.focus()
    return
      }

  const novoHabit = {
    id: Date.now(),
    nome: novoNome,
    descricao: novaDescricao,
    meta: 7,              // padrão
    ativo: true,          // padrão
    diasFeitos: 0,        // padrão
    categoria: novaCategoria || 'Geral',
  }

  setHabits(prev => [...habits, novoHabit])

  // Limpar os campos após adicionar
  setNovoNome('')
  setNovaDescricao('')
  setNovaCategoria('')
  // Devolve o foco para o campo nome — useRef em ação
  nomeInputRef.current?.focus()

}

  const totalHabitos = habits.length

  return (
  <section>
    <form onSubmit={adicionarHabit} className="habit-form">
      <div>
      <label>
          Nome do hábito *
        <input
        type="text"
        name="novoNome"
        value={novoNome}
        onChange={handleChange}
        ref={nomeInputRef}
        />
        </label>
        {erroNome && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroNome}</p>}
      </div>
      <div>
        <label>
          Descrição
          <input
            type="text"
            name="novoNome"
            value={novaDescricao}
            onChange={handleChange}
            ref={nomeInputRef}
           />
        </label>
      </div>
      <div>
        <label>
          Categoria
          <input
            type="text"
            name="novoNome"
            value={novaCategoria}
            onChange={handleChange}
            ref={nomeInputRef}
           />
        </label>
      </div>
      <button type="submit">Adicionar hábito</button>
    </form>

    <ul>
      {habits.length === 0 && <p>Nenhum hábito cadastrado ainda.</p>}
      {habits.map((habit) => (
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