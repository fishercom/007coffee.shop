# GEMINI.md - Interaction Rules and Troubleshooting

This document outlines important rules for interacting with the Gemini CLI agent and provides troubleshooting steps for common issues.

## 1. File Permissions

The Gemini CLI agent operates directly on your filesystem. If you encounter errors related to file access, writing, or deleting, it's likely a permissions issue.

**Troubleshooting Steps:**

*   **Do Not Change Permissions:** The agent must not change file permissions when editing files. If file permission issues arise, the user is responsible for resolving them.

## 2. General Interaction Guidelines

*   **Absolute Paths:** Always provide absolute paths when referring to files or directories.
*   **Clear Instructions:** Be as specific as possible with your requests.
*   **Context is Key:** If you're referring to a specific part of the code or a problem, provide relevant context (e.g., file content, error messages).
*   **Verification:** After I make changes, always verify them by running tests or checking the application.
*   **Server Restart:** If styles or configuration changes don't appear, try restarting your development server and performing a hard refresh in your browser.
