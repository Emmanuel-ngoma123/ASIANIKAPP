"use client";

import { useState } from "react";
import { CreditCard, CheckCircle2, Clock, Info, ShieldCheck, Search } from "lucide-react";

export default function CotisationsPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("orange");

  const paymentMethods = [
    { id: "orange", name: "Orange Money", color: "bg-orange-500", text: "O-Money" },
    { id: "airtel", name: "Airtel Money", color: "bg-red-500", text: "Airtel" },
    { id: "mpesa", name: "M-Pesa", color: "bg-green-600", text: "M-Pesa" },
    { id: "illicocash", name: "IllicoCash", color: "bg-blue-600", text: "Rawbank" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">Cotisations</h2>
        <p className="text-gray-500 mt-2">Gérez vos paiements annuels et consultez votre historique.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Module de paiement */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-gray-100 bg-[#0a2342] text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Payer ma cotisation</h3>
              <CreditCard className="h-6 w-6 text-blue-300" />
            </div>
            <p className="text-blue-200 text-sm">Année en cours : 2026-2027</p>
          </div>
          
          <div className="p-8 flex-1">
            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-center border border-blue-100">
              <span className="block text-sm text-blue-600 font-bold uppercase tracking-wider mb-2">Montant de la cotisation</span>
              <span className="text-5xl font-black text-gray-900">50 USD</span>
              <span className="text-gray-500 text-sm ml-2">/ an</span>
            </div>

            <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Moyen de paiement</h4>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {paymentMethods.map(method => (
                <button 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id 
                      ? "border-blue-600 bg-blue-50 shadow-md scale-105" 
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full ${method.color} mb-2 shadow-sm flex items-center justify-center`}>
                    <span className="text-white font-bold text-xs">{method.name[0]}</span>
                  </div>
                  <span className={`text-xs font-bold ${selectedMethod === method.id ? "text-blue-700" : "text-gray-600"}`}>
                    {method.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">Instructions</p>
                  <p>Veuillez effectuer le transfert au numéro suivant : <span className="font-bold text-gray-900">+243 81 234 5678</span></p>
                  <p className="mt-2 text-xs">Une fois le transfert effectué, cliquez sur "Déclarer mon paiement" pour soumettre votre preuve de transaction.</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex justify-center items-center space-x-2">
              <ShieldCheck className="h-5 w-5" />
              <span>Déclarer mon paiement</span>
            </button>
          </div>
        </div>

        {/* Historique des paiements */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Mon Historique</h3>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          
          <div className="p-0 flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Montant</th>
                  <th className="p-4 font-semibold">Méthode</th>
                  <th className="p-4 font-semibold">Statut</th>
                  <th className="p-4 font-semibold text-right">Reçu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <span className="block font-semibold text-gray-900">12/08/2026</span>
                    <span className="text-xs text-gray-500">Année 26-27</span>
                  </td>
                  <td className="p-4 font-bold text-gray-900">50 USD</td>
                  <td className="p-4">
                    <span className="inline-flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span className="text-sm font-medium text-gray-700">Orange</span>
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center space-x-1 bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-bold border border-yellow-200">
                      <Clock className="h-3 w-3" />
                      <span>En attente</span>
                    </span>
                  </td>
                  <td className="p-4 text-right text-sm text-gray-400 italic">
                    Génération...
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <span className="block font-semibold text-gray-900">15/07/2025</span>
                    <span className="text-xs text-gray-500">Année 25-26</span>
                  </td>
                  <td className="p-4 font-bold text-gray-900">50 USD</td>
                  <td className="p-4">
                    <span className="inline-flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      <span className="text-sm font-medium text-gray-700">M-Pesa</span>
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Validé</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">PDF</button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <span className="block font-semibold text-gray-900">10/05/2024</span>
                    <span className="text-xs text-gray-500">Année 24-25</span>
                  </td>
                  <td className="p-4 font-bold text-gray-900">50 USD</td>
                  <td className="p-4">
                    <span className="inline-flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm font-medium text-gray-700">Airtel</span>
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Validé</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">PDF</button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
