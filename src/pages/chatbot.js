import Chatbot from "../features/chatbot/chatbot";
import NavBar from "../features/NavBar/Navbar";

function chatbotPage() {
    return ( 
        <div>
            <NavBar>
                <Chatbot></Chatbot>
            </NavBar>
        </div>
     );
}

export default chatbotPage;