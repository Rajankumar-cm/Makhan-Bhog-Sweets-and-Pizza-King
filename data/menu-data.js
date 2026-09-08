/* ============================================================================
   MENU DATA — Makhan Bhog Sweets and Pizza King
   ============================================================================
   YEH FILE AAP GITHUB PAR SEEDHE EDIT KAR SAKTE HAIN — koi coding jaanne
   ki zaroorat nahi hai. Bas neeche diye gaye tareeke se copy-paste karke
   apni dish add/edit/remove kar sakte hain, "Commit changes" dabayen,
   aur website apne aap update ho jayegi (GitHub Pages par live hone ke
   1-2 minute baad).

   HAR DISH KA FORMAT — DO TAREEKE HAIN:
   ---------------------------------------
   TAREEKA 1 — Fixed price/size (pizza, garlic bread, fried rice, etc.):
     { name: "Dish Ka Naam", note: "Chhoti si detail", options: [
         { label: "Size/Portion ka naam", price: 149 }
     ]}

   - name    = dish ka naam
   - note    = chhoti detail line (ingredients waghera) — "" bhi likh sakte hain
   - options = ek list hai jisme har size/portion ka apna price hai:
       * Sirf EK price wali dish (jaise Garlic Bread) ke liye ek hi option
         rakhein, label ko "" (khali) rakh sakte hain:
           options: [ { label: "", price: 90 } ]
       * Small/Medium/Large wali pizza ke liye teen options:
           options: [
             { label: "Small", price: 149 },
             { label: "Medium", price: 249 },
             { label: "Large", price: 399 }
           ]
       * Kisi item mein Small nahi hai (sirf Medium/Large) to bas woh do
         hi options rakhein — jitne options honge utne hi customer ko
         website par dikhenge. Menu list mein sabse kam waali price
         "se shuru" ke saath dikhti hai; poori list Order Now dabane par
         dikhti hai.

   TAREEKA 2 — Weight ke hisaab se bikne wali cheezein (mithai):
     { name: "Dish Ka Naam", note: "Chhoti si detail", unit: "weight", pricePerKg: 550 }

   - unit: "weight" likhne se customer order karte waqt khud gram ya kg
     mein apni quantity daal sakta hai (jaise "250 gram" ya "1.5 kg"),
     aur price apne aap pricePerKg se calculate ho jaata hai. Menu list
     mein bas "₹550/kg" jaisa dikhta hai — saaf aur simple.

   NAYI DISH ADD KARNE KA TAREEKA:
   Jis category mein dish add karni hai, uske "items" list mein neeche
   jaisa ek naya block { } copy-paste karke apni details bhar dein, aur
   ek comma (,) se alag rakhein.

   DISH HATANE KA TAREEKA:
   Us dish ki poori { ... }, wali line delete kar dein.

   NAYI CATEGORY ADD KARNE KA TAREEKA:
   Neeche "categories" list mein ek naya block copy karke:
   - id          = ek chhota unique naam bina space ke, jaise "beverages"
   - title       = category ka naam jo dikhega
   - icon        = "mithai", "pizza", "fastfood" mein se koi ek chunein
   - description = category ke neeche ek chhoti line
   - items       = upar wale tareeke se dishes ki list

   Bas itna dhyan rakhein: har { } ke baad comma (,) lagana na bhoolein,
   aur "" (double quotes) ke andar hi text likhein.
   ============================================================================ */

const MENU_DATA = {
  categories: [
    {
      id: "mithai",
      title: "Mithai",
      icon: "mithai",
      description: "Khaalis ghee aur taaza mawa se banayi gayi, roz taazi. Order karte waqt gram ya kg mein quantity chunein.",
      items: [
        { name: "Kaju Katli", note: "Kaju se banayi gayi premium mithai", unit: "weight", pricePerKg: 550 },
        { name: "Gulab Jamun", note: "Garam garam, chashni mein doobe hue", unit: "weight", pricePerKg: 280 },
        { name: "Rasgulla", note: "Naram aur spongy, bangaali style", unit: "weight", pricePerKg: 260 },
        { name: "Khoya Barfi", note: "Khoye se banayi, halki elaichi ke saath", unit: "weight", pricePerKg: 480 },
        { name: "Motichoor Laddoo", note: "Boondi se bana, tyoharon ka favourite", unit: "weight", pricePerKg: 320 },
        { name: "Rasmalai", note: "Malaidar doodh mein bhige rasgulle", unit: "weight", pricePerKg: 340 },
        { name: "Peda", note: "Traditional khoya peda", unit: "weight", pricePerKg: 360 },
        { name: "Aur Bhi Mithaiyaan", note: "Tyohaar special aur seasonal varieties bhi available", options: [
          { label: "", price: "Dukaan par poochein" }
        ]}
      ]
    },
    {
      id: "makhani-pizza",
      title: "Makhani Pizza",
      icon: "pizza",
      description: "Small / Medium / Large — jo size chahiye chunein.",
      items: [
        { name: "Paneer Makhani", note: "Cheese, Spicy Paneer, Paprika, Capsicum, Onion", options: [
          { label: "Small", price: 149 }, { label: "Medium", price: 249 }, { label: "Large", price: 399 }
        ]},
        { name: "Farmhouse", note: "Pineapple, Onion, Capsicum, Black Olive", options: [
          { label: "Small", price: 149 }, { label: "Medium", price: 249 }, { label: "Large", price: 339 }
        ]},
        { name: "Fresh Veggie", note: "Cheese, Tomato, Capsicum, Onion, Sweet Corn", options: [
          { label: "Small", price: 149 }, { label: "Medium", price: 279 }, { label: "Large", price: 349 }
        ]},
        { name: "Makhani Supreme", note: "Cheese, Onion, Sweet Corn, Paneer, Paprika, Black Olive, Capsicum", options: [
          { label: "Small", price: 189 }, { label: "Medium", price: 299 }, { label: "Large", price: 399 }
        ]},
        { name: "Makhani Cheese Burst Supreme", note: "Cheese, Paneer, Capsicum, Onion, Sweet Corn, Paprika, Jalapeno, Olive", options: [
          { label: "Medium", price: 399 }, { label: "Large", price: 499 }
        ]}
      ]
    },
    {
      id: "schezwan-pizza",
      title: "Schezwan Pizza",
      icon: "pizza",
      description: "Small / Medium / Large — jo size chahiye chunein.",
      items: [
        { name: "Paneer Schezwan Pizza", note: "Cheese, Paneer, Paprika, Capsicum, Onion", options: [
          { label: "Small", price: 139 }, { label: "Medium", price: 249 }, { label: "Large", price: 349 }
        ]},
        { name: "Schezwan Lover", note: "Cheese, Paneer, Onion, Capsicum, Olive, Paprika", options: [
          { label: "Small", price: 149 }, { label: "Medium", price: 299 }, { label: "Large", price: 399 }
        ]},
        { name: "Tango Pizza", note: "Cheese, Paprika, Olive, Capsicum, Onion, Mushroom, Jalapeno", options: [
          { label: "Small", price: 159 }, { label: "Medium", price: 299 }, { label: "Large", price: 399 }
        ]},
        { name: "Schezwan Cheese Burst Supreme", note: "Paneer, Sweet Corn, Olive, Paprika, Capsicum", options: [
          { label: "Medium", price: 399 }, { label: "Large", price: 499 }
        ]}
      ]
    },
    {
      id: "peri-peri-pizza",
      title: "Peri-Peri Pizza",
      icon: "pizza",
      description: "Small / Medium / Large — jo size chahiye chunein.",
      items: [
        { name: "Peri-Peri Sauce Pizza", note: "Onion, Capsicum, Sweet Corn, Jalapeno", options: [
          { label: "Small", price: 139 }, { label: "Medium", price: 249 }, { label: "Large", price: 349 }
        ]},
        { name: "Peri-Delight", note: "Onion, Capsicum, Jalapeno, Sweet Corn, Paneer", options: [
          { label: "Small", price: 149 }, { label: "Medium", price: 249 }, { label: "Large", price: 349 }
        ]},
        { name: "Peri-Peri Paneer", note: "Onion, Olive, Spicy Paneer, Paprika, Capsicum", options: [
          { label: "Small", price: 159 }, { label: "Medium", price: 299 }, { label: "Large", price: 399 }
        ]},
        { name: "Peri-Peri Cheese Burst Supreme", note: "Paneer, Sweet Corn, Onion, Olive, Paprika, Capsicum", options: [
          { label: "Medium", price: 399 }, { label: "Large", price: 499 }
        ]}
      ]
    },
    {
      id: "tandoori-pizza",
      title: "Tandoori Pizza",
      icon: "pizza",
      description: "Small / Medium / Large — jo size chahiye chunein.",
      items: [
        { name: "Tandoori Sauce Pizza", note: "Onion, Capsicum, Sweet Corn, Jalapeno", options: [
          { label: "Small", price: 149 }, { label: "Medium", price: 299 }, { label: "Large", price: 399 }
        ]},
        { name: "Mexican Pizza", note: "Cheese, Mushroom, Paneer, Onion, Tomato, Jalapeno, Olive", options: [
          { label: "Small", price: 199 }, { label: "Medium", price: 349 }, { label: "Large", price: 449 }
        ]},
        { name: "Tandoori Paneer Pizza", note: "Onion, Olive, Paneer, Red Paprika, Capsicum", options: [
          { label: "Small", price: 189 }, { label: "Medium", price: 349 }, { label: "Large", price: 449 }
        ]},
        { name: "Tandoori Cheese Burst Supreme", note: "Paneer, Sweet Corn, Onion, Olive, Paprika, Capsicum, Jalapeno", options: [
          { label: "Medium", price: 419 }, { label: "Large", price: 525 }
        ]}
      ]
    },
    {
      id: "classic-pizza",
      title: "Classic Pizza",
      icon: "pizza",
      description: "Small / Medium / Large — jo size chahiye chunein.",
      items: [
        { name: "Margherita", note: "Cheese and Tomato", options: [
          { label: "Small", price: 79 }, { label: "Medium", price: 179 }, { label: "Large", price: 259 }
        ]},
        { name: "OCT", note: "Cheese, Onion, Capsicum, Tomato", options: [
          { label: "Small", price: 99 }, { label: "Medium", price: 189 }, { label: "Large", price: 289 }
        ]},
        { name: "Hawaiian Pineapple", note: "Cheese, Onion, Capsicum, Tomato", options: [
          { label: "Small", price: 119 }, { label: "Medium", price: 199 }, { label: "Large", price: 299 }
        ]},
        { name: "Cheese Mushroom", note: "Cheese, Mushroom, Sweet Corn, Black Olive", options: [
          { label: "Small", price: 119 }, { label: "Medium", price: 199 }, { label: "Large", price: 299 }
        ]},
        { name: "Cheese & Sweet Corn", note: "Cheese, Onion and Sweet Corn", options: [
          { label: "Small", price: 109 }, { label: "Medium", price: 199 }, { label: "Large", price: 299 }
        ]},
        { name: "Cheese & Paneer", note: "Cheese, Tomato, Paneer, Sweet Corn", options: [
          { label: "Small", price: 119 }, { label: "Medium", price: 209 }, { label: "Large", price: 299 }
        ]},
        { name: "Hot & Spicy", note: "Cheese, Capsicum, Jalapeno, Red Paprika", options: [
          { label: "Small", price: 119 }, { label: "Medium", price: 219 }, { label: "Large", price: 299 }
        ]},
        { name: "Spicy Paneer", note: "Cheese, Onion, Capsicum, Paneer, Red Paprika", options: [
          { label: "Small", price: 139 }, { label: "Medium", price: 219 }, { label: "Large", price: 329 }
        ]},
        { name: "Italiano Pizza", note: "Cheese, Onion, Black Olive, Jalapeno, Sweet Corn", options: [
          { label: "Small", price: 119 }, { label: "Medium", price: 209 }, { label: "Large", price: 319 }
        ]},
        { name: "Country Pizza", note: "Cheese, Onion, Tomato, Paneer, Paprika, Capsicum", options: [
          { label: "Small", price: 149 }, { label: "Medium", price: 269 }, { label: "Large", price: 359 }
        ]},
        { name: "Veg Supreme Pizza", note: "Cheese, Onion, Paneer, Capsicum, Black Olive, Sweet Corn", options: [
          { label: "Small", price: 149 }, { label: "Medium", price: 279 }, { label: "Large", price: 349 }
        ]},
        { name: "Hot Stone Pizza", note: "Cheese, Paneer, Capsicum, Black Olive, Red Paprika, Sweet Corn", options: [
          { label: "Small", price: 179 }, { label: "Medium", price: 299 }, { label: "Large", price: 399 }
        ]},
        { name: "Double Cheese Supreme", note: "Cheese, Onion, Capsicum, Red Paprika, Jalapeno, Paneer", options: [
          { label: "Small", price: 199 }, { label: "Medium", price: 349 }, { label: "Large", price: 449 }
        ]},
        { name: "Cheese Burst Supreme", note: "Cheese, Burst Extra Loaded, Paprika, Paneer, Olive, Sweet Corn, Jalapeno", options: [
          { label: "Medium", price: 399 }, { label: "Large", price: 499 }
        ]}
      ]
    },
    {
      id: "toppings",
      title: "Extra Toppings",
      icon: "pizza",
      description: "Apni pizza mein add karwayein — Small / Medium / Large ke hisaab se price.",
      items: [
        { name: "Extra Cheese", note: "Kisi bhi pizza mein add karwa sakte hain", options: [
          { label: "Small", price: 20 }, { label: "Medium", price: 30 }, { label: "Large", price: 45 }
        ]},
        { name: "Extra Veg", note: "Kisi bhi pizza mein add karwa sakte hain", options: [
          { label: "Small", price: 10 }, { label: "Medium", price: 20 }, { label: "Large", price: 30 }
        ]}
      ]
    },
    {
      id: "garlic-bread",
      title: "Garlic Bread",
      icon: "fastfood",
      description: "Crispy aur buttery, side mein try karein.",
      items: [
        { name: "Plain Garlic Bread", note: "", options: [{ label: "", price: 90 }] },
        { name: "Stuffed Garlic Bread", note: "", options: [{ label: "", price: 99 }] },
        { name: "Paneer Garlic Bread", note: "", options: [{ label: "", price: 149 }] }
      ]
    },
    {
      id: "fried-rice",
      title: "Fried Rice",
      icon: "fastfood",
      description: "Half ya Full portion mein available.",
      items: [
        { name: "Veg Fry Rice", note: "", options: [{ label: "Half", price: 40 }, { label: "Full", price: 60 }] },
        { name: "Paneer Fry Rice", note: "", options: [{ label: "Half", price: 60 }, { label: "Full", price: 80 }] },
        { name: "Mushroom Fry Rice", note: "", options: [{ label: "Half", price: 50 }, { label: "Full", price: 70 }] },
        { name: "Mix Fry Rice", note: "", options: [{ label: "Half", price: 70 }, { label: "Full", price: 99 }] },
        { name: "Sweet Corn Fry Rice", note: "", options: [{ label: "Half", price: 50 }, { label: "Full", price: 70 }] }
      ]
    },
    {
      id: "maggi",
      title: "Maggi",
      icon: "fastfood",
      description: "Chatpati maggi, turant taiyar.",
      items: [
        { name: "Masala Maggi", note: "", options: [{ label: "", price: 50 }] },
        { name: "Paneer Maggi", note: "", options: [{ label: "", price: 60 }] },
        { name: "Sweet Corn Maggi", note: "", options: [{ label: "", price: 70 }] },
        { name: "Cheese Maggi", note: "", options: [{ label: "", price: 89 }] },
        { name: "Mix Maggi", note: "", options: [{ label: "", price: 99 }] }
      ]
    },
    {
      id: "burger-dessert",
      title: "Burger, Dessert & Drinks",
      icon: "fastfood",
      description: "Kuch aur bhi mazedaar options.",
      items: [
        { name: "Veg Burger", note: "", options: [{ label: "", price: 50 }] },
        { name: "Paneer Burger", note: "", options: [{ label: "", price: 60 }] },
        { name: "Chocolava Cake", note: "", options: [{ label: "", price: 60 }] },
        { name: "Tea", note: "", options: [{ label: "", price: 10 }] },
        { name: "Coffee", note: "", options: [{ label: "", price: 20 }] }
      ]
    },
    {
      id: "fastfood",
      title: "Fast Food & Chaat",
      icon: "fastfood",
      description: "Samosa se dosa tak — jab bhi kuch chatpata khaane ka mann ho.",
      items: [
        { name: "Samosa (2 pcs)", note: "Crispy aur garam, chutney ke saath", options: [{ label: "", price: 20 }] },
        { name: "Masala Dosa", note: "Crispy dosa, aloo masale ke saath", options: [{ label: "", price: 90 }] },
        { name: "Plain Dosa", note: "Sambhar aur chutney ke saath", options: [{ label: "", price: 70 }] },
        { name: "Veg Chowmein", note: "Indo-Chinese style, thoda tikha", options: [{ label: "", price: 100 }] },
        { name: "Aur Bhi Snacks", note: "Naye items regularly add hote hain", options: [{ label: "", price: "Dukaan par poochein" }] }
      ]
    }
  ]
};
