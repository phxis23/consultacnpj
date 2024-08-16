
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css'; 
import api from "./services/api" 

function App() {

  const [input, setInput] = useState(''); 
  const [cnpj, setCNPJ] = useState({}); 

 
  async function handleSearch(){ 

    if(input === ''){ 
      alert("Preencha algum CNPJ!") 
      return; 
    } 

  try{  
  const response = await api.get(`${input}`) 
    setCNPJ(response.data) 
    setInput("") 
  }catch{ 
    alert("Erro ao buscar CNPJ!")
    setInput("") 
 }

}
  return ( 
  <div className="container">
  <h1 className="title">Buscador CNPJ</h1> 
  
  <div className="containerInput"> 
    <input 
       type="text"
       placeholder="Digite seu CNPJ..."
       value={input}
       onChange={(e) => setInput(e.target.value)}
   />
  
  <button className="buttonSearch" onClick={handleSearch}> 
      <FiSearch size={25} color="#FFF"/>
    </button> 

 
  </div>
   {Object.keys(cnpj).length > 0 && ( 
    <main className="main"> 
      <h2>Razão Social: {cnpj.razao_social}</h2>
      <span>Fundação: {cnpj.data_inicio_atividade}</span> 
      <span>Situação Cadastral: {cnpj.descricao_situacao_cadastral}</span>
      <span>Contato: {cnpj.ddd_fax}</span>
    </main> 
  )} 
   
  </div>
  );
} 
  
export default App; 
  
