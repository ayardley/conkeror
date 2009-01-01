/**
 * (C) Copyright 2008 Shawn Betts
 *
 * Use, modification, and distribution are subject to the terms specified in the
 * COPYING file.
**/


define_variable('wikipedia_webjumps_format', 'wikipedia-%s',
                "This variable controls the names of the webjumps defined "+
                "by the wikipedia-webjumps module.  It is a simple string "+
                "format spec.  The format code `%s' will be replaced by the "+
                "language code for the webjump.");


/**
 * define_wikipedia_webjumps defines webjumps for wikipedia in various
 * languages.  If called with no args, it will define webjumps for all
 * known languages.  When called with any number of language codes, it
 * will define webjumps for those language.  The language codes
 * correspond to the subdomains of wikipedia.com for each language.
 *
 * Examples:
 * define_wikipedia_webjumps("en"); // Makes a webjump to the English WP.
 * define_wikipedia_webjumps("en", "de", "fr"); // English, German and French
 * define_wikipedia_webjumps(); // All of the available Wikipedias.
 */
function define_wikipedia_webjumps() {
    var prefixes;
    if (arguments.length == 0)
        prefixes = [i for (i in wikipedia_webjumps)];
    else
        prefixes = Array.slice(arguments);
    for each (let i in prefixes) {
	let (rest = wikipedia_webjumps[i],
             name = string_format(wikipedia_webjumps_format, {s: i})) {
            define_webjump(name, "http://" + i + ".wikipedia.org/wiki/" + rest);
        };
    }
}

var wikipedia_webjumps = {
    "aa"       : "Special:Search?search=%s&go=Go",
    "ab"       : "%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Search?search=%s&go=%D0%9F%D0%B5%D1%80%D0%B5%D0%B9%D1%82%D0%B8",
    "af"       : "Spesiaal:Soek?search=%s&go=Wys",
    "ak"       : "Special:Search?search=%s&go=K%C9%94",
    "als"      : "Spezial:Suche?search=%s&go=Artikel",
    "am"       : "%E1%88%8D%E1%8B%A9:Search?search=%s&go=%E1%8A%A5%E1%8A%95%E1%88%82%E1%8B%B5%21",
    "an"       : "Espezial:Mirar?search=%s&go=Ir-ie",
    "ang"      : "Special:Search?search=%s&go=G%C4%81n",
    "ar"       : "%D8%AE%D8%A7%D8%B5:%D8%A8%D8%AD%D8%AB?search=%s&go=%D8%A7%D8%B0%D9%87%D8%A8",
    "arc"      : "Special:Search?search=%s&go=%DC%99%DC%A0",
    "as"       : "%E0%A6%AC%E0%A6%BF%E0%A6%B6%E0%A7%87%E0%A6%B7:Search?search=%s&go=%E0%A6%AF%E0%A6%BE%E0%A6%93%E0%A6%81%E0%A6%95",
    "ast"      : "Especial:Search?search=%s&go=Dir",
    "av"       : "%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Search?search=%s&go=%D0%9F%D0%B5%D1%80%D0%B5%D0%B9%D1%82%D0%B8",
    "ay"       : "Especial:Buscar?search=%s&go=Sara%C3%B1a",
    "az"       : "X%C3%BCsusi:Search?search=%s&go=G%C9%99tir",
    "ba"       : "%D0%AF%D1%80%D2%99%D0%B0%D0%BC%D1%81%D1%8B:Search?search=%s&go=%D0%9A%D2%AF%D1%81%D0%B5%D2%AF",
    "bar"      : "Spezial:Suche?search=%s&go=Artikl",
    "bcl"      : "Espesyal:Hanapon?search=%s&go=Duman%C3%A1n",
    "be"       : "%D0%90%D0%B4%D0%BC%D1%8B%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D0%B5:Search?search=%s&go=%D0%90%D1%80%D1%82%D1%8B%D0%BA%D1%83%D0%BB",
    "bg"       : "%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%BD%D0%B8:%D0%A2%D1%8A%D1%80%D1%81%D0%B5%D0%BD%D0%B5?search=%s&go=%D0%9E%D1%82%D0%B2%D0%B0%D1%80%D1%8F%D0%BD%D0%B5",
    "bh"       : "Special:Search?search=%s&go=Go",
    "bi"       : "Special:Search?search=%s&go=Go",
    "bm"       : "Special:Recherche?search=%s&go=Taa",
    "bn"       : "%E0%A6%AC%E0%A6%BF%E0%A6%B6%E0%A7%87%E0%A6%B7:Search?search=%s&go=%E0%A6%9A%E0%A6%B2%E0%A7%8B",
    "bo"       : "Special:Search?search=%s&go=%E0%BD%A6%E0%BD%BC%E0%BD%84%E0%BC%8B%E0%BC%8D",
    "bpy"      : "%E0%A6%AC%E0%A6%BF%E0%A6%B6%E0%A7%87%E0%A6%B7:Search?search=%s&go=%E0%A6%B9%E0%A6%BE%E0%A6%A4",
    "br"       : "Dibar:Klask?search=%s&go=Mont",
    "bs"       : "Posebno:Pretraga?search=%s&go=Idi",
    "bug"      : "Istimewa:Pencarian?search=%s&go=%E1%A8%92%E1%A8%95%E1%A8%9A",
    "bxr"      : "Special:Search?search=%s&go=Go",
    "ca"       : "Especial:Cerca?search=%s&go=V%C3%A9s-hi",
    "cdo"      : "Special:Search?search=%s&go=K%C3%B3%CC%A4",
    "ce"       : "%D0%91%D0%B0%D1%88%D1%85%D0%BE:Search?search=%s&go=%D0%94%D0%B5%D1%85%D1%8C%D0%B0%D0%B4%D0%BE%D1%85%D1%83",
    "ceb"      : "Special:Pangita?search=%s&go=Sige%21",
    "ch"       : "Special:Search?search=%s&go=H%C3%A5nao",
    "cho"      : "Special:Search?search=%s&go=Go",
    "chr"      : "Special:Search?search=%s&go=Go",
    "chy"      : "Special:Search?search=%s&go=Go",
    "co"       : "Special:Search?search=%s&go=And%C3%A0",
    "cr"       : "Special:Search?search=%s&go=Go",
    "crh"      : "Mahsus:Search?search=%s&go=Bar",
    "cs"       : "Speci%C3%A1ln%C3%AD:Search?search=%s&go=J%C3%ADt+na",
    "csb"      : "Specjaln%C3%B4:Search?search=%s&go=Bi%C3%B4j%21",
    "cu"       : "%D0%9D%D0%B0%D1%80%D0%BE%CC%81%D1%87%D1%8C%D0%BD%D0%B0:Search?search=%s&go=%D0%BF%D1%80%D1%A3%D0%B8%D0%B4%D0%B8%CC%81",
    "cv"       : "%D0%AF%D1%82%D0%B0%D1%80%D0%BB%C4%83:Search?search=%s&go=%D0%9A%D1%83%C3%A7",
    "cy"       : "Arbennig:Search?search=%s&go=Mynd",
    "da"       : "Speciel:S%C3%B8gning?search=%s&go=G%C3%A5+til",
    "de"       : "Spezial:Suche?search=%s&go=Artikel",
    "diq"      : "Special:Search?search=%s&go=%C5%9Eo",
    "dsb"      : "Specialne:Pyta%C5%9B?search=%s&go=Nastawk",
    "dv"       : "Special:Search?search=%s&go=Go",
    "dz"       : "Special:Search?search=%s&go=%E0%BD%A0%E0%BD%82%E0%BE%B1%E0%BD%BC%E0%BC%8D",
    "ee"       : "Special:Search?search=%s&go=Yi",
    "el"       : "%CE%95%CE%B9%CE%B4%CE%B9%CE%BA%CF%8C:%CE%91%CE%BD%CE%B1%CE%B6%CE%AE%CF%84%CE%B7%CF%83%CE%B7?search=%s&go=%CE%9C%CE%B5%CF%84%CE%AC%CE%B2%CE%B1%CF%83%CE%B7",
    "eml"      : "Speciale:Ricerca?search=%s&go=Vai",
    "en"       : "Special:Search?search=%s&go=Go",
    "eo"       : "Speciala:Ser%C4%89i?search=%s&go=Ek%21",
    "es"       : "Especial:Buscar?search=%s&go=Ir",
    "et"       : "Eri:Search?search=%s&go=Mine",
    "eu"       : "Berezi:Search?search=%s&go=Joan",
    "ext"      : "Special:Search?search=%s&go=Dil",
    "fa"       : "%D9%88%DB%8C%DA%98%D9%87:%D8%AC%D8%B3%D8%AA%D8%AC%D9%88?search=%s&go=%D8%A8%D8%B1%D9%88",
    "ff"       : "Special:Recherche?search=%s&go=Consulter",
    "fi"       : "Toiminnot:Haku?search=%s&go=Siirry",
    "fj"       : "Special:Search?search=%s&go=Lako",
    "fo"       : "Serstakur:Leita?search=%s&go=Far",
    "fr"       : "Special:Recherche?search=%s&go=Consulter",
    "frp"      : "Sp%C3%A8ci%C3%A2l:Recherche?search=%s&go=Alar",
    "fur"      : "Speci%C3%A2l:Ricercje?search=%s&go=Va",
    "fy"       : "Wiki:Sykje?search=%s&go=Side",
    "ga"       : "Speisialta:Search?search=%s&go=Gabh",
    "gan"      : "Special:Search?search=%s&go=%E5%8E%BB",
    "gd"       : "Special:Search?search=%s&go=Go",
    "gl"       : "Especial:Procurar?search=%s&go=Artigo",
    "glk"      : "%D9%88%DB%8C%DA%98%D9%87:%D8%AC%D8%B3%D8%AA%D8%AC%D9%88?search=%s&go=%D8%A8%D9%88%D8%B4%D9%88",
    "gn"       : "Mba%27ech%C4%A9ch%C4%A9:Buscar?search=%s&go=Ha",
    "got"      : "Special:Search?search=%s&go=%F0%90%8C%B0%F0%90%8D%86%F0%90%8C%B2%F0%90%8C%B0%F0%90%8C%B2%F0%90%8C%B2%F0%90%8C%B0%F0%90%8C%BD",
    "gu"       : "Special:Search?search=%s&go=%E0%AA%9C%E0%AA%BE%E0%AA%93",
    "gv"       : "Special:Search?search=%s&go=Gow",
    "ha"       : "Special:Search?search=%s&go=Go",
    "hak"      : "Special:Search?search=%s&go=Chin-ngi%CC%8Dp",
    "haw"      : "Special:Search?search=%s&go=Hele",
    "he"       : "%D7%9E%D7%99%D7%95%D7%97%D7%93:%D7%97%D7%99%D7%A4%D7%95%D7%A9?search=%s&go=%D7%9C%D7%A2%D7%A8%D7%9A",
    "hi"       : "%E0%A4%B5%E0%A4%BF%E0%A4%B6%E0%A5%87%E0%A4%B7:Search?search=%s&go=%E0%A4%9C%E0%A4%BE%E0%A4%8F%E0%A4%81",
    "hif"      : "Special:Search?search=%s&go=Jao",
    "ho"       : "Special:Search?search=%s&go=Go",
    "hr"       : "Posebno:Tra%C5%BEi?search=%s&go=Kreni",
    "hsb"      : "Specialnje:Pyta%C4%87?search=%s&go=Nastawk",
    "ht"       : "Espesyal:Chache?search=%s&go=Ale",
    "hu"       : "Speci%C3%A1lis:Keres%C3%A9s?search=%s&go=Menj",
    "hy"       : "%D5%8D%D5%BA%D5%A1%D5%BD%D5%A1%D6%80%D5%AF%D5%B8%D5%B2:%D5%88%D6%80%D5%B8%D5%B6%D5%A5%D5%AC?search=%s&go=%D4%B1%D5%B6%D6%81%D5%B6%D5%A5%D5%AC",
    "hz"       : "Special:Search?search=%s&go=Go",
    "ia"       : "Special:Cercar?search=%s&go=Ir",
    "id"       : "Istimewa:Pencarian?search=%s&go=Tuju+ke",
    "ie"       : "Special:Search?search=%s&go=Vade",
    "ig"       : "Special:Search?search=%s&go=Go",
    "ii"       : "Special:Search?search=%s&go=%E8%BF%9B%E5%85%A5",
    "ik"       : "Special:Search?search=%s&go=Go",
    "ilo"      : "Special:Search?search=%s&go=Inkan",
    "io"       : "Specala:Search?search=%s&go=Irez",
    "is"       : "Kerfiss%C3%AD%C3%B0a:Leit?search=%s&go=%C3%81fram",
    "it"       : "Speciale:Ricerca?search=%s&go=Vai",
    "iu"       : "Special:Search?search=%s&go=%E1%90%8A%E1%90%83%E1%95%97%E1%96%85",
    "ja"       : "%E7%89%B9%E5%88%A5:%E6%A4%9C%E7%B4%A2?search=%s&go=%E8%A1%A8%E7%A4%BA",
    "jbo"      : "Special:Search?search=%s&go=jarco",
    "jv"       : "Astamiwa:Pencarian?search=%s&go=Tumuju",
    "ka"       : "%E1%83%A1%E1%83%9E%E1%83%94%E1%83%AA%E1%83%98%E1%83%90%E1%83%9A%E1%83%A3%E1%83%A0%E1%83%98:%E1%83%AB%E1%83%98%E1%83%94%E1%83%91%E1%83%90?search=%s&go=%E1%83%A1%E1%83%A2%E1%83%90%E1%83%A2%E1%83%98%E1%83%90",
    "kaa"      : "Arnawl%C4%B1:%C4%B0zlew?search=%s&go=O%27tin%27",
    "kab"      : "Uslig:Search?search=%s&go=%E1%BA%92er",
    "kg"       : "Special:Search?search=%s&go=Kuenda",
    "ki"       : "Special:Search?search=%s&go=Go",
    "kj"       : "Special:Search?search=%s&go=Go",
    "kk"       : "%D0%90%D1%80%D0%BD%D0%B0%D0%B9%D1%8B:%D0%86%D0%B7%D0%B4%D0%B5%D1%83?search=%s&go=%D3%A8%D1%82%21",
    "kl"       : "Speciel:S%C3%B8gning?search=%s&go=Pisuppoq",
    "km"       : "%E1%9E%96%E1%9E%B7%E1%9E%9F%E1%9F%81%E1%9E%9F:%E1%9E%9F%E1%9F%92%E1%9E%9C%E1%9F%82%E1%9E%84%E1%9E%9A%E1%9E%80?search=%s&go=%E1%9E%91%E1%9F%85",
    "kn"       : "%E0%B2%B5%E0%B2%BF%E0%B2%B6%E0%B3%87%E0%B2%B7:Search?search=%s&go=%E0%B2%B9%E0%B3%8B%E0%B2%97%E0%B3%81",
    "ko"       : "%ED%8A%B9%EC%88%98%EA%B8%B0%EB%8A%A5:%EC%B0%BE%EA%B8%B0?search=%s&go=%EA%B0%80%EA%B8%B0",
    "kr"       : "Special:Search?search=%s&go=Go",
    "ks"       : "Special:Search?search=%s&go=Go",
    "ksh"      : "Spezial:S%C3%B6k?search=%s&go=Sigg",
    "ku"       : "Taybet:Search?search=%s&go=Gotar",
    "kv"       : "%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Search?search=%s&go=%D0%92%D1%83%D0%B4%D0%B6%D0%BD%D1%8B",
    "kw"       : "Special:Search?search=%s&go=Ke",
    "ky"       : "Special:Search?search=%s&go=Go",
    "la"       : "Specialis:Quaerere?search=%s&go=Ire",
    "lad"      : "Especial:Buscar?search=%s&go=Yir",
    "lb"       : "Spezial:Sichen?search=%s&go=S%C3%A4it",
    "lbe"      : "%D0%9A%D1%8A%D1%83%D0%BB%D0%BB%D1%83%D0%B3%D1%8A%D0%B8%D1%80%D0%B0%D0%BB_%D0%BB%D0%B0%D0%B6%D0%B8%D0%BD:Search?search=%s&go=%D0%9F%D0%B5%D1%80%D0%B5%D0%B9%D1%82%D0%B8",
    "lg"       : "Special:Search?search=%s&go=Nona",
    "li"       : "Speciaal:Zeuke?search=%s&go=Artikel",
    "lij"      : "Speciale:Ri%C3%A7erca?search=%s&go=Vanni",
    "lmo"      : "Speciale:Ricerca?search=%s&go=V%C3%A0",
    "ln"       : "Special:Recherche?search=%s&go=K%C9%9Bnd%C9%9B%CC%81",
    "lo"       : "%E0%BA%9E%E0%BA%B4%E0%BB%80%E0%BA%AA%E0%BA%94:%E0%BA%8A%E0%BA%AD%E0%BA%81%E0%BA%AB%E0%BA%B2?search=%s&go=%E0%BB%84%E0%BA%9B",
    "lt"       : "Specialus:Paie%C5%A1ka?search=%s&go=Rodyti",
    "lv"       : "Special:Search?search=%s&go=Aiziet%21",
    "mdf"      : "Special:Search?search=%s&go=%D0%90%D1%80%D0%B5",
    "mg"       : "Special:Recherche?search=%s&go=Tsidiho",
    "mh"       : "Special:Search?search=%s&go=Go",
    "mi"       : "Special:Search?search=%s&go=Haere",
    "mk"       : "%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%98%D0%B0%D0%BB%D0%BD%D0%B8:%D0%91%D0%B0%D1%80%D0%B0%D1%98?search=%s&go=%D0%9E%D0%B4%D0%B8",
    "ml"       : "%E0%B4%AA%E0%B5%8D%E0%B4%B0%E0%B4%A4%E0%B5%8D%E0%B4%AF%E0%B5%87%E0%B4%95%E0%B4%82:Search?search=%s&go=%E0%B4%AA%E0%B5%8B%E0%B4%95%E0%B5%82",
    "mn"       : "Special:Search?search=%s&go=%D0%AF%D0%B2%D0%B0%D1%85",
    "mo"       : "Special:C%C4%83utare?search=%s&go=%D0%94%D1%83%D1%87%D0%B5",
    "mr"       : "%E0%A4%B5%E0%A4%BF%E0%A4%B6%E0%A5%87%E0%A4%B7:%E0%A4%B6%E0%A5%8B%E0%A4%A7%E0%A4%BE?search=%s&go=%E0%A4%B2%E0%A5%87%E0%A4%96",
    "ms"       : "Khas:Gelintar?search=%s&go=Pergi",
    "mt"       : "Special:Fittex?search=%s&go=Mur",
    "mus"      : "Special:Search?search=%s&go=Go",
    "my"       : "Special:Search?search=%s&go=%E1%80%9E%E1%80%BD%E1%80%AC%E1%80%B8%E2%80%8B%E1%80%95%E1%80%AB%E2%80%8B",
    "myv"      : "%D0%91%D0%B0%D1%88%D0%BA%D0%B0_%D1%82%D0%B5%D0%B2%D0%B5%D0%BD%D1%8C:%D0%92%D0%B5%D1%88%D0%BD%D0%B5%D0%BC%D1%81?search=%s&go=%D0%90%D0%B4%D1%8F",
    "mzn"      : "%D9%88%DB%8C%DA%98%D9%87:%D8%AC%D8%B3%D8%AA%D8%AC%D9%88?search=%s&go=%D8%A8%D9%88%D8%B1",
    "na"       : "Special:Search?search=%s&go=Go",
    "nah"      : "N%C5%8Dncuahqu%C4%ABzqui:Tlat%C4%93m%C5%8Dz?search=%s&go=Y%C4%81uh",
    "nan"      : "Special:Search?search=%s&go=L%C3%A2i-kh%C3%AC",
    "nap"      : "Speci%C3%A0le:Ricerca?search=%s&go=Vaje",
    "nds"      : "Spezial:S%C3%B6%C3%B6k?search=%s&go=Los",
    "ne"       : "Special:Search?search=%s&go=%E0%A4%9C%E0%A4%BE%E0%A4%89",
    "new"      : "%E0%A4%B5%E0%A4%BF%E0%A4%B6%E0%A5%87%E0%A4%B7:Search?search=%s&go=%E0%A4%A5%E0%A5%8D%E0%A4%B5+%E0%A4%9A%E0%A5%8D%E0%A4%B5%E0%A4%B8%E0%A5%81",
    "ng"       : "Special:Search?search=%s&go=Go",
    "nl"       : "Speciaal:Zoeken?search=%s&go=Artikel",
    "nn"       : "Spesial:S%C3%B8k?search=%s&go=Vis",
    "no"       : "Spesial:S%C3%B8k?search=%s&go=G%C3%A5",
    "nov"      : "Special:Search?search=%s&go=Vada",
    "nrm"      : "Special:Search?search=%s&go=Lanchiz",
    "nv"       : "Special:Search?search=%s&go=Go",
    "ny"       : "Special:Search?search=%s&go=Pitani",
    "oc"       : "Especial:Rec%C3%A8rca?search=%s&go=Consultar",
    "om"       : "Special:Search?search=%s&go=Fufi",
    "or"       : "Special:Search?search=%s&go=Go",
    "os"       : "%D0%A1%C3%A6%D1%80%D0%BC%D0%B0%D0%B3%D0%BE%D0%BD%D0%B4:Search?search=%s&go=%D0%A1%D1%82%D0%B0%D1%82%D1%8C%D1%8F%D0%BC%C3%A6",
    "pa"       : "%E0%A8%96%E0%A8%BE%E0%A8%B8:Search?search=%s&go=%E0%A8%9C%E0%A8%BE%E0%A8%93",
    "pag"      : "Special:Search?search=%s&go=Ula",
    "pam"      : "Special:Search?search=%s&go=Sulung",
    "pap"      : "Special:Search?search=%s&go=Go",
    "pdc"      : "Spezial:Suche?search=%s&go=Seite",
    "pi"       : "Special:Search?search=%s&go=%E0%A4%97%E0%A4%9A%E0%A5%8D%E0%A4%9B%E0%A4%BE%E0%A4%AE%E0%A4%BF",
    "pih"      : "Special:Search?search=%s&go=Go",
    "pl"       : "Specjalna:Szukaj?search=%s&go=Przejd%C5%BA",
    "pms"      : "Special:Ricerca?search=%s&go=Va",
    "ps"       : "%DA%81%D8%A7%D9%86%DA%AB%DA%93%DB%8C:%D9%84%D9%BC%D9%88%D9%86?search=%s&go=%D9%88%D8%B1%DA%81%D9%87",
    "pt"       : "Especial:Busca?search=%s&go=Ir",
    "qu"       : "Sapaq:Maskay?search=%s&go=Riy",
    "rm"       : "Special:Search?search=%s&go=dai%21",
    "rmy"      : "Uzalutno:C%C4%83utare?search=%s&go=Ja",
    "rn"       : "Special:Search?search=%s&go=Go",
    "ro"       : "Special:C%C4%83utare?search=%s&go=Salt",
    "ru"       : "%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Search?search=%s&go=%D0%9F%D0%B5%D1%80%D0%B5%D0%B9%D1%82%D0%B8",
    "rw"       : "Special:Search?search=%s&go=Go",
    "sa"       : "Special:Search?search=%s&go=%E0%A4%9C%E0%A4%BE%E0%A4%AF%E0%A5%87%E0%A4%82",
    "sah"      : "%D0%90%D0%BD%D0%B0%D0%BB%D0%BB%D0%B0%D0%B0%D1%85:Search?search=%s&go=%D0%9A%D3%A9%D1%80%D0%B4%D3%A9%D1%80",
    "sc"       : "Speciale:Search?search=%s&go=Bae",
    "scn"      : "Spiciali:Ricerca?search=%s&go=Vai",
    "sco"      : "Special:Search?search=%s&go=Gang",
    "sd"       : "Special:%DA%B3%D9%88%D9%84%D8%A7?search=%s&go=%DA%A9%D9%88%D9%84%D9%8A%D9%88",
    "se"       : "Special:Search?search=%s&go=Mana",
    "sg"       : "Special:Search?search=%s&go=Go",
    "sh"       : "Special:Search?search=%s&go=Go",
    "si"       : "%E0%B7%80%E0%B7%92%E0%B7%81%E0%B7%9A%E0%B7%82:%E0%B6%9C%E0%B7%80%E0%B7%9A%E0%B7%82%E0%B6%AB%E0%B6%BA?search=%s&go=%E0%B6%BA%E0%B6%B1%E0%B7%8A%E0%B6%B1",
    "simple"   : "Special:Search?search=%s&go=Go",
    "sk"       : "%C5%A0peci%C3%A1lne:Search?search=%s&go=%C3%8Ds%C5%A5+na",
    "sl"       : "Posebno:Search?search=%s&go=Pojdi+na",
    "sm"       : "Special:Search?search=%s&go=Alu",
    "sn"       : "Special:Search?search=%s&go=Enda",
    "so"       : "Special:Search?search=%s&go=Soco",
    "sq"       : "Speciale:K%C3%ABrkim?search=%s&go=Shko",
    "sr"       : "%D0%9F%D0%BE%D1%81%D0%B5%D0%B1%D0%BD%D0%BE:Search?search=%s&go=%D0%98%D0%B4%D0%B8",
    "srn"      : "Speciaal:Suku?search=%s&go=Go",
    "ss"       : "Special:Search?search=%s&go=K%C3%BAh%C3%A1mba",
    "st"       : "Special:Search?search=%s&go=Go",
    "stq"      : "Spezial:Suche?search=%s&go=Siede",
    "su"       : "Husus:Sungsi?search=%s&go=Jung",
    "sv"       : "Special:S%C3%B6k?search=%s&go=G%C3%A5+till",
    "sw"       : "Special:Search?search=%s&go=Nenda",
    "szl"      : "Specjalna:Szukaj?search=%s&go=P%C5%99y%C5%84d%C5%BA",
    "ta"       : "%E0%AE%9A%E0%AE%BF%E0%AE%B1%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AF%81:Search?search=%s&go=%E0%AE%9A%E0%AF%86%E0%AE%B2%E0%AF%8D",
    "te"       : "%E0%B0%AA%E0%B1%8D%E0%B0%B0%E0%B0%A4%E0%B1%8D%E0%B0%AF%E0%B1%87%E0%B0%95:%E0%B0%85%E0%B0%A8%E0%B1%8D%E0%B0%B5%E0%B1%87%E0%B0%B7%E0%B0%A3?search=%s&go=%E0%B0%B5%E0%B1%86%E0%B0%B3%E0%B1%8D%E0%B0%B2%E0%B1%81",
    "tet"      : "Espesi%C3%A1l:Buka?search=%s&go=P%C3%A1jina",
    "tg"       : "%D0%92%D0%B8%D0%B6%D0%B0:Search?search=%s&go=%D0%91%D0%B8%D1%80%D0%B0%D0%B2",
    "th"       : "%E0%B8%9E%E0%B8%B4%E0%B9%80%E0%B8%A8%E0%B8%A9:%E0%B8%84%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%B2?search=%s&go=%E0%B9%84%E0%B8%9B",
    "ti"       : "Special:Search?search=%s&go=Go",
    "tk"       : "Special:Search?search=%s&go=Git",
    "tl"       : "Natatangi:Search?search=%s&go=Punta",
    "tn"       : "Special:Search?search=%s&go=Tsamaya",
    "to"       : "Special:Search?search=%s&go=Fai+%C4%81",
    "tokipona" : "Special:Search?search=%s&go=Go",
    "tpi"      : "Special:Search?search=%s&go=Go",
    "tr"       : "%C3%96zel:Ara?search=%s&go=Git",
    "ts"       : "Special:Search?search=%s&go=Nghena",
    "tt"       : "Maxsus:Search?search=%s&go=K%C3%BC%C3%A7",
    "tum"      : "Special:Search?search=%s&go=Go",
    "tw"       : "Special:Search?search=%s&go=Go",
    "ty"       : "Special:Recherche?search=%s&go=Haere",
    "udm"      : "%D0%9F%D0%B0%D0%BD%D0%B5%D0%BB%D1%8C:Search?search=%s&go=%D0%9F%D0%B5%D1%80%D0%B5%D0%B9%D1%82%D0%B8",
    "ug"       : "Special:Search?search=%s&go=Kuchush",
    "uk"       : "%D0%A1%D0%BF%D0%B5%D1%86%D1%96%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0:Search?search=%s&go=%D0%9F%D0%B5%D1%80%D0%B5%D0%B9%D1%82%D0%B8",
    "ur"       : "%D8%AE%D8%A7%D8%B5:Search?search=%s&go=%D8%AD%D8%B1%DA%A9%D8%AA",
    "uz"       : "Maxsus:Search?search=%s&go=O%27tish",
    "ve"       : "Special:Search?search=%s&go=Go",
    "vec"      : "Speciale:Serca?search=%s&go=V%C3%A0",
    "vi"       : "%C4%90%E1%BA%B7c_bi%E1%BB%87t:T%C3%ACm_ki%E1%BA%BFm?search=%s&go=Xem",
    "vls"      : "Specioal:Zoeken?search=%s&go=OK",
    "vo"       : "Patikos:Suk?search=%s&go=Getol%C3%B6d",
    "wa"       : "Sipeci%C3%A5s:Recherche?search=%s&go=Potch%C3%AE",
    "war"      : "Special:Bilnga?search=%s&go=Kadto-a",
    "wo"       : "Special:Ceet?search=%s&go=Ayca",
    "wuu"      : "Special:Search?search=%s&go=%E8%BF%9B%E5%85%A5",
    "xal"      : "%D0%9A%D3%A9%D0%B4%D0%BB%D1%85%D0%BD%C9%99:Search?search=%s&go=Go",
    "xh"       : "Special:Search?search=%s&go=Hamba",
    "yi"       : "%D7%91%D7%90%D6%B7%D7%96%D7%95%D7%A0%D7%93%D7%A2%D7%A8:%D7%96%D7%95%D7%9B%D7%9F?search=%s&go=%D7%92%D7%99%D7%99",
    "yo"       : "P%C3%A0t%C3%A0k%C3%AC:Search?search=%s&go=%C3%93+y%C3%A1%21",
    "za"       : "Special:Search?search=%s&go=Bei",
    "zea"      : "Speciaol:Zoeken?search=%s&go=Bladzie",
    "zh"       : "Special:Search?search=%s&go=%E8%BF%9B%E5%85%A5",
    "zu"       : "Special:Search?search=%s&go=Go"
};
