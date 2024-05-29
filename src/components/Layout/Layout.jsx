// Layout.jsx

// Importowanie komponentu AppBar z folderu components/AppBar
import { AppBar } from 'components/AppBar/AppBar';
// Importowanie funkcji Suspense z React do obsługi leniwej ładowania komponentów
import { Suspense } from 'react';
// Importowanie komponentu Outlet z react-router-dom do renderowania zagnieżdżonych tras
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      {/* Komentarz: Przestrzeń przed AppBar, aby nie zakrywał treści */}
      <AppBar />
      {/* Komentarz: Suspense do obsługi leniwej ładowania */}
      <Suspense fallback={null}>
        <Outlet /> {/* Komentarz: Outlet renderuje zagnieżdżone trasy */}
      </Suspense>
    </>
  );
};
