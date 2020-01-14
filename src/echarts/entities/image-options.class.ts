import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH, DEFAULT_FILENAME } from '../constants';

/**
 * Class to configure image options.
 */
export class ImageOptions {
  // Image width
  @ApiProperty({ required: false, description: 'Image width.', example: DEFAULT_IMAGE_WIDTH })
  width?: number;

  // Image height
  @ApiProperty({ required: false, description: 'Image height.', example: DEFAULT_IMAGE_HEIGHT })
  height?: number;

  // Download file name
  @ApiProperty({ required: false, description: 'Name of the downloaded image.', example: DEFAULT_FILENAME })
  filename?: string;
}
