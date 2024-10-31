'use client'
import { useState } from 'react';

export default function SettingsSwitches() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      {/* Notification Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-md font-semibold">Som de Notificações</h3>
        <p className="text-[13px] text-gray-600 mt-2">
          Ative ou desative o som das notificações para manter o ambiente conforme suas preferências.
        </p>
        <div className="mt-4 flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-colors duration-300">
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-[3.5px] ml-[1px] ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </div>
          </label>
        </div>
      </div>

      {/* Dark Mode Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-md font-semibold">Tema Dark (Escuro)</h3>
        <p className="text-[13px] text-gray-600 mt-2">
          Ative o modo escuro para reduzir a canseira visual durante o uso prolongado do sistema.
        </p>
        <div className="mt-4 flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkModeEnabled}
              onChange={() => setDarkModeEnabled(!darkModeEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-colors duration-300">
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-[3.5px] ml-[1px] ${darkModeEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
