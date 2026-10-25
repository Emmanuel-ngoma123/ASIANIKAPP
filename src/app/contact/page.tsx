"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation d'un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contactez-nous</h1>
          <p className="mt-4 text-lg text-gray-500">
            Une question, une suggestion ou une demande de partenariat ? N'hésitez pas à nous écrire.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-md">
              <h3 className="text-lg font-medium text-green-800">Message envoyé !</h3>
              <p className="mt-2 text-sm text-green-700">
                Merci de nous avoir contactés. Nous avons bien reçu votre message et un numéro de suivi vous a été envoyé par e-mail. Nous vous répondrons dans les plus brefs délais.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm font-medium text-green-600 hover:text-green-500"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 bg-gray-50 p-8 rounded-xl border border-gray-100">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet *</label>
                <div className="mt-1">
                  <input type="text" name="name" id="name" required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-white border" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail *</label>
                <div className="mt-1">
                  <input type="email" name="email" id="email" required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-white border" />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet du message *</label>
                <div className="mt-1">
                  <select id="subject" name="subject" required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-white border">
                    <option value="">Sélectionnez un sujet</option>
                    <option value="information">Demande d'information</option>
                    <option value="partnership">Partenariat</option>
                    <option value="volunteer">Volontariat</option>
                    <option value="complaint">Réclamation</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
                <div className="mt-1">
                  <textarea id="message" name="message" rows={4} required
                    className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-white border"></textarea>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting}
                  className="w-full inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors">
                  {isSubmitting ? "Envoi en cours..." : (
                    <>
                      Envoyer le message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
