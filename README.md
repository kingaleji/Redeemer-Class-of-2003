# Redeemer Nur/Prim. Sch. — Class of 2003 Website

A colourful, easy-to-navigate two-page site: a **Home** page with the class
group photo, and an **Alumni Directory** with searchable profile cards for
all 100 classmates.

## How to view it
Just open `index.html` in any web browser (double-click it). No install,
no server needed. Use the nav bar to jump to the Alumni Directory.

## What's in the folder
- `index.html` — homepage (class photo, stats, nostalgia section)
- `alumni.html` — the alumni directory (search + filter + profile cards)
- `style.css` — all the styling (colours, fonts, layout)
- `script.js` — search/filter logic and the pop-up profile modal
- `data.js` — **all 100 classmate records live here**

## ⚠️ Important: the data is currently placeholder
Since I didn't have your classmates' real details, `data.js` is filled with
100 realistic **sample** records (names, cities, hobbies, memories, contact
info, social links) so you can see the full site working end to end. Cartoon
avatar images are used as photo placeholders.

**To make this your real class site, edit `data.js`.** Each classmate is one
entry that looks like this:

```js
{
  "id": 1,
  "name": "Jane Okafor",
  "avatarSeed": "JaneOkafor1",      // only used if "photo" is not set
  "photo": "",                        // paste a real photo URL here to replace the placeholder avatar
  "city": "Lagos, Nigeria",
  "hobbies": ["Photography", "Cooking"],
  "memory": "Her favourite primary school memory goes here.",
  "email": "jane@example.com",
  "phone": "+234 8012345678",
  "socials": {
    "instagram": "https://instagram.com/janeokafor",
    "twitter": "https://x.com/janeokafor",
    "facebook": "https://facebook.com/janeokafor",
    "linkedin": "https://linkedin.com/in/janeokafor"
  }
}
```

**To add a real photo:** upload the photo somewhere it gets a public URL
(e.g. Google Drive "anyone with link" share, Imgur, Cloudinary, or your own
image hosting), then paste that URL into the `"photo"` field. If `"photo"`
is left empty, the site automatically shows a colourful cartoon avatar
instead — so nothing breaks while you're still collecting pictures.

**To remove a social link:** just delete that line from `"socials"` (or
leave the whole object as `{}` if someone has no socials yet — the card
will show "No social links added yet.").

You can edit `data.js` in any text editor (Notepad, VS Code, etc.) — it's
plain text, no coding tools required, just be careful to keep the commas
and quotation marks in place.

## Swapping in the real class photo
Open `index.html`, find this line near the top of the `<header>` section:

```html
<img src="https://api.dicebear.com/7.x/shapes/svg?seed=RedeemerClassOf2003..." alt="...">
```

Replace the `src="..."` with the URL (or local filename, e.g. `class-photo.jpg`,
if you drop the image file into this same folder) of your real class photo.

## Customizing colours
All colours are defined once at the top of `style.css` under `:root`,
so you can retheme the whole site by changing a handful of hex values there.

## Hosting it online (optional)
This is a fully static site, so it can be hosted for free on services like
GitHub Pages, Netlify, or Vercel — just upload this whole folder.
