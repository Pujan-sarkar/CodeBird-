import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
// import InvitationCard from "./components/Invition";
import InviteCard from "./components/InviteCard";
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
           <Route path="/:name/:department/:rollNo" element={<InviteCard/>} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;