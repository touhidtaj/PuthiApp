<div align="center">

# পুঁথি

### A quiet place to read.

A calm, distraction-free PDF reader for Android.<br>
The tradition of Bangla reading, in a modern light.

**[⬇ Download the APK](https://github.com/touhidtaj/PuthiApp/releases/latest/download/puthi-v1.0.apk)** &nbsp;·&nbsp; **[Visit the website](https://touhidtaj.github.io/PuthiApp/)**

`Android 10+` &nbsp; `No internet permission` &nbsp; `No ads · No accounts · No tracking` &nbsp; `Free for everyone, forever`

</div>

---

## Why পুঁথি

*Puthi* is the old word for a handwritten book, something you keep close and return to. This app tries to give a PDF the same quiet respect.

Most PDF readers are crowded with menus, accounts and adverts. পুঁথি does one thing: it finds the PDFs on your phone, lays them out like a bookshelf, and opens them full-screen with nothing in the way.

## What it does

- **Finds your books.** One scan, and every PDF on your phone is on the shelf.
- **Reads without noise.** Full-screen, with the controls hidden until you need them.
- **Remembers you.** Highlight in your own colours, pin notes anywhere, leave remarks on a page.
- **Takes your notes with you.** Export them as Word or PDF.
- **Speaks your language.** English, বাংলা and العربية, with proper typography for each.
- **Stays private.** It has no internet permission, so your books, notes and highlights cannot leave your phone. See [how to check](#your-privacy-and-how-to-check-it-yourself).

## Your privacy, and how to check it yourself

পুঁথি is built so that your books **cannot** leave your phone, not merely so that it promises they won't. Every claim below can be checked.

| Claim | Why it is true | How you can check |
|---|---|---|
| **It cannot use the internet.** | The app does not ask for the INTERNET permission, so Android itself blocks any network connection. The reader also switches off web loading inside the app. | Open the file `app/src/main/AndroidManifest.xml` in the app repository: the list of permissions has no INTERNET. A free permission-viewer app, such as the open-source App Manager, shows the same for the installed APK. (Android's own Permissions screen does not list Internet for any app, so the absence there proves nothing.) |
| **No tracking, accounts or adverts.** | There is no analytics code, no login and no ad code. The only web address in the app is the link to the creator's Facebook page. It opens in your browser, and only when you tap it. | Read `app/src/main/assets/index.html` in the app repository. |
| **Your files stay where they are.** | The app reads your PDFs in place. Your notes and highlights are stored in the app's private storage on your phone. | Clear the app's data or uninstall, and they are gone. They exist nowhere else. |
| **Nothing is sent in the background.** | With no internet permission, there is nothing to send with. | Settings → Network & internet → Data usage (the name varies by phone) should show 0 for পুঁথি. |
| **The app cannot be backed up to a cloud.** | Android backup is switched off for this app. | Open the app's manifest file in the app repository: `allowBackup="false"`. |

### The one permission worth understanding

পুঁথি asks for **"All files access"**. It is needed for one reason: to find the PDFs scattered across your phone's folders. Android offers no narrower way to scan for them. The app uses it only to list and read PDF files, and it can't send anything anywhere. If you prefer, you can refuse it and open PDFs one at a time with "Open file" instead.

### Where the APK comes from

The APK is built automatically by GitHub from the public source code, using a published recipe (`.github/workflows/build-apk.yml`). No one assembles it by hand. To confirm your download is the genuine one, compare its SHA-256 checksum with the one listed here for the current version. A file manager or a "hash checker" app on your phone can show it.

```
Current version: SHA-256 will be listed here after each release
```

### About this website

The website shows how many times the APK has been downloaded. That number comes from GitHub, which counts downloads of the release file. The website has no analytics and no cookies, and the **app** has no internet permission and never contacts anyone.

### What this does not promise

পুঁথি is a personal project, not an audited product, and it is not on the Play Store. It is installed from outside the store, which is why Android shows a warning for any such app. Only install it from the links on this page and the creator's own pages. If you ever see পুঁথি offered elsewhere, treat it as a copy and don't trust it.

## Install

1. Open the **[download link](https://github.com/touhidtaj/PuthiApp/releases/latest/download/puthi-v1.0.apk)** on your Android phone.
2. Chrome may warn that the file "can harm your device". This appears for every app installed outside the Play Store. Choose **Download anyway**.
3. Open the file. If asked, allow **Install unknown apps** for your browser.
4. Open পুঁথি and allow file access, so it can find your PDFs.

## The story

পুঁথি is a one-person project, designed and built by **Touhidul Islam**, a designer from Bangladesh, out of a simple wish: a reader that treats Bangla text with care and then gets out of the way.

- Facebook: [facebook.com/TouhidDesigner](https://www.facebook.com/TouhidDesigner/)

## Built with

A small Android shell around a single-page web reader. PDF rendering by [PDF.js](https://mozilla.github.io/pdf.js/) (Apache-2.0). Typography in Inter and Noto Serif Bengali (SIL Open Font License).

---

<div align="center">

© 2026 Touhidul Islam. All rights reserved.

*Made with care, in Bangladesh.*

</div>
