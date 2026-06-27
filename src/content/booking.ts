import type { Locale } from "@/i18n/config";

// UI copy for the interactive booking widget (BookingWidget.tsx). Day labels and
// slot availability come from the API; these are the static labels around them.
export interface BookingCopy {
  title: string;
  place: string;
  chooseDay: string;
  pickTime: string;
  name: string;
  namePh: string;
  email: string;
  emailPh: string;
  phone: string;
  phonePh: string;
  note: string;
  notePh: string;
  optional: string;
  confirm: string;
  confirming: string;
  reminder: string;
  successTitle: string;
  successBody: string;
  errorGeneric: string;
  loading: string;
  noSlots: string;
}

const en: BookingCopy = {
  title: "Book your free consultation",
  place: "Kodable.ai · 15 minutes, online",
  chooseDay: "Choose a day",
  pickTime: "Pick a time",
  name: "Full name",
  namePh: "e.g. Marco García",
  email: "Email",
  emailPh: "you@email.com",
  phone: "Phone",
  phonePh: "+34 600 000 000",
  note: "Anything we should know?",
  notePh: "A line about your business (optional)",
  optional: "optional",
  confirm: "Confirm booking",
  confirming: "Confirming…",
  reminder: "We'll send a reminder the day before.",
  successTitle: "You're booked!",
  successBody: "Check your email for the confirmation and a calendar invite, with a reminder the day before.",
  errorGeneric: "Something went wrong. Please try again, or message us on WhatsApp.",
  loading: "Loading available times…",
  noSlots: "No free times right now. Message us on WhatsApp and we'll sort it out.",
};

const es: BookingCopy = {
  title: "Reserva tu consulta gratis",
  place: "Kodable.ai · 15 minutos, online",
  chooseDay: "Elige un día",
  pickTime: "Elige una hora",
  name: "Nombre completo",
  namePh: "p. ej. Marco García",
  email: "Email",
  emailPh: "tu@email.com",
  phone: "Teléfono",
  phonePh: "+34 600 000 000",
  note: "¿Algo que debamos saber?",
  notePh: "Una línea sobre tu negocio (opcional)",
  optional: "opcional",
  confirm: "Confirmar reserva",
  confirming: "Confirmando…",
  reminder: "Te enviamos un recordatorio el día antes.",
  successTitle: "¡Reserva confirmada!",
  successBody: "Revisa tu email: te hemos enviado la confirmación y un evento para tu calendario, con recordatorio el día antes.",
  errorGeneric: "Algo ha fallado. Inténtalo de nuevo o escríbenos por WhatsApp.",
  loading: "Cargando horas disponibles…",
  noSlots: "Ahora mismo no hay horas libres. Escríbenos por WhatsApp y lo organizamos.",
};

const fr: BookingCopy = {
  title: "Réservez votre consultation gratuite",
  place: "Kodable.ai · 15 minutes, en ligne",
  chooseDay: "Choisissez un jour",
  pickTime: "Choisissez une heure",
  name: "Nom complet",
  namePh: "p. ex. Marco García",
  email: "Email",
  emailPh: "vous@email.com",
  phone: "Téléphone",
  phonePh: "+34 600 000 000",
  note: "Quelque chose à nous dire ?",
  notePh: "Une ligne sur votre activité (facultatif)",
  optional: "facultatif",
  confirm: "Confirmer la réservation",
  confirming: "Confirmation…",
  reminder: "Nous vous envoyons un rappel la veille.",
  successTitle: "C'est réservé !",
  successBody: "Consultez votre email : confirmation et invitation agenda envoyées, avec un rappel la veille.",
  errorGeneric: "Une erreur s'est produite. Réessayez ou écrivez-nous sur WhatsApp.",
  loading: "Chargement des horaires disponibles…",
  noSlots: "Aucun créneau libre pour le moment. Écrivez-nous sur WhatsApp et on s'arrange.",
};

const de: BookingCopy = {
  title: "Buch deine kostenlose Beratung",
  place: "Kodable.ai · 15 Minuten, online",
  chooseDay: "Wähl einen Tag",
  pickTime: "Wähl eine Uhrzeit",
  name: "Vollständiger Name",
  namePh: "z. B. Marco García",
  email: "E-Mail",
  emailPh: "du@email.com",
  phone: "Telefon",
  phonePh: "+34 600 000 000",
  note: "Sollten wir etwas wissen?",
  notePh: "Eine Zeile zu deinem Unternehmen (optional)",
  optional: "optional",
  confirm: "Buchung bestätigen",
  confirming: "Wird bestätigt…",
  reminder: "Wir schicken dir am Tag davor eine Erinnerung.",
  successTitle: "Gebucht!",
  successBody: "Schau in dein Postfach: Bestätigung und Kalendereinladung sind unterwegs, mit einer Erinnerung am Tag davor.",
  errorGeneric: "Etwas ist schiefgelaufen. Versuch es nochmal oder schreib uns auf WhatsApp.",
  loading: "Verfügbare Zeiten werden geladen…",
  noSlots: "Gerade keine Zeiten frei. Schreib uns auf WhatsApp, wir finden einen Termin.",
};

const it: BookingCopy = {
  title: "Prenota la tua consulenza gratuita",
  place: "Kodable.ai · 15 minuti, online",
  chooseDay: "Scegli un giorno",
  pickTime: "Scegli un orario",
  name: "Nome completo",
  namePh: "es. Marco García",
  email: "Email",
  emailPh: "tu@email.com",
  phone: "Telefono",
  phonePh: "+34 600 000 000",
  note: "C'è qualcosa che dovremmo sapere?",
  notePh: "Una riga sulla tua attività (facoltativo)",
  optional: "facoltativo",
  confirm: "Conferma prenotazione",
  confirming: "Conferma in corso…",
  reminder: "Ti inviamo un promemoria il giorno prima.",
  successTitle: "Prenotazione confermata!",
  successBody: "Controlla la tua email: ti abbiamo inviato la conferma e l'invito per il calendario, con promemoria il giorno prima.",
  errorGeneric: "Qualcosa è andato storto. Riprova o scrivici su WhatsApp.",
  loading: "Caricamento orari disponibili…",
  noSlots: "Al momento non ci sono orari liberi. Scrivici su WhatsApp e lo sistemiamo.",
};

const content: Record<Locale, BookingCopy> = { en, es, fr, de, it };

export function getBooking(locale: Locale): BookingCopy {
  return content[locale];
}
