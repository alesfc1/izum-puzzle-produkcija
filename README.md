# Igrifikacija - Sestavljanka naslovnic

## Opis projekta

Spletna aplikacija za sestavljanje sestavljank iz naslovnic knjig v COBISS Plus. Uporabnik lahko izbere naslovnico, ki se razreže na manjše kose, ki jih nato premika in vrti, da sestavi izvirno sliko. Aplikacija je prilagojena za uporabo na različnih napravah, vključno z namiznimi računalniki, tablicami in pametnimi telefoni.

## Glavne značilnosti

- **Več težavnostnih nivojev**:
  - 2×2 (Zelo lahko)
  - 2×3 (Lahko)
  - 3×3 (Srednje)
  - 3×4 (Težje)
  - 4×4 (Težko)
  - 4×5 (Zelo težko)

- **Interaktivna igra**:
  - Povleci in spusti funkcionalnost
  - Vrtenje kosov s klikom/dotikom
  - Samodejno prilagajanje velikosti glede na napravo
  - Animirano obvestilo in zvočni efekt ob uspešni rešitvi
  - Možnost prikaza rešitve
  - Skupna statistika
  - Medalje za dobre rezultate
  
- **Sistem točkovanja**:
  - Točkovanje glede na: 
    - Težavnost
    - Čas reševanja
    - Uporabo prikaza rešitve
  - Shranjevanje preteklih rezultatov
  

## Tehnologije

- **Frontend**:
  - **Next.js** (React framework)
  - **TypeScript** za tipsko varno kodo
  - **Tailwind CSS** za stilizacijo
  - **Framer Motion** za animacije
  - **Radix UI** za dostopne komponente

- **Backend & Shramba**:
  - **Next.js API Routes** za strežniško logiko
  - **LocalStorage** za lokalno shranjevanje statistike

- **Orodja za razvoj**:
  - **Node.js**
  - **ESLint** in **Prettier** za kakovost kode
  - **Git** za upravljanje različic


## Navodila za zagon in vzpostavitev sistema

1. **Klonirajte repozitorij**
    ```bash
    git clone https://github.com/alesfc1/izum-puzzle-produkcija
    ```

2. **Premaknite se v mapo projekta**
    ```bash
    cd izum-gamification/puzzle-game
    ```

3. **Namestite odvisnosti**
    - Če uporabljate `npm`:
      ```bash
      npm install --legacy-peer-deps
      ```
      ali
      ```bash
      yarn install --legacy-peer-deps
      ```

5. **Zaženite razvojni strežnik**
    ```bash
    npm run dev
    ```
    ali
    ```bash
    yarn dev
    ```
    
7. **Odprite aplikacijo**
    - Obiščite [http://localhost:3000](http://localhost:3000) v vašem brskalniku.

## Kontakt

Za vprašanja, sodelovanja ali prispevke nas kontaktirajte na: dev.puzzlegame@outlook.com

