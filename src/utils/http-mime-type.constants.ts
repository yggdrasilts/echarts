/**
 * MimeType build merging data from:
 *  - https://www.iana.org/assignments/media-types/media-types.xhtml
 *  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
 */
export class MimeType {
  static APPLICATION = class {};

  static AUDIO = class {};

  /**
   * https://www.iana.org/assignments/media-types/media-types.xhtml#font
   */
  static FONT = class {
    static readonly COLLECTION = 'font/collection';
    static readonly OTF = 'font/otf';
    static readonly SFNT = 'font/sfnt';
    static readonly TTF = 'font/ttf';
    static readonly WOFF = 'font/woff';
    static readonly WOFF2 = 'font/woff2';
  };

  /**
   * https://www.iana.org/assignments/media-types/media-types.xhtml#image
   */
  static IMAGE = class {
    static readonly ACES = 'image/aces';
    static readonly AVCI = 'image/avci';
    static readonly AVCS = 'image/avcs';
    static readonly BMP = 'image/bmp';
    static readonly CGM = 'image/cgm';
    static readonly DICOM_RLE = 'image/dicom-rle';
    static readonly EMF = 'image/emf';
    static readonly EXAMPLE = 'image/example';
    static readonly FITS = 'image/fits';
    static readonly G3FAX = 'image/g3fax';
    static readonly GIF = 'image/gif';
    static readonly HEIC = 'image/heic';
    static readonly HEIC_SEQUENCE = 'image/heic-sequence';
    static readonly HEIF = 'image/heif';
    static readonly HEIF_SEQUENCE = 'image/heif-sequence';
    static readonly HEJ2K = 'image/hej2k';
    static readonly HSJ2 = 'image/hsj2';
    static readonly JLS = 'image/jls';
    static readonly JP2 = 'image/jp2';
    static readonly JPG = 'image/jpeg';
    static readonly JPEG = 'image/jpeg';
    static readonly JPH = 'image/jph';
    static readonly JPHC = 'image/jphc';
    static readonly JPM = 'image/jpm';
    static readonly JPX = 'image/jpx';
    static readonly JXR = 'image/jxr';
    static readonly JXRa = 'image/jxrA';
    static readonly JXRs = 'image/jxrS';
    static readonly JXS = 'image/jxs';
    static readonly JXSC = 'image/jxsc';
    static readonly JXSI = 'image/jxsi';
    static readonly JXSS = 'image/jxss';
    static readonly NAPLPS = 'image/naplps';
    static readonly PNG = 'image/png';
    static readonly PRS_BTIF = 'image/prs.btif';
    static readonly PRS_PTI = 'image/prs.pti';
    static readonly PWG_RASTER = 'image/pwg-raster';
    static readonly SVG = 'image/svg+xml';
    static readonly T38 = 'image/t38';
    static readonly TIFF = 'image/tiff';
    static readonly TIFF_FX = 'image/tiff-fx';
    static readonly VND_ADOBE_PHOTOSHOP = 'image/vnd.adobe.photoshop';
    static readonly VND_AIRZIP_ACCELERATOR_AZV = 'image/vnd.airzip.accelerator.azv';
    static readonly VND_CNS_INF2 = 'image/vnd.cns.inf2';
    static readonly VND_DECE_GRAPHIC = 'image/vnd.dece.graphic';
    static readonly VND_DJVU = 'image/vnd.djvu';
    static readonly VND_DWG = 'image/vnd.dwg';
    static readonly VND_DXF = 'image/vnd.dxf';
    static readonly VND_DVB_SUBTITLE = 'image/vnd.dvb.subtitle';
    static readonly VND_FASTBIDSHEET = 'image/vnd.fastbidsheet';
    static readonly VND_FPX = 'image/vnd.fpx';
    static readonly VND_FST = 'image/vnd.fst';
    static readonly VND_FUJIXEROX_EDMICS_MMR = 'image/vnd.fujixerox.edmics-mmr';
    static readonly VND_FUJIXEROX_EDMICS_RLC = 'image/vnd.fujixerox.edmics-rlc';
    static readonly VND_GLOBALGRAPHICS_PGB = 'image/vnd.globalgraphics.pgb';
    static readonly VND_MICROSOFT_ICON = 'image/vnd.microsoft.icon';
    static readonly VND_MIX = 'image/vnd.mix';
    static readonly VND_MS_MODI = 'image/vnd.ms-modi';
    static readonly VND_MOZILLA_APNG = 'image/vnd.mozilla.apng';
    static readonly VND_NET_FPX = 'image/vnd.net-fpx';
    static readonly VND_RADIANCE = 'image/vnd.radiance';
    static readonly VND_SEALED_PNG = 'image/vnd.sealed.png';
    static readonly VND_SEALEDMEDIA_SOFTSEAL_GIF = 'image/vnd.sealedmedia.softseal.gif';
    static readonly VND_SEALEDMEDIA_SOFTSEAL_JPG = 'image/vnd.sealedmedia.softseal.jpg';
    static readonly VND_SVF = 'image/vnd.svf';
    static readonly VND_TENCENT_TAP = 'image/vnd.tencent.tap';
    static readonly VND_VALVE_SOURCE_TEXTURE = 'image/vnd.valve.source.texture';
    static readonly VND_WAP_WBMP = 'image/vnd.wap.wbmp';
    static readonly VND_XIFF = 'image/vnd.xiff';
    static readonly VND_ZBRUSH_PCX = 'image/vnd.zbrush.pcx';
    static readonly WEBP = 'image/webp';
    static readonly WMF = 'image/wmf';
  };

  static MESSAGE = class {};

  static MODEL = class {};

  static MULTIPART = class {};

  static TEXT = class {};

  static VIDEO = class {};
}
