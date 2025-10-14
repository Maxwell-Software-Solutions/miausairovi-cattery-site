# 🔐 CMS Authentication - Quick Reference

## Access the CMS

1. **Start server:** `npm run dev`
2. **Open browser:** `http://localhost:8080/keystatic`
3. **Login with:**
   - Username: `admin`
   - Password: `admin123`

---

## Default Credentials

```
Username: admin
Password: admin123
```

**⚠️ Change these before deploying to production!**

---

## Change Credentials

### Edit `.env` file:

```bash
VITE_ADMIN_USERNAME=your_username
VITE_ADMIN_PASSWORD=your_secure_password
```

### Restart server:

```bash
npm run dev
```

---

## Features

✅ **Login Form** - Clean, professional authentication UI  
✅ **Session Management** - Stay logged in during browser session  
✅ **Logout Button** - Top-right corner of admin panel  
✅ **Error Handling** - Clear feedback on invalid credentials  
✅ **Environment Variables** - Easy credential management  

---

## Security Notes

### Current Setup (Development)
- Client-side authentication
- Good for: Development, personal projects, low-sensitivity content
- Credentials stored in `.env` (gitignored)

### Production Recommendations
1. **Change default credentials** immediately
2. **Use strong passwords** (20+ characters)
3. **Enable HTTPS** on your domain
4. **Consider GitHub OAuth** for multi-user access

---

## How It Works

```
User visits /keystatic
    ↓
AuthGuard checks sessionStorage
    ↓
If authenticated → Show Keystatic CMS
    ↓
If not → Show login form
    ↓
User enters credentials
    ↓
Validated against .env variables
    ↓
Success → Store in sessionStorage → Access granted
```

---

## Troubleshooting

**Login not working?**
1. Check `.env` file exists in project root
2. Verify credentials match exactly (case-sensitive)
3. Restart dev server: `Ctrl+C`, then `npm run dev`
4. Clear browser cache

**Can't see logout button?**
- It's in the top-right corner
- Try zooming out if hidden

**Session expired?**
- Close and reopen browser tab
- sessionStorage clears when tab closes

---

## File Locations

- **Auth Component:** `src/components/auth/AuthGuard.tsx`
- **CMS Page:** `src/pages/KeystaticAdmin.tsx`
- **Credentials:** `.env` (gitignored)
- **Template:** `.env.example` (in repo)
- **Full Guide:** `docs/cms/KEYSTATIC_AUTHENTICATION.md`

---

## Quick Tips

💡 **Development:** Use default credentials (`admin/admin123`)  
💡 **Production:** Generate strong password, store securely  
💡 **Team:** Each person gets unique credentials  
💡 **Security:** Never commit `.env` to version control  
💡 **Updates:** Change credentials regularly  

---

**Status:** ✅ Authentication Active  
**Last Updated:** October 14, 2025
