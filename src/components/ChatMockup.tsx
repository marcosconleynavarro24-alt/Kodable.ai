import type { SiteContent } from "@/content/site";
import Icon from "./Icon";

// The hero phone: a WhatsApp-style booking conversation. Decorative (the whole
// card carries an aria-label describing it); inner bubbles are aria-hidden.
export default function ChatMockup({ chat }: { chat: SiteContent["chat"] }) {
  return (
    <div className="phone reveal" role="img" aria-label={chat.alt}>
      <div className="chat-head">
        <span className="avatar" aria-hidden="true">
          {chat.name.charAt(0)}
        </span>
        <div>
          <div className="name">{chat.name}</div>
          <div className="status">{chat.status}</div>
        </div>
      </div>
      <div className="chat-body" aria-hidden="true">
        <div className="bubble them b1">
          {chat.them1} <span className="time">19:42</span>
        </div>
        <div className="bubble you b2">
          {chat.you1} <span className="time">19:42</span>
        </div>
        <div className="bubble them b3">
          {chat.them2} <span className="time">19:43</span>
        </div>
        <div className="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="chat-input" aria-hidden="true">
        <span>{chat.inputPlaceholder}</span>
        <span className="send">
          <Icon name="send" />
        </span>
      </div>
    </div>
  );
}
