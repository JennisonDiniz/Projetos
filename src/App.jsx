

import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import BemVindo from'./components/BemVindo'

function App() {
  

  return (
    <>
     <div>
        <Header
        titulo='My Daily Habits'
        descricao='Construindo uma rotina melhor, um hábito por vez.'
        />
      <BemVindo nomeUsuario="turma iteam" totalHabitos={55}/>
      <Footer/>
      </div>
    </>
  )
}

export default App




