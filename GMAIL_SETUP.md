# Tutorial: Using Gmail as Inbox for orders@007coffee.shop

Since a Google Workspace account (professional Gmail) has a cost, we will use a common free method to receive and send emails from your domain using your personal Gmail account.

## Step 1: Receiving Emails (Forwarding)
You need everything sent to `orders@007coffee.shop` to be forwarded to your personal Gmail address (e.g., `your-username@gmail.com`).

1.  **In your domain provider** (e.g., Cloudflare, Namecheap, GoDaddy):
    *   Look for the **Email Forwarding** or **Email Routing** option.
    *   Create a rule: `orders@007coffee.shop` -> `your-personal-gmail@gmail.com`.
    *   Verify that the MX records have been configured automatically.

## Step 2: Sending Emails from Gmail (Alias)
Now we will configure Gmail so you can reply as `orders@007coffee.shop` using the **Brevo** server.

1.  In your **personal Gmail**, go to **Settings** (gear icon) > **See all settings**.
2.  Go to the **Accounts and Import** tab.
3.  In the **Send mail as:** section, click **Add another email address**.
4.  A popup window will open:
    *   **Name**: The name customers will see (e.g., 007 Coffee Shop).
    *   **Email address**: `orders@007coffee.shop`.
    *   **Treat as an alias**: Leave it checked.
    *   Click **Next Step**.
5.  Configure the SMTP server:
    *   **SMTP Server**: `smtp-relay.brevo.com`
    *   **Port**: `587`
    *   **Username**: (Your Brevo login email - same as in .env).
    *   **Password**: (Your Brevo SMTP key - same as in .env).
    *   Select **Secured connection using TLS**.
    *   Click **Add Account**.
6.  Gmail will send a verification code to `orders@007coffee.shop`. Since you already configured forwarding in Step 1, the code will arrive in your Gmail inbox.
7.  Enter the code, and you're all set!

## Step 3: Testing
1.  Compose a new email in Gmail.
2.  In the **From:** field, you should now be able to select `orders@007coffee.shop`.
3.  Send an email to another account of yours to verify the sender appears correctly.

> [!TIP]
> In Gmail settings (Accounts and Import), you can check the option **"When replying to a message: Reply from the same address the message was sent to"** so you always use the shop's email when responding to customers.
