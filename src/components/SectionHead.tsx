import Icon, { type IconName } from "./Icon";

// Shared section header: kicker (with icon) + title + optional lead.
export default function SectionHead({
  kicker,
  kickerIcon,
  title,
  lead,
  center = false,
}: {
  kicker: string;
  kickerIcon: IconName;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={`sec-head${center ? " center" : ""}`}>
      <span className="sec-kicker">
        <Icon name={kickerIcon} />
        {kicker}
      </span>
      <h2 className="sec-title">{title}</h2>
      {lead ? <p className="sec-lead">{lead}</p> : null}
    </div>
  );
}
