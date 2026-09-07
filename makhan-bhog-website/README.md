# Makhan Bhog Sweets and Pizza King — Website

## GitHub Pages par live karne ka tareeka
1. Is poore folder ko apne GitHub repository mein upload/push kar dein
   (sab files root mein rahni chahiye — `index.html` root mein hona zaroori hai).
2. Repository ke **Settings → Pages** mein jaayein.
3. "Source" mein apni main branch (jaise `main`) chunein aur Save karein.
4. 1-2 minute mein aapki website `https://<username>.github.io/<repo-name>/` par live ho jayegi.

## Menu mein dish add/edit/remove karna
Menu poori tarah `data/menu-data.js` file se chalta hai — website ke design ko
chhue bina aap iss ek file se sab kuch control kar sakte hain:

1. GitHub par `data/menu-data.js` file kholein.
2. Pencil (edit) icon par click karein.
3. File ke sabse upar diye gaye instructions ke hisaab se apni dish add,
   edit, ya remove karein.
4. Neeche "Commit changes" dabayein.
5. 1-2 minute mein website apne aap update ho jayegi.

Har dish is format mein hai:
```js
{ name: "Dish Ka Naam", note: "Chhoti detail", price: "₹100" }
```

## Order Now → WhatsApp system
Menu ke har dish ke saath ek "Order Now" button hai. Agar dish ke multiple
size/weight options hain (jaise pizza ka Small/Medium/Large, ya mithai ka
250g/500g/1kg), customer pehle wo chunta hai. Phir form khulta hai (naam,
mobile, address, quantity, note) — aur chahe to ek tap mein apni **live
location** bhi bhej sakta hai (delivery mein aasani ke liye). Form submit
karte hi WhatsApp khul jaata hai order ki poori details ke saath
pre-filled — customer ko bas "Send" dabana hota hai.

Order kis WhatsApp number par jaaye, yeh `js/order-modal.js` file ke
sabse upar `ORDER_WHATSAPP_NUMBER` mein set hai (abhi 8081456316 hai).
Number badalne ke liye bas wahi ek line edit karein.

**Live location** browser ki apni permission se li jaati hai — customer
ko allow karna padega, aur yeh feature sirf HTTPS (jaise GitHub Pages)
par kaam karta hai, seedha file khol kar preview karne par nahi.

## Real photos add karna (jab available ho)
Kuch jagah (mithai counter, dukaan ki baithne ki jagah) aapki di gayi
asli photos lagi hain. Kuch jagah (Pizza Oven, Team) abhi bhi
flat-illustration hai kyunki un cheezon ki photo nahi mili — jab aapke
paas ho, unhe `assets/photos/` folder mein daal kar concerned
`<div class="illustration-box">...</div>` block ko
`<img src="assets/photos/apni-photo.jpg" alt="...">` se replace kar dein
(index.html, about.html files mein).

## Placeholder details jo confirm karni hain
- **Opening hours** — Contact page par abhi "10:00 AM – 10:00 PM" hai,
  apna sahi samay daal dein.
- **Menu prices** — sample rates hain jahan aapne exact price nahi diya tha,
  `data/menu-data.js` mein confirm/update kar lein.
