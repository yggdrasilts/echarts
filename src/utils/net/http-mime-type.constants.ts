import { MimeTypeAudio, MimeTypeFont, MimeTypeImage } from './mime-type';

/**
 * MimeType build merging data from:
 *  - https://www.iana.org/assignments/media-types/media-types.xhtml
 *  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
 */
export class MimeType {
  static APPLICATION = {};

  static AUDIO = MimeTypeAudio;

  static FONT = MimeTypeFont;

  static IMAGE = MimeTypeImage;

  static MESSAGE = {};

  static MODEL = {};

  static MULTIPART = {};

  static TEXT = {};

  static VIDEO = {};
}
