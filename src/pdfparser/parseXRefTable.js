import { arrayToString, trimArray } from '../utils';

const parseEntries = input => {
  const trimmed = input.trim();
  const entryRegex = /^(\d{10})\ (\d{5})\ (n|f)/;

  const entriesArr = [];
  let remainder = trimmed;
  while (remainder.length > 0) {
    const result = remainder.match(entryRegex);
    if (!result) return null;

    const [fullMatch, offset, genNum, isInUse] = result;

    entriesArr.push({ offset, genNum, isInUse });
    remainder = remainder.substring(fullMatch.length).trim();
  }

  return entriesArr;
};

const parseSections = input => {
  const trimmed = input.trim();
  const sectionsRegex = /^(\d+)\ (\d+)((\n|\ )(\d{10}\ \d{5}\ (n|f)(\ |\n|\r)*)+)/;

  const sectionsArr = [];
  let remainder = trimmed;
  while (remainder.length > 0) {
    const result = input.match(sectionsRegex);
    if (!result) return null;

    const [fullMatch, firstObjNum, objCount, entriesStr] = result;
    const entries = parseEntries(entriesStr);
    if (!entries) return null;

    sectionsArr.push({ firstObjNum, objCount, entries });
    remainder = remainder.substring(fullMatch.length).trim();
  }

  return sectionsArr;
};

const parseXRefTable = (input, parseHandlers = {}) => {
  const trimmed = trimArray(input);
  const xRefTableRegex = /^xref[\n|\ ]*([\d|\ |\n|\r|f|n]+)/;
  let idx = 0;
  while (String.fromCharCode(trimmed[idx]).match(/^[xref\ \n\r\dfn]/)) idx++;
  const result1 = arrayToString(trimmed, 0, idx).match(xRefTableRegex);
  if (!result1) return null;

  const [fullMatch, contents] = result1;
  const sections = parseSections(contents);
  if (!sections) return null;

  const { onParseXRefTable = () => {} } = parseHandlers;
  return [
    onParseXRefTable(sections) || sections,
    trimmed.subarray(fullMatch.length),
  ];
};

export default parseXRefTable;