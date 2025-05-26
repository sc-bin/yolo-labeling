import './App.css'
import EditorView from './views/EditorView/EditorView'
import { Provider } from "react-redux";
import { store } from "./store"; 
function App() {

  return (
     <Provider store={store}>
      <EditorView />
    </Provider>

  )
}

export default App
