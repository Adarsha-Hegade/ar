import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export function Layout() {
  return (
    <div className="min-h-screen w-full bg-gray-900">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}