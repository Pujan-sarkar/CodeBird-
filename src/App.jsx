import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import InvitationCard from "./components/Invition";
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes> 
          <Route
            path="/"
            element={ <Form />}
          />
           <Route
            path="/get/data"
            element={ <Dashboard/>}
          />
           <Route path="/:name/:department/:rollNo" element={<InvitationCard />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;