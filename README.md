# 🛡️ Domain Availability Monitoring & Notification Script

A lightweight Node.js tool that checks the availability and status of a domain using **WHOIS** and **RDAP** lookups.  
The script also includes a **health-check mode** to verify that your monitoring and notification pipeline is working correctly.

Notifications are delivered via **Discord Webhooks** and **Telegram Bot API**, with optional **log rotation** for long-running tasks.

---

## 🚀 Features

- 🔍 WHOIS domain status check
- 🌐 RDAP lookup using `https://rdap.org/domain/`
- 🧪 System test mode (checks WHOIS, RDAP, Discord & Telegram alerts)
- 🔔 Notifications
  - Discord Webhook
  - Telegram Bot
- 🧩 Modular Node.js architecture
- 🟦 Fully ESM-compatible
- ⚙️ Cron/PM2-ready

---

## 📦 Requirements

This is a **Node.js project**.

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
DOMAIN=yourdomain.com

# Domain for system test mode
TEST_DOMAIN="example.com"

# Discord
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/xxxx"

# Telegram
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="your_chat_id"

# Retry settings
MAX_RETRIES=4
RETRY_DELAY_MS=30000
```

---

## 🧪 Health Check Mode

This verifies:

- WHOIS query
- RDAP query
- Discord notification
- Telegram notification

Run:

```bash
node test
```

---

## 🔍 RDAP Integration

RDAP is queried via:

```
https://rdap.org/domain/<domain>
```

Collected information may include:

- Domain status
- Registrar info
- Nameservers
- Expiration dates
- Existence / nonexistence state

RDAP is modern and standardized, making it ideal for availability checks.

---

## 📁 Project Structure

```
.
├── helpers/
│   ├── notify.js            # Discord + Telegram notifications
│   ├── rdap.js              # RDAP lookup logic
│   ├── whois.js             # WHOIS lookup logic
├── tests/
│   ├── test-available.js    # Test check and notify systems
├── .env
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── app.js                   # Main entry script
├── package.json
└── README.md
```

---

## ▶️ Usage

### Run CRON Job:

```bash
npm start
```

### Run system test mode:

```bash
node test
```

---

## 🛠️ Recommended Extensions

Enhance your script with:

- Multi-domain monitoring
- Email alerting (Resend API)
- Slack notifications
- Database logging
- Automatic domain purchase hooks

---

## 🤝 Contributing

PRs and issues are welcome.

---

## 📄 License

MIT License — free for personal and commercial use.
