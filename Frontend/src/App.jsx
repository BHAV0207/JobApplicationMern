import JobList from "./Components/JobList";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <Header></Header>
      <JobList></JobList>
      <Footer></Footer>
    </div>
  );
}

export default App;
