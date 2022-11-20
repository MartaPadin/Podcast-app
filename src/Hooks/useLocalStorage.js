import { useEffect , useState } from "react" ;

// Hook para guardar los podcasts en el localStorage

const useLocalStorage = (key, defaultValue) => {
    
    const dato = {'data': defaultValue , 'fecha': new Date()}; 
    const initialState = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : dato;
    const [data, setData] = useState(initialState);
    

    //Borramos el localStorage al pasar un dia.
    const Borrarcliente = () =>{
            const fecha = new Date();
    if((fecha - dato.fecha)>(24 * 60 * 60 * 1000)){
        localStorage.removeItem(key);
        return null
    }else { return data }
   

    }
    Borrarcliente();


    
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(data));
        }, [data, key]);
    return [data, setData];
  };
  
  export default useLocalStorage;
  
