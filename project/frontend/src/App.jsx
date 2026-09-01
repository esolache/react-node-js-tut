import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import BookOnline from "./pages/BookOnline.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import ContactList from "./pages/admin/ContactList.jsx";
import NotFound from "./pages/NotFound.jsx";
import TodoTutorial from "./pages/TodoTutorial.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-online" element={<BookOnline />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo-tutorial" element={<TodoTutorial />} />
          <Route path="/contact-list" element={<ContactList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
