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
  // Shown when the API answers 429: the visitor's slot is fine, they just sent
  // too many requests. Kept here (not server-side) because the API collapses
  // locales to en/es, while every site locale has its own copy in this file.
  errorRateLimited: string;
  loading: string;
  noSlots: string;
  // Custom time entry: the "another time" chip opens a typed HH:MM field.
  otherTime: string;
  customLabel: string;
  customPh: string;
  customHint: string; // {from} and {to} are replaced with the day's window
  customInvalid: string;
  customPast: string;
  customTaken: string;
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
  errorRateLimited: "Too many attempts just now. Wait a minute and try again, or message us on WhatsApp.",
  loading: "Loading available times…",
  noSlots: "No free times right now. Message us on WhatsApp and we'll sort it out.",
  otherTime: "Another time",
  customLabel: "Type a time that suits you",
  customPh: "e.g. 16:45",
  customHint: "Any time from {from} to {to}, Spain time, in 15-minute steps.",
  customInvalid: "Enter a time between {from} and {to}, like 16:45.",
  customPast: "That time has already passed today. Pick a later one.",
  customTaken: "That time overlaps another booking. Pick one 15 minutes away.",
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
  errorRateLimited: "Demasiados intentos ahora mismo. Espera un minuto y vuelve a probar, o escríbenos por WhatsApp.",
  loading: "Cargando horas disponibles…",
  noSlots: "Ahora mismo no hay horas libres. Escríbenos por WhatsApp y lo organizamos.",
  otherTime: "Otra hora",
  customLabel: "Escribe la hora que te venga bien",
  customPh: "p. ej. 16:45",
  customHint: "Cualquier hora de {from} a {to}, hora de España, en tramos de 15 minutos.",
  customInvalid: "Escribe una hora entre {from} y {to}, como 16:45.",
  customPast: "Esa hora ya ha pasado hoy. Elige una más tarde.",
  customTaken: "Esa hora se solapa con otra reserva. Elige una 15 minutos más lejos.",
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
  errorRateLimited: "Trop de tentatives pour le moment. Attendez une minute et réessayez, ou écrivez-nous sur WhatsApp.",
  loading: "Chargement des horaires disponibles…",
  noSlots: "Aucun créneau libre pour le moment. Écrivez-nous sur WhatsApp et on s'arrange.",
  otherTime: "Autre horaire",
  customLabel: "Indiquez l'heure qui vous convient",
  customPh: "p. ex. 16:45",
  customHint: "N'importe quelle heure de {from} à {to}, heure d'Espagne, par tranches de 15 minutes.",
  customInvalid: "Saisissez une heure entre {from} et {to}, par exemple 16:45.",
  customPast: "Cette heure est déjà passée aujourd'hui. Choisissez-en une plus tard.",
  customTaken: "Cette heure chevauche une autre réservation. Choisissez-en une à 15 minutes d'écart.",
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
  errorRateLimited: "Gerade zu viele Versuche. Warte kurz und versuch es nochmal, oder schreib uns auf WhatsApp.",
  loading: "Verfügbare Zeiten werden geladen…",
  noSlots: "Gerade keine Zeiten frei. Schreib uns auf WhatsApp, wir finden einen Termin.",
  otherTime: "Andere Uhrzeit",
  customLabel: "Gib eine Uhrzeit ein, die dir passt",
  customPh: "z. B. 16:45",
  customHint: "Jede Uhrzeit von {from} bis {to}, spanische Zeit, in 15-Minuten-Schritten.",
  customInvalid: "Gib eine Uhrzeit zwischen {from} und {to} ein, zum Beispiel 16:45.",
  customPast: "Diese Uhrzeit ist heute schon vorbei. Wähl eine spätere.",
  customTaken: "Diese Uhrzeit überschneidet sich mit einer anderen Buchung. Wähl eine mit 15 Minuten Abstand.",
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
  errorRateLimited: "Troppi tentativi in questo momento. Aspetta un minuto e riprova, o scrivici su WhatsApp.",
  loading: "Caricamento orari disponibili…",
  noSlots: "Al momento non ci sono orari liberi. Scrivici su WhatsApp e lo sistemiamo.",
  otherTime: "Un altro orario",
  customLabel: "Scrivi l'orario che preferisci",
  customPh: "es. 16:45",
  customHint: "Qualsiasi orario dalle {from} alle {to}, ora spagnola, a intervalli di 15 minuti.",
  customInvalid: "Inserisci un orario tra le {from} e le {to}, per esempio 16:45.",
  customPast: "Quest'ora è già passata oggi. Scegline una più tardi.",
  customTaken: "Quest'orario si sovrappone a un'altra prenotazione. Scegline uno a 15 minuti di distanza.",
};

const content: Record<Locale, BookingCopy> = { en, es, fr, de, it };

export function getBooking(locale: Locale): BookingCopy {
  return content[locale];
}
