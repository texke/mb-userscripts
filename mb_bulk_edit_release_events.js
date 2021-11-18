// ==UserScript==
// @name        MB: Bulk Edit Release Events 
// @namespace   https://github.com/texke/mb-userscripts
// @downloadURL https://raw.githubusercontent.com/texke/mb-userscripts/main/mb_bulk_edit_release_events.js
// @updateURL   https://raw.githubusercontent.com/texke/mb-userscripts/main/mb_bulk_edit_release_events.js
// @match       *://musicbrainz.org/release/*/edit
// @match       *://*.musicbrainz.org/release/*/edit
// @match       *://musicbrainz.org/release/add
// @match       *://*.musicbrainz.org/*/release/add
// @match       https://etc.marlonob.info/atisket/*
// @match       https://atisket.pulsewidth.org.uk/*
// @version     2021.11.18.1
// @author      texke
// @license     MIT; https://opensource.org/licenses/MIT
// @description Copy and input release events from atisket into MB.
// @run-at      document-end
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_info
// ==/UserScript==

// Loosely based on ROpdebee's MB: Bulk copy-paste work codes
// https://raw.github.com/ROpdebee/mb-userscripts/main/mb_bulk_copy_work_codes.user.js
// 
// 
// Style and concept by loujine
// https://github.com/loujine/musicbrainz-scripts/blob/master/mbz-loujine-common.js (MIT license).

function handleMB() {
  const COUNTRY_CODES = { 
    AF: 1,
    AL: 2,
    DZ: 3,
    AS: 4,
    AD: 5,
    AO: 6,
    AI: 7,
    AQ: 8,
    AG: 9,
    AR: 10,
    AM: 11,
    AW: 12,
    AU: 13,
    AT: 14,
    AZ: 15,
    BS: 16,
    BH: 17,
    BD: 18,
    BB: 19,
    BY: 20,
    BE: 21,
    BZ: 22,
    BJ: 23,
    BM: 24,
    BT: 25,
    BO: 26,
    BA: 27,
    BW: 28,
    BV: 29,
    BR: 30,
    IO: 31,
    BN: 32,
    BG: 33,
    BF: 34,
    BI: 35,
    KH: 36,
    CM: 37,
    CA: 38,
    CV: 39,
    KY: 40,
    CF: 41,
    TD: 42,
    CL: 43,
    CN: 44,
    CX: 45,
    CC: 46,
    CO: 47,
    KM: 48,
    CG: 49,
    CK: 50,
    CR: 51,
    CI: 52,
    HR: 53,
    CU: 54,
    CY: 55,
    CZ: 56,
    DK: 57,
    DJ: 58,
    DM: 59,
    DO: 60,
    TL: 61,
    EC: 62,
    EG: 63,
    SV: 64,
    GQ: 65,
    ER: 66,
    EE: 67,
    ET: 68,
    FK: 69,
    FO: 70,
    FJ: 71,
    FI: 72,
    FR: 73,
    GF: 75,
    PF: 76,
    TF: 77,
    GA: 78,
    GM: 79,
    GE: 80,
    DE: 81,
    GH: 82,
    GI: 83,
    GR: 84,
    GL: 85,
    GD: 86,
    GP: 87,
    GU: 88,
    GT: 89,
    GN: 90,
    GW: 91,
    GY: 92,
    HT: 93,
    HM: 94,
    HN: 95,
    HK: 96,
    HU: 97,
    IS: 98,
    IN: 99,
    ID: 100,
    IR: 101,
    IQ: 102,
    IE: 103,
    IL: 104,
    IT: 105,
    JM: 106,
    JP: 107,
    JO: 108,
    KZ: 109,
    KE: 110,
    KI: 111,
    KP: 112,
    KR: 113,
    KW: 114,
    KG: 115,
    LA: 116,
    LV: 117,
    LB: 118,
    LS: 119,
    LR: 120,
    LY: 121,
    LI: 122,
    LT: 123,
    LU: 124,
    MO: 125,
    MK: 126,
    MG: 127,
    MW: 128,
    MY: 129,
    MV: 130,
    ML: 131,
    MT: 132,
    MH: 133,
    MQ: 134,
    MR: 135,
    MU: 136,
    YT: 137,
    MX: 138,
    FM: 139,
    MD: 140,
    MC: 141,
    MN: 142,
    MS: 143,
    MA: 144,
    MZ: 145,
    MM: 146,
    NA: 147,
    NR: 148,
    NP: 149,
    NL: 150,
    AN: 151,
    NC: 152,
    NZ: 153,
    NI: 154,
    NE: 155,
    NG: 156,
    NU: 157,
    NF: 158,
    MP: 159,
    NO: 160,
    OM: 161,
    PK: 162,
    PW: 163,
    PA: 164,
    PG: 165,
    PY: 166,
    PE: 167,
    PH: 168,
    PN: 169,
    PL: 170,
    PT: 171,
    PR: 172,
    QA: 173,
    RE: 174,
    RO: 175,
    RU: 176,
    RW: 177,
    KN: 178,
    LC: 179,
    VC: 180,
    WS: 181,
    SM: 182,
    ST: 183,
    SA: 184,
    SN: 185,
    SC: 186,
    SL: 187,
    SG: 188,
    SK: 189,
    SI: 190,
    SB: 191,
    SO: 192,
    ZA: 193,
    ES: 194,
    LK: 195,
    SH: 196,
    PM: 197,
    SD: 198,
    SR: 199,
    SJ: 200,
    SZ: 201,
    SE: 202,
    CH: 203,
    SY: 204,
    TW: 205,
    TJ: 206,
    TZ: 207,
    TH: 208,
    TG: 209,
    TK: 210,
    TO: 211,
    TT: 212,
    TN: 213,
    TR: 214,
    TM: 215,
    TC: 216,
    TV: 217,
    UG: 218,
    UA: 219,
    AE: 220,
    GB: 221,
    US: 222,
    UM: 223,
    UY: 224,
    UZ: 225,
    VU: 226,
    VA: 227,
    VE: 228,
    VN: 229,
    VG: 230,
    VI: 231,
    WF: 232,
    EH: 233,
    YE: 234,
    YU: 235,
    CD: 236,
    ZM: 237,
    ZW: 238,
    XW: 240,
    XE: 241,
    CS: 242,
    SU: 243,
    XG: 244,
    XC: 245,
    ME: 247,
    GS: 248,
    PS: 249,
    AX: 250,
    GG: 251,
    IM: 252,
    JE: 253,
    RS: 254,
    BL: 255,
    MF: 256,
    SS: 257,
    BQ: 258,
    CW: 259,
    SX: 260,
    XK: 2358
  };
  const mainUIHTML = `<br /><button type="button" id="texke_MB_Bulk_Edit_Release_Events" class="with-label add-item" title="Bulk paste Release Events">Bulk paste Release Events</button>`
  document.querySelector('.add-item').insertAdjacentHTML('beforeend', mainUIHTML);
  document.querySelector('button#texke_MB_Bulk_Edit_Release_Events').addEventListener('click', (evt) => { readData(); });
  
  function setRowKey(select, countryKey) {
    let idx = [...select.options].findIndex(opt => opt.text.trim() === countryKey);
    if(idx < 0) {
      throw new Error('Unknown country key');
    }
    select.selectedIndex = idx;
  }

  function readData() {
    let data = GM_getValue('ReleaseEventsData');
    if(data) {
      let newRowBtn = document.querySelector('button[title="Add Release Event"]');
      while(document.querySelector('button.remove-release-event')) {
        let removeEventBtn = document.querySelector('button.remove-release-event');
        removeEventBtn.click();
      }
      var count = 0;
      data = JSON.parse(data);
      data.forEach(event => {        
        newRowBtn.click();
        document.querySelectorAll('.partial-date-year')[count].value = event.year;
        document.querySelectorAll('.partial-date-year')[count].dispatchEvent(new Event('change'));
        document.querySelectorAll('.partial-date-month')[count].value = event.month;
        document.querySelectorAll('.partial-date-month')[count].dispatchEvent(new Event('change'));
        document.querySelectorAll('.partial-date-day')[count].value = event.day;
        document.querySelectorAll('.partial-date-day')[count].dispatchEvent(new Event('change'));
        document.getElementById('country-' + count).value = COUNTRY_CODES[event.country];
        document.getElementById('country-' + count).dispatchEvent(new Event('change'));
        count++;
      });
    }
    // Reset again to prevent filling the same data on another edit page
    GM_deleteValue('ReleaseEventsData');
  }
}

function handleAtisket() {
  if(document.getElementById("all-release-events")) {
    const mainUIHTML = `<button type="button" id="texke_MB_Bulk_Edit_Release_Events" class="with-label add-item" title="Copy Release Events">Copy Release Events</button>`
    document.querySelector('#all-release-events').insertAdjacentHTML('beforebegin', mainUIHTML);
    document.querySelector('button#texke_MB_Bulk_Edit_Release_Events').addEventListener('click', (evt) => { parseAndCopy(); });
  }
  
  function parseAndCopy() {
    let entry = document.getElementById("all-release-events");
    let entries = entry.querySelectorAll('input');
    const events = [];
    var obj = {};
    entries.forEach(element => {
      var elementSplit = element.name.split('.');
      var id = elementSplit[1];
      if(elementSplit[2] == 'country') {
        obj = {};
        obj['country'] = element.value;
        obj['year'] = entry.querySelector('input[name="events.' + id +  '.date.year"]').value;
        obj['month'] = entry.querySelector('input[name="events.' + id +  '.date.month"]').value;
        obj['day'] = entry.querySelector('input[name="events.' + id +  '.date.day"]').value;
        events.push(obj);
      }
    });
    GM_setValue('ReleaseEventsData', JSON.stringify(events));
  }
}

const repertoireToHandler = {
  'etc.marlonob.info': handleAtisket,
};

if (document.location.hostname === 'musicbrainz.org' || document.location.hostname.endsWith('.musicbrainz.org')) {
  handleMB();
} else {
  repertoireToHandler[document.location.hostname]();
}