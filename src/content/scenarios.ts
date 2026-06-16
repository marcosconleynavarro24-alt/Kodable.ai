// "Is this you?" — lets an owner recognise themselves in one line. One concrete
// outcome per common business type. Keep it tight (4 items). Owner may edit.

export type Scenario = {
  icon: string; // Material Symbols name
  type: string; // the business type, in their words
  outcome: string; // one concrete outcome line
};

export const scenarios: Scenario[] = [
  {
    icon: "restaurant",
    type: "Restaurant / café",
    outcome:
      "Customers see your menu, book a table, and order — all from their phone.",
  },
  {
    icon: "content_cut",
    type: "Salon / clinic",
    outcome:
      "Clients book appointments themselves, day or night, and get reminders so they show up.",
  },
  {
    icon: "handyman",
    type: "Trades — builder, plumber, electrician",
    outcome:
      "Show your past work, and let people call or message you in one tap.",
  },
  {
    icon: "storefront",
    type: "Shop / retail",
    outcome: "Sell online, show what's in stock, and get found by people nearby.",
  },
];

export const scenariosHeadline = "Is this you?";
