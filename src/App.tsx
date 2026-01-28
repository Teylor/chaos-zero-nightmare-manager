import { Routes, Route, Link } from 'react-router-dom';
import Combatants from './pages/Combatants';
import { useTitle } from './hooks/useTitle';

function Home() {
  useTitle({ title: 'Chaos Zero Nightmare Manager' });

  return (
    <div className="w-full flex flex-col items-center">
      <header className="my-8 container text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="text-white">CHAOS </span>
          <span className="text-[#FD5613]">ZERO </span>
          <span className="text-white">NIGHTMARE</span>
          <span className="block text-2xl md:text-3xl mt-2 text-black font-medium">
            Roster Manager
          </span>
        </h1>
      </header>
      <section className="my-8 container">
        <div className="m-1 sm:m-10 grid grid-cols-1 gap-1 md:grid-cols-2">
          <Link
            key="combatants-link"
            to="/combatants"
            className="btn-home justify-self-center xl:translation-right-home"
          >
            Combatants
          </Link>
          <Link
            key="partners-link"
            to="/partners"
            className="btn-home justify-self-center xl:translation-left-home"
          >
            Partners
          </Link>
        </div>
        <div className="m-1 sm:m-10 grid grid-cols-1 gap-1">
          <Link
            key="teams-link"
            to="/teams"
            className="btn-home justify-self-center"
          >
            Teams
          </Link>
        </div>
        <div className="m-1 sm:m-10 grid grid-cols-1 gap-1 md:grid-cols-2">
          <Link
            key="savedata-link"
            to="/savedata"
            className="btn-home justify-self-center xl:translation-right-home"
          >
            Save Datas
          </Link>
          <Link
            key="fragments-link"
            to="/fragments"
            className="btn-home justify-self-center xl:translation-left-home"
          >
            Memory Fragments
          </Link>
        </div>
      </section>
      <footer className="min-[400px]:fixed bottom-0 left-0 right-0 py-4 pt-4 text-center text-white bg-black xs:static flex justify-center items-center">
        <p className="text-sm">
          &copy; 2024 Chaos Zero Nightmare Roster Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 px-4 py-3">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Chaos Zero Nightmare" className="h-10" />
        </Link>
      </header>
      <main className="bg-[#737373] pt-16 min-h-screen min-w-screen">
        <div className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/combatants" element={<Combatants />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
