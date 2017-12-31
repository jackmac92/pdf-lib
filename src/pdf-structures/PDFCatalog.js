/* @flow */
import PDFDictionary from '../pdf-objects/PDFDictionary';
import { PDFIndirectObject, PDFPageTree } from '.';

class PDFCatalog extends PDFDictionary {
  static validKeys = Object.freeze([
    'Type',
    'Version',
    'Extensions',
    'Pages',
    'PageLabels',
    'Names',
    'Dests',
    'ViewerPreferences',
    'PageLayout',
    'PageMode',
    'Outlines',
    'Threads',
    'OpenAction',
    'AA',
    'URI',
    'AcroForm',
    'Metadata',
    'StructTreeRoot',
    'MarkInfo',
    'Lang',
    'SpiderInfo',
    'OutputIntents',
    'PieceInfo',
    'OCProperties',
    'Perms',
    'Legal',
    'Requirements',
    'Collection',
    'NeedsRendering',
  ]);

  static fromObject = (object): PDFCatalog =>
    new PDFCatalog(object, PDFCatalog.validKeys);

  getPageTree = (): PDFPageTree =>
    (this.get('Pages'): PDFIndirectObject).pdfObject;
}

export default PDFCatalog;