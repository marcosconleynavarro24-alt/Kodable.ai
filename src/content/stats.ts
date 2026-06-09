export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 12, suffix: "+", label: "Projects shipped" },
  { value: 98, label: "Avg. Lighthouse score" },
  { value: 8, label: "Weeks avg. delivery" },
  { value: 100, suffix: "%", label: "On-time launches" },
];
