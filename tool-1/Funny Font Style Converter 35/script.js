// Unicode character mappings for 50 different font styles
const fontStyles = {
    // Basic styles
    bold: {
        name: "Bold",
        description: "Thick, heavy text",
        convert: (text) => convertWithMap(text, {
            a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", 
            k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", 
            u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
            A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", 
            K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", 
            U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
            0: "𝟬", 1: "𝟭", 2: "𝟮", 3: "𝟯", 4: "𝟰", 5: "𝟱", 6: "𝟲", 7: "𝟳", 8: "𝟴", 9: "𝟵"
        })
    },
    italic: {
        name: "Italic",
        description: "Slanted, cursive-like text",
        convert: (text) => convertWithMap(text, {
            a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", 
            k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", 
            u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻",
            A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", 
            K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", 
            U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡"
        })
    },
    boldItalic: {
        name: "Bold Italic",
        description: "Thick and slanted text",
        convert: (text) => convertWithMap(text, {
            a: "𝙖", b: "𝙗", c: "𝙘", d: "𝙙", e: "𝙚", f: "𝙛", g: "𝙜", h: "𝙝", i: "𝙞", j: "𝙟", 
            k: "𝙠", l: "𝙡", m: "𝙢", n: "𝙣", o: "𝙤", p: "𝙥", q: "𝙦", r: "𝙧", s: "𝙨", t: "𝙩", 
            u: "𝙪", v: "𝙫", w: "𝙬", x: "𝙭", y: "𝙮", z: "𝙯",
            A: "𝘼", B: "𝘽", C: "𝘾", D: "𝘿", E: "𝙀", F: "𝙁", G: "𝙂", H: "𝙃", I: "𝙄", J: "𝙅", 
            K: "𝙆", L: "𝙇", M: "𝙈", N: "𝙉", O: "𝙊", P: "𝙋", Q: "𝙌", R: "𝙍", S: "𝙎", T: "𝙏", 
            U: "𝙐", V: "𝙑", W: "𝙒", X: "𝙓", Y: "𝙔", Z: "𝙕"
        })
    },
    script: {
        name: "Script/Cursive",
        description: "Elegant handwriting style",
        convert: (text) => convertWithMap(text, {
            a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "𝑒", f: "𝒻", g: "𝑔", h: "𝒽", i: "𝒾", j: "𝒿", 
            k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "𝑜", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", 
            u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏",
            A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥", 
            K: "𝒦", L: "ℒ", M: "ℳ", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", 
            U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵"
        })
    },
    boldScript: {
        name: "Bold Script",
        description: "Thick elegant handwriting",
        convert: (text) => convertWithMap(text, {
            a: "𝓪", b: "𝓫", c: "𝓬", d: "𝓭", e: "𝓮", f: "𝓯", g: "𝓰", h: "𝓱", i: "𝓲", j: "𝓳", 
            k: "𝓴", l: "𝓵", m: "𝓶", n: "𝓷", o: "𝓸", p: "𝓹", q: "𝓺", r: "𝓻", s: "𝓼", t: "𝓽", 
            u: "𝓾", v: "𝓿", w: "𝔀", x: "𝔁", y: "𝔂", z: "𝔃",
            A: "𝓐", B: "𝓑", C: "𝓒", D: "𝓓", E: "𝓔", F: "𝓕", G: "𝓖", H: "𝓗", I: "𝓘", J: "𝓙", 
            K: "𝓚", L: "𝓛", M: "𝓜", N: "𝓝", O: "𝓞", P: "𝓟", Q: "𝓠", R: "𝓡", S: "𝓢", T: "𝓣", 
            U: "𝓤", V: "𝓥", W: "𝓦", X: "𝓧", Y: "𝓨", Z: "𝓩"
        })
    },
    fraktur: {
        name: "Fraktur",
        description: "Gothic blackletter style",
        convert: (text) => convertWithMap(text, {
            a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", 
            k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", 
            u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷",
            A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍", 
            K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗", 
            U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ"
        })
    },
    boldFraktur: {
        name: "Bold Fraktur",
        description: "Thick gothic blackletter",
        convert: (text) => convertWithMap(text, {
            a: "𝖆", b: "𝖇", c: "𝖈", d: "𝖉", e: "𝖊", f: "𝖋", g: "𝖌", h: "𝖍", i: "𝖎", j: "𝖏", 
            k: "𝖐", l: "𝖑", m: "𝖒", n: "𝖓", o: "𝖔", p: "𝖕", q: "𝖖", r: "𝖗", s: "𝖘", t: "𝖙", 
            u: "𝖚", v: "𝖛", w: "𝖜", x: "𝖝", y: "𝖞", z: "𝖟",
            A: "𝕬", B: "𝕭", C: "𝕮", D: "𝕯", E: "𝕰", F: "𝕱", G: "𝕲", H: "𝕳", I: "𝕴", J: "𝕵", 
            K: "𝕶", L: "𝕷", M: "𝕸", N: "𝕹", O: "𝕺", P: "𝕻", Q: "𝕼", R: "𝕽", S: "𝕾", T: "𝕿", 
            U: "𝖀", V: "𝖁", W: "𝖂", X: "𝖃", Y: "𝖄", Z: "𝖅"
        })
    },
    doubleStruck: {
        name: "Double Struck",
        description: "Mathematical bold style",
        convert: (text) => convertWithMap(text, {
            a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", 
            k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", 
            u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
            A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", 
            K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", 
            U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ",
            0: "𝟘", 1: "𝟙", 2: "𝟚", 3: "𝟛", 4: "𝟜", 5: "𝟝", 6: "𝟞", 7: "𝟟", 8: "𝟠", 9: "𝟡"
        })
    },
    monospace: {
        name: "Monospace",
        description: "Fixed-width typewriter text",
        convert: (text) => convertWithMap(text, {
            a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", 
            k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", 
            u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
            A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", 
            K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", 
            U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
            0: "𝟶", 1: "𝟷", 2: "𝟸", 3: "𝟹", 4: "𝟺", 5: "𝟻", 6: "𝟼", 7: "𝟽", 8: "𝟾", 9: "𝟿"
        })
    },
    sans: {
        name: "Sans-Serif",
        description: "Clean, modern text without serifs",
        convert: (text) => convertWithMap(text, {
            a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", 
            k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", 
            u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
            A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", 
            K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", 
            U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
        })
    },
    boldSans: {
        name: "Bold Sans-Serif",
        description: "Thick clean modern text",
        convert: (text) => convertWithMap(text, {
            a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", 
            k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", 
            u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
            A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", 
            K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", 
            U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭"
        })
    },
    italicSans: {
        name: "Italic Sans-Serif",
        description: "Slanted clean modern text",
        convert: (text) => convertWithMap(text, {
            a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", 
            k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", 
            u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻",
            A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", 
            K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", 
            U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡"
        })
    },
    boldItalicSans: {
        name: "Bold Italic Sans",
        description: "Thick slanted clean text",
        convert: (text) => convertWithMap(text, {
            a: "𝙖", b: "𝙗", c: "𝙘", d: "𝙙", e: "𝙚", f: "𝙛", g: "𝙜", h: "𝙝", i: "𝙞", j: "𝙟", 
            k: "𝙠", l: "𝙡", m: "𝙢", n: "𝙣", o: "𝙤", p: "𝙥", q: "𝙦", r: "𝙧", s: "𝙨", t: "𝙩", 
            u: "𝙪", v: "𝙫", w: "𝙬", x: "𝙭", y: "𝙮", z: "𝙯",
            A: "𝘼", B: "𝘽", C: "𝘾", D: "𝘿", E: "𝙀", F: "𝙁", G: "𝙂", H: "𝙃", I: "𝙄", J: "𝙅", 
            K: "𝙆", L: "𝙇", M: "𝙈", N: "𝙉", O: "𝙊", P: "𝙋", Q: "𝙌", R: "𝙍", S: "𝙎", T: "𝙏", 
            U: "𝙐", V: "𝙑", W: "𝙒", X: "𝙓", Y: "𝙔", Z: "𝙕"
        })
    },
    // Fun styles
    bubble: {
        name: "Bubble",
        description: "Rounded, comic-style text",
        convert: (text) => convertWithMap(text, {
            a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ", 
            k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", 
            u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ",
            A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ", 
            K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ", 
            U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ",
            0: "⓪", 1: "①", 2: "②", 3: "③", 4: "④", 5: "⑤", 6: "⑥", 7: "⑦", 8: "⑧", 9: "⑨"
        })
    },
    blackBubble: {
        name: "Black Bubble",
        description: "Filled rounded text",
        convert: (text) => convertWithMap(text, {
            a: "🅐", b: "🅑", c: "🅒", d: "🅓", e: "🅔", f: "🅕", g: "🅖", h: "🅗", i: "🅘", j: "🅙", 
            k: "🅚", l: "🅛", m: "🅜", n: "🅝", o: "🅞", p: "🅟", q: "🅠", r: "🅡", s: "🅢", t: "🅣", 
            u: "🅤", v: "🅥", w: "🅦", x: "🅧", y: "🅨", z: "🅩",
            A: "🅐", B: "🅑", C: "🅒", D: "🅓", E: "🅔", F: "🅕", G: "🅖", H: "🅗", I: "🅘", J: "🅙", 
            K: "🅚", L: "🅛", M: "🅜", N: "🅝", O: "🅞", P: "🅟", Q: "🅠", R: "🅡", S: "🅢", T: "🅣", 
            U: "🅤", V: "🅥", W: "🅦", X: "🅧", Y: "🅨", Z: "🅩"
        })
    },
    smallCaps: {
        name: "Small Caps",
        description: "Tiny uppercase letters",
        convert: (text) => convertWithMap(text.toLowerCase(), {
            a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", 
            k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "ꜱ", t: "ᴛ", 
            u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
        })
    },
    wide: {
        name: "Wide/Spaced",
        description: "Extra space between characters",
        convert: (text) => text.split('').join(' ')
    },
    upsideDown: {
        name: "Upside Down",
        description: "Flips text upside down",
        convert: (text) => {
            const upsideDownMap = {
                a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", 
                k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", 
                u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
                A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ", 
                K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", 
                U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
                0: "0", 1: "Ɩ", 2: "ᄅ", 3: "Ɛ", 4: "ㄣ", 5: "ϛ", 6: "9", 7: "ㄥ", 8: "8", 9: "6",
                ".": "˙", ",": "'", "'": ",", '"': "„", "!": "¡", "?": "¿", "(": ")", ")": "(", 
                "[": "]", "]": "[", "{": "}", "}": "{", "<": ">", ">": "<", "&": "⅋", "_": "‾"
            };
            return convertWithMap(text, upsideDownMap).split('').reverse().join('');
        }
    },
    strikethrough: {
        name: "Strikethrough",
        description: "Text with a line through it",
        convert: (text) => text.split('').map(char => char + '\u0336').join('').replace(/\u0336$/, '')
    },
    underline: {
        name: "Underline",
        description: "Text with a line below",
        convert: (text) => text.split('').map(char => char + '\u0332').join('').replace(/\u0332$/, '')
    },
    slashThrough: {
        name: "Slash Through",
        description: "Text with diagonal slashes",
        convert: (text) => text.split('').map(char => char + '\u0337').join('').replace(/\u0337$/, '')
    },
    doubleUnderline: {
        name: "Double Underline",
        description: "Text with two lines below",
        convert: (text) => text.split('').map(char => char + '\u0333').join('').replace(/\u0333$/, '')
    },
    dotted: {
        name: "Dotted",
        description: "Text with dots below",
        convert: (text) => text.split('').map(char => char + '\u0323').join('').replace(/\u0323$/, '')
    },
    circled: {
        name: "Circled",
        description: "Text inside circles",
        convert: (text) => convertWithMap(text, {
            a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ", 
            k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", 
            u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ",
            A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ", 
            K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ", 
            U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ",
            0: "⓪", 1: "①", 2: "②", 3: "③", 4: "④", 5: "⑤", 6: "⑥", 7: "⑦", 8: "⑧", 9: "⑨"
        })
    },
    parenthesized: {
        name: "Parenthesized",
        description: "Letters inside parentheses",
        convert: (text) => convertWithMap(text.toLowerCase(), {
            a: "⒜", b: "⒝", c: "⒞", d: "⒟", e: "⒠", f: "⒡", g: "⒢", h: "⒣", i: "⒤", j: "⒥", 
            k: "⒦", l: "⒧", m: "⒨", n: "⒩", o: "⒪", p: "⒫", q: "⒬", r: "⒭", s: "⒮", t: "⒯", 
            u: "⒰", v: "⒱", w: "⒲", x: "⒳", y: "⒴", z: "⒵"
        })
    },
    squared: {
        name: "Squared",
        description: "Text inside squares",
        convert: (text) => convertWithMap(text, {
            a: "🄰", b: "🄱", c: "🄲", d: "🄳", e: "🄴", f: "🄵", g: "🄶", h: "🄷", i: "🄸", j: "🄹", 
            k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿", q: "🅀", r: "🅁", s: "🅂", t: "🅃", 
            u: "🅄", v: "🅅", w: "🅆", x: "🅇", y: "🅈", z: "🅉",
            A: "🄰", B: "🄱", C: "🄲", D: "🄳", E: "🄴", F: "🄵", G: "🄶", H: "🄷", I: "🄸", J: "🄹", 
            K: "🄺", L: "🄻", M: "🄼", N: "🄽", O: "🄾", P: "🄿", Q: "🅀", R: "🅁", S: "🅂", T: "🅃", 
            U: "🅄", V: "🅅", W: "🅆", X: "🅇", Y: "🅈", Z: "🅉"
        })
    },
    fullwidth: {
        name: "Fullwidth",
        description: "Wide East Asian style",
        convert: (text) => convertWithMap(text, {
            a: "ａ", b: "ｂ", c: "ｃ", d: "ｄ", e: "ｅ", f: "ｆ", g: "ｇ", h: "ｈ", i: "ｉ", j: "ｊ", 
            k: "ｋ", l: "ｌ", m: "ｍ", n: "ｎ", o: "ｏ", p: "ｐ", q: "ｑ", r: "ｒ", s: "ｓ", t: "ｔ", 
            u: "ｕ", v: "ｖ", w: "ｗ", x: "ｘ", y: "ｙ", z: "ｚ",
            A: "Ａ", B: "Ｂ", C: "Ｃ", D: "Ｄ", E: "Ｅ", F: "Ｆ", G: "Ｇ", H: "Ｈ", I: "Ｉ", J: "Ｊ", 
            K: "Ｋ", L: "Ｌ", M: "Ｍ", N: "Ｎ", O: "Ｏ", P: "Ｐ", Q: "Ｑ", R: "Ｒ", S: "Ｓ", T: "Ｔ", 
            U: "Ｕ", V: "Ｖ", W: "Ｗ", X: "Ｘ", Y: "Ｙ", Z: "Ｚ",
            0: "０", 1: "１", 2: "２", 3: "３", 4: "４", 5: "５", 6: "６", 7: "７", 8: "８", 9: "９",
            "!": "！", "?": "？", ".": "．", ",": "，", ":": "：", ";": "；", "'": "＇", '"': "＂",
            "(": "（", ")": "）", "[": "［", "]": "］", "{": "｛", "}": "｝", "<": "＜", ">": "＞"
        })
    },
    subscript: {
        name: "Subscript",
        description: "Small lowered text",
        convert: (text) => convertWithMap(text.toLowerCase(), {
            a: "ₐ", b: "ᵦ", c: "𝒸", d: "𝒹", e: "ₑ", f: "𝒻", g: "𝓰", h: "ₕ", i: "ᵢ", j: "ⱼ", 
            k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", q: "ᵩ", r: "ᵣ", s: "ₛ", t: "ₜ", 
            u: "ᵤ", v: "ᵥ", w: "𝓌", x: "ₓ", y: "ᵧ", z: "𝓏",
            0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉",
            "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎"
        })
    },
    superscript: {
        name: "Superscript",
        description: "Small raised text",
        convert: (text) => convertWithMap(text.toLowerCase(), {
            a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ", 
            k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", q: "ᑫ", r: "ʳ", s: "ˢ", t: "ᵗ", 
            u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ",
            0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹",
            "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾"
        })
    },
    greek: {
        name: "Greek Letters",
        description: "Mathematical Greek symbols",
        convert: (text) => convertWithMap(text.toLowerCase(), {
            a: "α", b: "β", c: "ψ", d: "δ", e: "ε", f: "φ", g: "γ", h: "η", i: "ι", j: "ξ", 
            k: "κ", l: "λ", m: "μ", n: "ν", o: "ο", p: "π", q: "θ", r: "ρ", s: "σ", t: "τ", 
            u: "υ", v: "ω", w: "ς", x: "χ", y: "υ", z: "ζ"
        })
    },
    greekBold: {
        name: "Bold Greek",
        description: "Thick Greek letters",
        convert: (text) => convertWithMap(text.toLowerCase(), {
            a: "𝛂", b: "𝛃", c: "𝛙", d: "𝛅", e: "𝛆", f: "𝛗", g: "𝛄", h: "𝛈", i: "𝛊", j: "𝛏", 
            k: "𝛋", l: "𝛌", m: "𝛍", n: "𝛎", o: "𝛐", p: "𝛑", q: "𝛉", r: "𝛒", s: "𝛔", t: "𝛕", 
            u: "𝛖", v: "𝛚", w: "𝛓", x: "𝛘", y: "𝛖", z: "𝛇"
        })
    },
    greekItalic: {
        name: "Italic Greek",
        description: "Slanted Greek letters",
        convert: (text) => convertWithMap(text.toLowerCase(), {
            a: "𝛼", b: "𝛽", c: "𝜓", d: "𝛿", e: "𝜀", f: "𝜑", g: "𝛾", h: "𝜂", i: "𝜄", j: "𝜉", 
            k: "𝜅", l: "𝜆", m: "𝜇", n: "𝜈", o: "𝜊", p: "𝜋", q: "𝜃", r: "𝜌", s: "𝜎", t: "𝜏", 
            u: "𝜐", v: "𝜔", w: "𝜍", x: "𝜒", y: "𝜐", z: "𝜁"
        })
    },
    // More decorative styles
    medieval: {
        name: "Medieval",
        description: "Old English style",
        convert: (text) => convertWithMap(text, {
            A: "𝕬", B: "𝕭", C: "𝕮", D: "𝕯", E: "𝕰", F: "𝕱", G: "𝕲", H: "𝕳", I: "𝕴", J: "𝕵", 
            K: "𝕶", L: "𝕷", M: "𝕸", N: "𝕹", O: "𝕺", P: "𝕻", Q: "𝕼", R: "𝕽", S: "𝕾", T: "𝕿", 
            U: "𝖀", V: "𝖁", W: "𝖂", X: "𝖃", Y: "𝖄", Z: "𝖅",
            a: "𝖆", b: "𝖇", c: "𝖈", d: "𝖉", e: "𝖊", f: "𝖋", g: "𝖌", h: "𝖍", i: "𝖎", j: "𝖏", 
            k: "𝖐", l: "𝖑", m: "𝖒", n: "𝖓", o: "𝖔", p: "𝖕", q: "𝖖", r: "𝖗", s: "𝖘", t: "𝖙", 
            u: "𝖚", v: "𝖛", w: "𝖜", x: "𝖝", y: "𝖞", z: "𝖟"
        })
    },
    runic: {
        name: "Runic",
        description: "Ancient Norse letters",
        convert: (text) => convertWithMap(text.toUpperCase(), {
            A: "ᚨ", B: "ᛒ", C: "ᚲ", D: "ᛞ", E: "ᛖ", F: "ᚠ", G: "ᚷ", H: "ᚺ", I: "ᛁ", J: "ᛃ", 
            K: "ᚴ", L: "ᛚ", M: "ᛗ", N: "ᚾ", O: "ᛟ", P: "ᛈ", Q: "ᛩ", R: "ᚱ", S: "ᛊ", T: "ᛏ", 
            U: "ᚢ", V: "ᚡ", W: "ᚹ", X: "ᛪ", Y: "ᚤ", Z: "ᛉ"
        })
    },
    morse: {
        name: "Morse Code",
        description: "Dots and dashes",
        convert: (text) => {
            const morseMap = {
                a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", 
                i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", 
                q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", 
                y: "-.--", z: "--..",
                A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", 
                I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", 
                Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", 
                Y: "-.--", Z: "--..",
                0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 
                6: "-....", 7: "--...", 8: "---..", 9: "----.",
                ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--", 
                "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...", 
                ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-", 
                '"': ".-..-.", "$": "...-..-", "@": ".--.-.", " ": "/"
            };
            return text.split('').map(char => morseMap[char] || char).join(' ');
        }
    },
    braille: {
        name: "Braille",
        description: "Tactile writing system",
        convert: (text) => convertWithMap(text.toLowerCase(), {
            a: "⠁", b: "⠃", c: "⠉", d: "⠙", e: "⠑", f: "⠋", g: "⠛", h: "⠓", i: "⠊", j: "⠚", 
            k: "⠅", l: "⠇", m: "⠍", n: "⠝", o: "⠕", p: "⠏", q: "⠟", r: "⠗", s: "⠎", t: "⠞", 
            u: "⠥", v: "⠧", w: "⠺", x: "⠭", y: "⠽", z: "⠵",
            0: "⠴", 1: "⠂", 2: "⠆", 3: "⠒", 4: "⠲", 5: "⠢", 6: "⠖", 7: "⠶", 8: "⠦", 9: "⠔"
        })
    },
    // Symbolic styles
    arrows: {
        name: "Arrow Letters",
        description: "Letters made of arrows",
        convert: (text) => convertWithMap(text.toUpperCase(), {
            A: "🄐", B: "🄑", C: "🄒", D: "🄓", E: "🄔", F: "🄕", G: "🄖", H: "🄗", I: "🄘", J: "🄙", 
            K: "🄚", L: "🄛", M: "🄜", N: "🄝", O: "🄞", P: "🄟", Q: "🄠", R: "🄡", S: "🄢", T: "🄣", 
            U: "🄤", V: "🄥", W: "🄦", X: "🄧", Y: "🄨", Z: "🄩"
        })
    },
    mathBold: {
        name: "Math Bold",
        description: "Mathematical bold symbols",
        convert: (text) => convertWithMap(text, {
            A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", 
            K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", 
            U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
            a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", 
            k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", 
            u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳"
        })
    },
    mathScript: {
        name: "Math Script",
        description: "Mathematical script symbols",
        convert: (text) => convertWithMap(text, {
            A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥", 
            K: "𝒦", L: "ℒ", M: "ℳ", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", 
            U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵",
            a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "ℯ", f: "𝒻", g: "ℊ", h: "𝒽", i: "𝒾", j: "𝒿", 
            k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "ℴ", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", 
            u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏"
        })
    },
    mathFraktur: {
        name: "Math Fraktur",
        description: "Mathematical gothic symbols",
        convert: (text) => convertWithMap(text, {
            A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍", 
            K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗", 
            U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ",
            a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", 
            k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", 
            u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷"
        })
    },
    mathDouble: {
        name: "Math Double-Struck",
        description: "Mathematical double-struck symbols",
        convert: (text) => convertWithMap(text, {
            A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", 
            K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", 
            U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ",
            a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", 
            k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", 
            u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫"
        })
    },
    // More decorative styles
    inverted: {
        name: "Inverted",
        description: "White text on black background",
        convert: (text) => {
            const invertedMap = {
                a: "🅰", b: "🅱", c: "🅲", d: "🅳", e: "🅴", f: "🅵", g: "🅶", h: "🅷", i: "🅸", j: "🅹", 
                k: "🅺", l: "🅻", m: "🅼", n: "🅽", o: "🅾", p: "🅿", q: "🆀", r: "🆁", s: "🆂", t: "🆃", 
                u: "🆄", v: "🆅", w: "🆆", x: "🆇", y: "🆈", z: "🆉",
                A: "🅰", B: "🅱", C: "🅲", D: "🅳", E: "🅴", F: "🅵", G: "🅶", H: "🅷", I: "🅸", J: "🅹", 
                K: "🅺", L: "🅻", M: "🅼", N: "🅽", O: "🅾", P: "🅿", Q: "🆀", R: "🆁", S: "🆂", T: "🆃", 
                U: "🆄", V: "🆅", W: "🆆", X: "🆇", Y: "🆈", Z: "🆉",
                0: "⓿", 1: "❶", 2: "❷", 3: "❸", 4: "❹", 5: "❺", 6: "❻", 7: "❼", 8: "❽", 9: "❾"
            };
            return convertWithMap(text, invertedMap);
        }
    },
    circledNegative: {
        name: "Circled Negative",
        description: "White letters in black circles",
        convert: (text) => convertWithMap(text, {
            a: "🅐", b: "🅑", c: "🅒", d: "🅓", e: "🅔", f: "🅕", g: "🅖", h: "🅗", i: "🅘", j: "🅙", 
            k: "🅚", l: "🅛", m: "🅜", n: "🅝", o: "🅞", p: "🅟", q: "🅠", r: "🅡", s: "🅢", t: "🅣", 
            u: "🅤", v: "🅥", w: "🅦", x: "🅧", y: "🅨", z: "🅩",
            A: "🅐", B: "🅑", C: "🅒", D: "🅓", E: "🅔", F: "🅕", G: "🅖", H: "🅗", I: "🅘", J: "🅙", 
            K: "🅚", L: "🅛", M: "🅜", N: "🅝", O: "🅞", P: "🅟", Q: "🅠", R: "🅡", S: "🅢", T: "🅣", 
            U: "🅤", V: "🅥", W: "🅦", X: "🅧", Y: "🅨", Z: "🅩"
        })
    },
    squaredNegative: {
        name: "Squared Negative",
        description: "White letters in black squares",
        convert: (text) => convertWithMap(text, {
            A: "🄰", B: "🄱", C: "🄲", D: "🄳", E: "🄴", F: "🄵", G: "🄶", H: "🄷", I: "🄸", J: "🄹", 
            K: "🄺", L: "🄻", M: "🄼", N: "🄽", O: "🄾", P: "🄿", Q: "🅀", R: "🅁", S: "🅂", T: "🅃", 
            U: "🅄", V: "🅅", W: "🅆", X: "🅇", Y: "🅈", Z: "🅉",
            a: "🄰", b: "🄱", c: "🄲", d: "🄳", e: "🄴", f: "🄵", g: "🄶", h: "🄷", i: "🄸", j: "🄹", 
            k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿", q: "🅀", r: "🅁", s: "🅂", t: "🅃", 
            u: "🅄", v: "🅅", w: "🅆", x: "🅇", y: "🅈", z: "🅉"
        })
    },
    regional: {
        name: "Regional Indicators",
        description: "Country flag letter symbols",
        convert: (text) => convertWithMap(text.toUpperCase(), {
            A: "🇦", B: "🇧", C: "🇨", D: "🇩", E: "🇪", F: "🇫", G: "🇬", H: "🇭", I: "🇮", J: "🇯", 
            K: "🇰", L: "🇱", M: "🇲", N: "🇳", O: "🇴", P: "🇵", Q: "🇶", R: "🇷", S: "🇸", T: "🇹", 
            U: "🇺", V: "🇻", W: "🇼", X: "🇽", Y: "🇾", Z: "🇿"
        })
    }
};

// Helper function to convert text using a character map
function convertWithMap(text, charMap) {
    return text.split('').map(char => {
        // Preserve emojis and characters not in the map
        if (charMap[char] === undefined || isEmoji(char)) {
            return char;
        }
        return charMap[char] || char;
    }).join('');
}

// Helper function to detect emojis
function isEmoji(char) {
    const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(char);
}

// DOM elements
const inputText = document.getElementById('inputText');
const stylesContainer = document.getElementById('stylesContainer');
const copyAllBtn = document.getElementById('copyAllBtn');
const clearBtn = document.getElementById('clearBtn');
const fallbackNotice = document.getElementById('fallbackNotice');

// Favorites (stored in localStorage)
let favorites = JSON.parse(localStorage.getItem('fontConverterFavorites')) || [];

// Initialize the app
function init() {
    // Generate style cards
    generateStyleCards();
    
    // Set up event listeners
    inputText.addEventListener('input', updateAllStyles);
    copyAllBtn.addEventListener('click', copyAllStyles);
    clearBtn.addEventListener('click', clearAll);
    
    // Show fallback notice if there are unsupported characters
    checkForUnsupportedChars();
}

// Generate all style cards
function generateStyleCards() {
    stylesContainer.innerHTML = '';
    
    // Create cards for each style
    Object.entries(fontStyles).forEach(([key, style]) => {
        const isFavorite = favorites.includes(key);
        const card = document.createElement('div');
        card.className = `bg-white border rounded-lg overflow-hidden ${isFavorite ? 'order-first border-2 border-indigo-500' : 'border-gray-200'}`;
        card.innerHTML = `
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="font-bold text-lg text-gray-800">${style.name}</h3>
                        <p class="text-sm text-gray-500">${style.description}</p>
                    </div>
                    <button class="favorite-btn p-1 rounded-full ${isFavorite ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-600'}" data-style="${key}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </button>
                </div>
                <div class="bg-gray-50 p-3 rounded mb-3 min-h-12 font-converted" id="${key}-output">Type something to see the result...</div>
                <button class="copy-btn w-full py-2 bg-gray-100 hover:bg-gray-200 rounded transition flex items-center justify-center gap-2" data-style="${key}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                </button>
            </div>
        `;
        stylesContainer.appendChild(card);
    });
    
    // Set up event listeners for copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const styleKey = e.target.getAttribute('data-style') || 
                            e.target.closest('.copy-btn').getAttribute('data-style');
            copyStyle(styleKey);
        });
    });
    
    // Set up event listeners for favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const styleKey = e.target.getAttribute('data-style') || 
                            e.target.closest('.favorite-btn').getAttribute('data-style');
            toggleFavorite(styleKey);
        });
    });
}

// Update all style outputs
function updateAllStyles() {
    const text = inputText.value;
    
    if (text.trim() === '') {
        Object.keys(fontStyles).forEach(key => {
            document.getElementById(`${key}-output`).textContent = 'Type something to see the result...';
        });
        return;
    }
    
    Object.entries(fontStyles).forEach(([key, style]) => {
        const converted = style.convert(text);
        document.getElementById(`${key}-output`).textContent = converted;
    });
    
    checkForUnsupportedChars();
}

// Copy a specific style to clipboard
function copyStyle(styleKey) {
    const output = document.getElementById(`${styleKey}-output`);
    const text = output.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show feedback
        const btn = document.querySelector(`.copy-btn[data-style="${styleKey}"]`);
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Copied!
        `;
        
        setTimeout(() => {
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                Copy
            `;
        }, 2000);
    });
}

// Copy all styles to clipboard
function copyAllStyles() {
    let allText = '';
    
    Object.entries(fontStyles).forEach(([key, style]) => {
        const converted = document.getElementById(`${key}-output`).textContent;
        allText += `${style.name}:\n${converted}\n\n`;
    });
    
    navigator.clipboard.writeText(allText.trim()).then(() => {
        // Show feedback
        copyAllBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Copied All!
        `;
        
        setTimeout(() => {
            copyAllBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                Copy All
            `;
        }, 2000);
    });
}

// Clear all inputs and outputs
function clearAll() {
    inputText.value = '';
    updateAllStyles();
}

// Toggle favorite status of a style
function toggleFavorite(styleKey) {
    const index = favorites.indexOf(styleKey);
    
    if (index === -1) {
        favorites.push(styleKey);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('fontConverterFavorites', JSON.stringify(favorites));
    generateStyleCards();
}

// Check for unsupported characters and show notice
function checkForUnsupportedChars() {
    const text = inputText.value;
    let hasUnsupported = false;
    
    // Check if any character isn't covered by at least one style
    if (text) {
        for (const char of text) {
            if (isEmoji(char)) continue; // Skip emojis
            
            let supported = false;
            for (const style of Object.values(fontStyles)) {
                const converted = style.convert(char);
                if (converted !== char) {
                    supported = true;
                    break;
                }
            }
            
            if (!supported) {
                hasUnsupported = true;
                break;
            }
        }
    }
    
    if (hasUnsupported) {
        fallbackNotice.classList.remove('hidden');
    } else {
        fallbackNotice.classList.add('hidden');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);