# Keystatic CMS Authentication Guide

## 🔐 Overview

The Keystatic CMS admin panel is now protected with authentication. Users must log in before accessing the content management interface.

---

## 🚀 Quick Start

### Default Credentials (Development)

```
Username: admin
Password: admin123
```

**⚠️ IMPORTANT:** Change these before deploying to production!

---

## 🔧 How It Works

### Authentication Flow

1. User navigates to `/keystatic`
2. Authentication form is displayed
3. User enters username and password
4. Credentials are verified against environment variables
5. On success: User sees the Keystatic admin panel
6. On failure: Error message is displayed

### Session Management

- Authentication is stored in `sessionStorage`
- Session persists across page refreshes within the same browser tab
- Session expires when browser tab/window is closed
- User can manually logout using the "Logout" button

---

## ⚙️ Configuration

### Setting Custom Credentials

#### Option 1: Environment Variables (Recommended)

1. Create or edit `.env` file in project root:

```bash
VITE_ADMIN_USERNAME=your_username
VITE_ADMIN_PASSWORD=your_secure_password
```

2. Restart the development server:

```bash
npm run dev
```

#### Option 2: Production Environment Variables

For production deployment (Vercel, Netlify, etc.):

1. Go to your hosting platform's dashboard
2. Add environment variables:
   - `VITE_ADMIN_USERNAME`: Your desired username
   - `VITE_ADMIN_PASSWORD`: Your secure password
3. Redeploy the application

### Environment Files

- **`.env`** - Local development (gitignored, not committed)
- **`.env.example`** - Template file (committed to repo)
- **`.env.production`** - Production overrides (optional)

---

## 🔒 Security Considerations

### Current Implementation

**Security Level:** Basic (Development-friendly)

**Features:**
- ✅ Client-side authentication
- ✅ Environment variable credentials
- ✅ Session-based access
- ✅ Manual logout capability

**Limitations:**
- ⚠️ Client-side only (credentials visible in browser source)
- ⚠️ Not suitable for highly sensitive content
- ⚠️ No rate limiting or brute force protection
- ⚠️ No user management or roles

### Recommended Enhancements for Production

#### 1. Use Strong Passwords

Generate a strong password:
```bash
# Example: Use a password manager or generate random password
openssl rand -base64 32
```

#### 2. Add HTTPS

Ensure your production site uses HTTPS to encrypt credentials in transit.

#### 3. Implement Rate Limiting

Consider adding a rate limiting mechanism to prevent brute force attacks.

#### 4. Use GitHub Mode with OAuth

For better security, switch to GitHub mode:

```tsx
// keystatic.config.tsx
export default config({
  storage: {
    kind: 'github',
    repo: 'your-org/your-repo',
  },
  // ... rest of config
});
```

This uses GitHub's OAuth authentication instead of custom credentials.

---

## 🛡️ Advanced Security Setup (Optional)

### Backend Authentication (Most Secure)

For maximum security, implement server-side authentication:

1. **Add a backend API** (Express, Next.js API routes, etc.)
2. **Hash passwords** using bcrypt
3. **Use JWT tokens** for session management
4. **Store user data** in a database
5. **Implement RBAC** (Role-Based Access Control)

### Example Backend Implementation

```typescript
// Example: Express.js middleware
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Get user from database
  const user = await db.users.findOne({ username });
  
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});
```

---

## 📝 Usage

### For Developers

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to CMS:**
   ```
   http://localhost:8080/keystatic
   ```

3. **Login with default credentials:**
   - Username: `admin`
   - Password: `admin123`

4. **Manage content:**
   - View, edit, create, delete content
   - Changes saved to `content/` folder

5. **Logout:**
   - Click "Logout" button in top-right corner

### For Content Editors

1. **Access the CMS:**
   - Go to `https://yoursite.com/keystatic`
   - Enter your provided credentials

2. **Manage Content:**
   - Click content type in sidebar (Cats, Kittens, etc.)
   - Click "Create" to add new items
   - Click existing items to edit
   - Use "Delete" to remove items

3. **Security Tips:**
   - Never share your credentials
   - Log out when finished
   - Use a strong password
   - Don't work on public WiFi without VPN

---

## 🔄 Updating Credentials

### During Development

1. Edit `.env` file:
```bash
VITE_ADMIN_USERNAME=newusername
VITE_ADMIN_PASSWORD=newpassword
```

2. Restart dev server:
```bash
npm run dev
```

### In Production

1. Update environment variables in your hosting platform
2. Redeploy or restart the application
3. Notify content editors of the change

---

## 🧪 Testing Authentication

### Test Login

1. Navigate to `/keystatic`
2. Try invalid credentials - should see error
3. Try valid credentials - should access admin panel
4. Refresh page - should remain authenticated
5. Close tab and reopen - should require re-authentication

### Test Logout

1. Login successfully
2. Click "Logout" button
3. Should return to login screen
4. Try accessing admin without login - should be blocked

---

## 🐛 Troubleshooting

### "Invalid username or password" with correct credentials

**Solution:**
1. Check `.env` file has correct values
2. Restart dev server (`Ctrl+C`, then `npm run dev`)
3. Clear browser cache and try again
4. Check for typos (credentials are case-sensitive)

### Logout button not visible

**Solution:**
- Button is positioned in top-right corner
- Check browser zoom level
- Try different screen size/browser

### Authentication persists after closing browser

**Possible causes:**
- Browser's session restore feature
- Using "Restore tabs" on startup

**Solution:**
- Clear `sessionStorage` manually in browser DevTools
- Use incognito/private browsing for testing

### Can't access CMS after deployment

**Check:**
1. Environment variables are set in hosting platform
2. Variables are named correctly (with `VITE_` prefix)
3. Application was redeployed after adding variables
4. Check browser console for errors

---

## 📊 Component Structure

```
src/
├── components/
│   └── auth/
│       └── AuthGuard.tsx          # Authentication wrapper
├── pages/
│   └── KeystaticAdmin.tsx         # CMS page (now wrapped with AuthGuard)
└── App.tsx                        # Route configuration
```

### AuthGuard Component

**Props:**
- `children`: React node to protect

**State:**
- `isAuthenticated`: Whether user is logged in
- `username`: Current username input
- `password`: Current password input
- `error`: Error message to display
- `isLoading`: Loading state during authentication

**Methods:**
- `handleLogin`: Validates credentials and grants access
- `handleLogout`: Clears session and returns to login

---

## 🎨 Customization

### Styling the Login Form

Edit `src/components/auth/AuthGuard.tsx`:

```tsx
// Change card width
<Card className="w-full max-w-md"> // Change max-w-md

// Change colors
<div className="bg-primary/10"> // Change primary color

// Add branding
<CardHeader>
  <img src="/logo.png" alt="Logo" />
  <CardTitle>Your Company CMS</CardTitle>
</CardHeader>
```

### Adding Additional Security

```tsx
// Add lockout after failed attempts
const [failedAttempts, setFailedAttempts] = useState(0);
const MAX_ATTEMPTS = 3;

const handleLogin = (e: FormEvent) => {
  if (failedAttempts >= MAX_ATTEMPTS) {
    setError('Too many failed attempts. Please try again later.');
    return;
  }
  // ... rest of login logic
  
  if (invalidCredentials) {
    setFailedAttempts(prev => prev + 1);
  }
};
```

---

## 📚 Related Files

- `src/components/auth/AuthGuard.tsx` - Authentication component
- `src/pages/KeystaticAdmin.tsx` - Protected CMS page
- `.env` - Environment variables (local)
- `.env.example` - Environment variables template
- `keystatic.config.tsx` - CMS configuration

---

## ✅ Best Practices

1. **Never commit `.env` file** to version control
2. **Use strong passwords** in production
3. **Change default credentials** immediately
4. **Document credentials** securely (password manager)
5. **Rotate passwords** periodically
6. **Use HTTPS** in production
7. **Consider OAuth** for multi-user scenarios
8. **Monitor access logs** if available

---

## 🚀 Next Steps

1. ✅ Authentication is now active
2. ⏭️ Change default credentials
3. ⏭️ Test login/logout functionality
4. ⏭️ Deploy to production with secure credentials
5. ⏭️ Consider implementing GitHub OAuth for production

---

**Last Updated:** October 14, 2025  
**Security Level:** Basic (Development-Ready)  
**Production Ready:** ⚠️ Change credentials first!
