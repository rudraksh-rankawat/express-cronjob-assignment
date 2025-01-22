# Express Cron Job Assignment

This project demonstrates a simple **Express.js** application with a **cron job** that periodically updates user authentication tokens stored in **MongoDB**.

---

## Testing Instructions

### 1. Run the Server
Start the application by running the following command:

```bash
npm run start
```

The server will run at:  
[http://localhost:3000](http://localhost:3000)

---

### 2. Test the Authentication Endpoint

#### Endpoint: 
**POST** `/auth/authenticate`

#### Description:
Authenticates a user or creates a new user with a token.

#### Request Body:
```json
{
  "username": "testuser"
}
```

#### Response:
```json
{
  "message": "User authenticated",
  "token": "randomly_generated_token"
}
```

#### Example Using `curl`:
```bash
curl -X POST http://localhost:3000/auth/authenticate \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser"}'
```

#### Verify:
- A new user is created in **MongoDB** if they do not already exist.
- A random token is returned in the response.

---

### 3. Verify the Cron Job

#### Schedule:
- Runs **every minute** (for testing purposes).

#### Functionality:
- Updates all user tokens in the database.
- Logs the **old** and **new** tokens in the console.

#### Expected Logs:
```yaml
Cron job started: Updating tokens
Token updated for user testuser
Old Token: a1b2c3d4e5f6g7h8
New Token: x9y8z7w6v5u4t3s2
Cron job completed: Tokens updated
```

#### Verify:
- Monitor the console for the above logs.
- Check **MongoDB** to confirm that tokens are updated for all users.

---

### Notes

1. **Cron Schedule for Production**:
   Update the cron schedule in `cron/tokenUpdater.js` to run **hourly** for production:
   ```javascript
   cron.schedule('0 * * * *', async () => {
     // Cron job logic
   });
   ```

2. **Environment Setup**:
   Ensure your `.env` file is correctly configured with the **DB_URI**.

   Example:
   ```env
   DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase
   ```

--- 
